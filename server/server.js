import express from "express";
import cors from "cors";
import router from "./routes/routes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

connectDB();


console.log(process.env.MONGO_URI);
const app = express();

app.use(cors());
app.use(express.json()); // "If the client sends JSON, parse it and put the resulting object in req.body."

app.use(router);
app.use("/api/auth", router);


app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

// app.get("/api/expenses", (req, res) => {
//     res.send("Searching for :" + req.query.search); // /api/expenses?search=food // api/expenses is the route and ?search=food is the query
// });

