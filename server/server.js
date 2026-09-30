import express from "express";
// Express is a web framework built on top of Node.js.
// It makes it easier to build web servers and APIs.

import cors from "cors";
// CORS (Cross-Origin Resource Sharing) is middleware that controls
// whether a frontend from another origin (domain/port) is allowed
// to make requests to this backend.

import PasswordResetToken  from "./models/PasswordResetToken.js";

import router from "./routes/routes.js";
// Imports the main router containing application API routes/endpoints.

import authRouter from "./routes/authRoutes.js";
// Imports the router containing authentication-related API routes,
// such as login, register, logout, etc.

import { connectDB } from "./config/db.js";
// Imports the connectDB function, which is responsible for
// establishing a connection between our backend and MongoDB.

import helmet from "helmet";
// Helmet is security middleware that sets/modifies HTTP response headers
// to help protect the application from several common web vulnerabilities.

import cookieParser from "cookie-parser";
// Middleware that reads the Cookie header from incoming requests
// and makes the cookies available through req.cookies.

import dotenv from "dotenv";
// dotenv loads environment variables from the .env file
// into process.env.

dotenv.config();
// Reads the .env file and loads its variables into process.env.


connectDB();
// Calls the function to establish the connection with MongoDB.


console.log(process.env.MONGO_URI);
// Prints the MongoDB connection URI from the environment variables.
// Useful for debugging, but should NOT be kept in production
// because connection strings may contain sensitive credentials.


const app = express();
// Creates an Express application.
// 'app' will be used to configure middleware, routes, and the server.


app.use(helmet());
// Adds Helmet middleware.
// Helmet sets security-related HTTP response headers that can
// reduce exposure to certain common attacks/misconfigurations.


app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        // Allows requests only from the frontend origin specified
        // in FRONTEND_URL.

        credentials: true,
        // Allows the browser to include credentials such as cookies
        // in cross-origin requests.
    })
);


app.use(express.json());
// Middleware that checks whether an incoming request contains JSON data.
// If it does, Express parses the JSON and puts the resulting JavaScript
// object inside req.body.


app.use(cookieParser());
// Reads cookies sent by the browser in the request's Cookie header
// and makes them available through req.cookies.


app.use("/api/expenses",router);
// Registers the main application router.
// The routes defined inside router are now available to the Express app.


app.use("/api/auth", authRouter);
// Registers authRouter with "/api/auth" as a prefix.
// Every route inside authRouter automatically starts with /api/auth.


app.listen(3001, () => {
    // Starts the server and makes it listen for incoming requests
    // on port 3001.

    console.log("Server is running on port 3001");
});