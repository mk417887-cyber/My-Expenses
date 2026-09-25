import express from "express";
import cors from "cors";
import router from "./routes/routes.js";
import authRouter from "./routes/authRoutes.js";
import { connectDB } from "./config/db.js";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

connectDB();


console.log(process.env.MONGO_URI);

const app = express();

app.use(helmet()); // Helmet is middleware that improves the security configuration of HTTP responses.

app.use(
    cors({
        origin: process.env.FRONTEND_URL, // backend ab configured frontend origin ko allow karega.
        credentials: true,
    })
);


app.use(express.json()); // "If the client sends JSON, parse it and put the resulting object in req.body."

app.use(cookieParser());// useed to read data from cookies // cokies -> data stored by browser for a particular website // middleware reads the incoming cookie and makes it available through:

app.use(router);

app.use("/api/auth", authRouter);

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

// app.get("/api/expenses", (req, res) => {
//     res.send("Searching for :" + req.query.search); // /api/expenses?search=food // api/expenses is the route and ?search=food is the query
// });

