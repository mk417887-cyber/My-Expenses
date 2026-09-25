
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;// regex for email

        if (!emailPattern.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter valid email",
            });
        }

        if (
            password.length < 6 ||
            !/\d/.test(password) || // checking for number
            !/[A-Za-z]/.test(password) // checking for letter
        ) {
            return res.status(400).json({
                success: false,
                message: "Password must contain at least one letter and one number and be at least 6 characters long",
            });
        }

        const normalizedEmail = email.trim().toLowerCase(); //So normalizedEmail is your JavaScript variable, not your MongoDB field name.

        const normalizedName = name.trim();// "     mdsjbdc     " clean up

        const userExists = await User.findOne({ email: normalizedEmail }); // "MongoDB, find me one user whose email matches this email."

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // 10 -> salt rounds / cost factor means Spend this much computational effort making the password hash.”

        const user = new User({ // This creates a Mongoose document in memory. but does not save in mongoose yet
            name: normalizedName,
            email: normalizedEmail,
            password: hashedPassword,
        });

        await user.save();

        return res.status(201).json({
            success: true,
            message: "User created successfully",
        });
    }
    catch (error) {
        console.error(error);

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }

};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password) // "Does this plain-text password correspond to this stored bcrypt hash?"

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const token = jwt.sign(
            {
                id: user._id, // payload
                name: user.name,
                email: user.email // never put password in the token
            },
            process.env.JWT_SECRET,//secret
            {
                expiresIn: process.env.JWT_EXPIRES_IN,// options
            }
        );// paylod -> info we want to include in the token // secret -> a secret key used to sign the token // options -> options for the token


        const refreshToken = jwt.sign(
            {
                id: user._id,
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
            }
        );

        res.cookie("refreshToken", refreshToken, { // cookies me refreshToken respond kro as refreshToken 
            httpOnly: true,// java cannot read cookie 
            secure: process.env.NODE_ENV === "production", //  secure production mein HTTPS enforce karega, In production: HTTPS → cookie allowed , HTTP  → cookie not sent // uring local development, secure is false, so your http://localhost:3001 setup still works.
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // browser ko control karega ki cookie kab send karni hai. This controls when the browser sends the cookie in cross-site situations. // When frontend and backend are deployed on different sites/domains and we're using cross-site cookies, we'll need to configure SameSite=None together with Secure.
            maxAge: 7 * 24 * 60 * 60 * 1000,// 7 days × 24 hours × 60 minutes × 60 seconds × 1000 ms browser keeps the cookies for exactly 7 days
        });


        return res.status(200).json({ // we are giving a HTTp response to frontend 
            success: true,
            message: "Login successful",
            token
        });



    }
    catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const refresh = async (req, res) => { // jbb koi iise call kre to use naya token return krr do
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh token missing",
            });
        }

        const decoded = jwt.verify( // checks whether the refresh token was signed by our server , has'nt been modified , has'nt expired // f valid, decoded.id gives us the user's ID.
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET // Browser se refreshToken cookie req.cookies.refreshToken ke through milegi. jwt.verify() usko REFRESH_TOKEN_SECRET se verify karega.
        );

        const token = jwt.sign( // naya token bana diya 
            {
                id: decoded.id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN,
            }
        );

        return res.status(200).json({
            success: true,
            token,
        });
    } catch (error) {
        console.error(error);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired refresh token",
        });
    }
};