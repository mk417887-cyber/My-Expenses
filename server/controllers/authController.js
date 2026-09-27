import RefreshSession from "../models/RefreshSession.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import crypto from "crypto";
import ms from "ms";
import dotenv from "dotenv";

dotenv.config();

const getRefreshTokenLifetime = () => {
    const lifetime = ms(
        process.env.REFRESH_TOKEN_EXPIRES_IN
    );

    if (!lifetime) {
        throw new Error(
            "Invalid REFRESH_TOKEN_EXPIRES_IN"
        );
    }

    return lifetime;
};

const getRefreshCookieOptions = () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:
        process.env.NODE_ENV === "production"
            ? "none"
            : "lax",
    maxAge: getRefreshTokenLifetime(),
});

//---------------------------------------------
//REGISTER----------------------------------
//---------------------------------------------
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string"
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }

        const normalizedName = name.trim();
        const normalizedEmail = email
            .trim()
            .toLowerCase();

        if (
            !normalizedName ||
            !normalizedEmail ||
            !password
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(normalizedEmail)) {
            return res.status(400).json({
                success: false,
                message: "Please enter valid email",
            });
        }

        if (
            password.length < 6 ||
            !/\d/.test(password) ||
            !/[A-Za-z]/.test(password)
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must contain at least one letter and one number and be at least 6 characters long",
            });
        }

        const userExists = await User.findOne({
            email: normalizedEmail,
        });

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        const user = new User({
            name: normalizedName,
            email: normalizedEmail,
            password: hashedPassword,
        });

        await user.save();

        return res.status(201).json({
            success: true,
            message: "User created successfully",
        });
    } catch (error) {
        console.error("REGISTER ERROR:", error);

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

//---------------------------------------------
//LOGIN----------------------------------
//---------------------------------------------
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (
            typeof email !== "string" ||
            typeof password !== "string"
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }

        const normalizedEmail = email
            .trim()
            .toLowerCase();

        if (!normalizedEmail || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }

        const user = await User.findOne({
            email: normalizedEmail,
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const isPasswordCorrect =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const accessToken = jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn:
                    process.env.JWT_EXPIRES_IN,
            }
        );

        const tokenFamily =
            crypto.randomUUID();

        const jti = crypto.randomUUID();

        const refreshToken = jwt.sign(
            {
                id: user._id,
                jti,
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn:
                    process.env
                        .REFRESH_TOKEN_EXPIRES_IN,
            }
        );

        const tokenHash =
            await bcrypt.hash(
                refreshToken,
                10
            );

        const refreshLifetime =
            getRefreshTokenLifetime();

        await RefreshSession.create({
            user: user._id,
            jti,
            tokenFamily,
            tokenHash,
            expiresAt: new Date(
                Date.now() +
                    refreshLifetime
            ),
        });

        res.cookie(
            "refreshToken",
            refreshToken,
            getRefreshCookieOptions()
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token: accessToken,
        });
    } catch (error) {
        console.error("LOGIN ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

//---------------------------------------------
//REFRESH----------------------------------
//---------------------------------------------
export const refresh = async (req, res) => {
    let mongoSession;

    try {
        const refreshToken =
            req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh token missing",
            });
        }

        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const session =
            await RefreshSession.findOne({
                user: decoded.id,
                jti: decoded.jti,
            });

        if (!session) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh session",
            });
        }

        if (session.revokedAt) {
            await RefreshSession.updateMany(
                {
                    user: decoded.id,
                    tokenFamily:
                        session.tokenFamily,
                    revokedAt: null,
                },
                {
                    $set: {
                        revokedAt: new Date(),
                    },
                }
            );

            return res.status(401).json({
                success: false,
                message:
                    "Refresh token reuse detected",
            });
        }

        const isValid =
            await bcrypt.compare(
                refreshToken,
                session.tokenHash
            );

        if (!isValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh session",
            });
        }

        if (session.expiresAt <= new Date()) {
            return res.status(401).json({
                success: false,
                message:
                    "Refresh session expired",
            });
        }

        const refreshLifetime =
            getRefreshTokenLifetime();

        const newJti =
            crypto.randomUUID();

        const newRefreshToken =
            jwt.sign(
                {
                    id: decoded.id,
                    jti: newJti,
                },
                process.env.REFRESH_TOKEN_SECRET,
                {
                    expiresIn:
                        process.env
                            .REFRESH_TOKEN_EXPIRES_IN,
                }
            );

        const newTokenHash =
            await bcrypt.hash(
                newRefreshToken,
                10
            );

        mongoSession =
            await mongoose.startSession();

        mongoSession.startTransaction();

        session.revokedAt = new Date();

        await session.save({
            session: mongoSession,
        });

        const newSession =
            new RefreshSession({
                user: decoded.id,
                jti: newJti,
                tokenFamily:
                    session.tokenFamily,
                tokenHash: newTokenHash,
                expiresAt: new Date(
                    Date.now() +
                        refreshLifetime
                ),
            });

        await newSession.save({
            session: mongoSession,
        });

        await mongoSession.commitTransaction();

        res.cookie(
            "refreshToken",
            newRefreshToken,
            getRefreshCookieOptions()
        );

        const accessToken =
            jwt.sign(
                {
                    id: decoded.id,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn:
                        process.env.JWT_EXPIRES_IN,
                }
            );

        return res.status(200).json({
            success: true,
            token: accessToken,
        });
    } catch (error) {
        if (
            mongoSession &&
            mongoSession.inTransaction()
        ) {
            try {
                await mongoSession.abortTransaction();
            } catch (abortError) {
                console.error(
                    "TRANSACTION ABORT ERROR:",
                    abortError
                );
            }
        }

        console.error("REFRESH ERROR:", error);

        return res.status(401).json({
            success: false,
            message:
                "Invalid or expired refresh token",
        });
    } finally {
        if (mongoSession) {
            await mongoSession.endSession();
        }
    }
};

//---------------------------------------------
//LOGOUT----------------------------------
//---------------------------------------------
export const logout = async (req, res) => {
    try {
        const refreshToken =
            req.cookies.refreshToken;

        if (!refreshToken) {
            res.clearCookie(
                "refreshToken",
                getRefreshCookieOptions()
            );

            return res.status(200).json({
                success: true,
                message: "Already logged out",
            });
        }

        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const session =
            await RefreshSession.findOne({
                user: decoded.id,
                jti: decoded.jti,
                revokedAt: null,
            });

        if (session) {
            const isValid =
                await bcrypt.compare(
                    refreshToken,
                    session.tokenHash
                );

            if (isValid) {
                session.revokedAt =
                    new Date();

                await session.save();
            }
        }

        res.clearCookie(
            "refreshToken",
            getRefreshCookieOptions()
        );

        return res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    } catch (error) {
        console.error(
            "LOGOUT ERROR:",
            error
        );

        res.clearCookie(
            "refreshToken",
            getRefreshCookieOptions()
        );

        return res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    }
};