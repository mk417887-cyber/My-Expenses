// Responsible for:
// defining URLs
// deciding which controller handles each URL

import express from "express";
import { getExpenses, deleteExpense, addExpense, updateExpense, getExpenseById, getExpenseSummary, getRecentExpenses } from "../controllers/controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/api/expenses", protect, getExpenses);

router.get("/api/expenses/summary", protect, getExpenseSummary);

router.get("/api/expenses/recent", protect, getRecentExpenses);

router.get("/api/expenses/:id", protect, getExpenseById);

router.post("/api/expenses", protect, addExpense);

router.put("/api/expenses/:id", protect, updateExpense);

router.delete("/api/expenses/:id", protect, deleteExpense);

export default router;