import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (name.trim() === "" || email.trim() === "" || password.trim() === "" ) {
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


        const token = jwt.sign(
            {
                id: user._id, // payload
                name: user.name,
                email: user.email // never put password in the token
            },
            process.env.JWT_SECRET,//secret
            {
                expiresIn: "100d"// options
            }
        );// paylod -> info we want to include in the token // secret -> a secret key used to sign the token // options -> options for the token



        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        else {
            return res.status(200).json({ // we are giving a HTTp response to frontend 
                success: true,
                message: "Login successful",
                token
            });
        }


    }
    catch {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}