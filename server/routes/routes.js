// Responsible for:
// defining URLs
// deciding which controller handles each URL

import express from "express";
import { getExpenses, deleteExpense , addExpense , updateExpense  , getExpenseById} from "../controllers/controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/api/expenses", protect , getExpenses);

router.delete("/api/expenses/:id", protect , deleteExpense);

router.post("/api/expenses", protect , addExpense);

router.put("/api/expenses/:id", protect ,updateExpense);

router.get("/api/expenses/:id", protect, getExpenseById);

export default router;