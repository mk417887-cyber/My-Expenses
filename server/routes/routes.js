// Responsible for:
// defining URLs
// deciding which controller handles each URL

import express from "express";
import { getExpenses, deleteExpense , addExpense , updateExpense } from "../controllers/controller.js";

const router = express.Router();

router.get("/api/expenses", getExpenses);

router.delete("/api/expenses/:id", deleteExpense);

router.post("/api/expenses", addExpense);

router.put("/api/expenses/:id", updateExpense);

export default router;