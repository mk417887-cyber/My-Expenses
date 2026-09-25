// Responsible for:
// 1. Defining API routes/URLs
// 2. Deciding which middleware should run
// 3. Deciding which controller handles each request

import express from "express";
// Imports Express so we can create a Router and define API routes.

import {
    getExpenses,
    deleteExpense,
    addExpense,
    updateExpense,
    getExpenseById,
    getExpenseSummary,
    getRecentExpenses
} from "../controllers/controller.js";
// Imports controller functions.
// Each controller contains the actual logic for handling a request.

import { protect } from "../middleware/authMiddleware.js";
// Imports authentication middleware.
// `protect` checks whether the request contains a valid JWT
// and allows the request to continue only if the user is authenticated.


const router = express.Router();
// Creates an Express Router.
// A router allows us to group related routes together.


router.get("/", protect, getExpenses);
// GET /api/expenses
// `protect` runs first and checks authentication.
// If authentication succeeds, getExpenses handles the request.


router.get("/summary", protect, getExpenseSummary);
// GET /api/expenses/summary
// Returns a summary of the user's expenses.


router.get("/recent", protect, getRecentExpenses);
// GET /api/expenses/recent
// Returns the user's recent expenses.


router.get("/:id", protect, getExpenseById);
// GET /api/expenses/:id
// `:id` is a dynamic route parameter.
// Example: GET /api/expenses/123


router.post("/", protect, addExpense);
// POST /api/expenses
// protect checks authentication, then addExpense creates a new expense.


router.put("/:id", protect, updateExpense);
// PUT /api/expenses/:id
// Updates the expense whose ID is provided in the URL.


router.delete("/:id", protect, deleteExpense);
// DELETE /api/expenses/:id
// Deletes the expense whose ID is provided in the URL.


export default router;
// Exports the router so it can be mounted in server.js.