// Responsible for:

// reading req
// processing data
// sending res

import Expense from "../models/Expense.js";
import mongoose from "mongoose";

export const getExpenses = async (req, res) => {

    try {
        console.log(req.user);

        console.log(req.query);

        const { search, type, category, page, limit } = req.query; // remember req.query values are strings


        const pageNumber = Number(page) || 1; // page is is the raw URL value
        const limitNumber = Number(limit) || 10;

        const userId = req.user.id;

        const query = { user: userId }; // empty query  object // Think of query as the instructions you are building for MongoDB.

        const skip = (pageNumber - 1) * limitNumber;

        if (search) {
            query.title = {
                $regex: search,
                $options: "i" // "i" means case-insensitive
            };

        }

        if (type) {
            query.type = type;

        }

        if (category) {
            query.category = category;

        }

        const total = await Expense.countDocuments(query); // counting the matching documents

        const totalPages = Math.ceil(total / limitNumber);

        const data = await Expense.find(query)////"Give me all documents from the Expense collection with that query"
            .sort({ date: -1 })
            .skip(skip)
            .limit(limitNumber);

        res.json({ // sending the data to frontend
            data,
            total,
            page: pageNumber,
            limit: limitNumber,
            totalPages
        });

        console.log(req.user);

    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }

};

export const deleteExpense = async (req, res) => {
    try { // const id = Number(req.params.id);
        const id = req.params.id; // as mongodb makes its own objectid


        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: "Invalid ID" });
        }

        const response = await Expense.findOneAndDelete({ // Find an expense whose _id is this ID AND whose user is the current logged-in user, then delete it.
            _id: id,
            user: req.user.id
        });

        if (!response) {
            return res.status(404).json({ error: "Expense not found" });
        }
        res.json(response);

        // const expenseIndex = expenses.findIndex( // This gives you the position of the expense.
        //     (item) => item.id === id
        // );

        // if (expenseIndex === -1) {
        //     return res.status(404).json({ error: "Expense not found" });
        // }

        // expenses.splice(expenseIndex, 1); // Start at this index and remove 1 item.

        // res.json(expenses);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const addExpense = async (req, res) => {

    try {
        const { title, amount, category, date, type } = req.body; // Getting  the new expense from req.body as frontend sends it to backend // You're destructuring the data coming from the frontend.

        if (!title || !amount || !category || !date || !type) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // const maxId = expenses.reduce((max, item) => {

        //     return Math.max(max, item.id);
        // }, 0);

        const userId = req.user.id;

        const newExpense = new Expense({ // newExpense is a JavaScript object
            // id: id, // mongodb makes its own id
            user: userId,
            title,
            amount: Number(amount),
            category,
            date,
            type
        });

        await newExpense.save();
        // expenses.push(newExpense);
        //  // Add it to the expenses array using .push

        res.status(201).json(newExpense);
    } // javascript array

    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }

};

export const updateExpense = async (req, res) => {
    try {
        const id = req.params.id;


        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: "Invalid ID" });
        }


        const { title, amount, category, date, type } = req.body;  // destruvtring the fileds from req.body // You're destructuring the data coming from the frontend.

        if (!title || !amount || !category || !date || !type) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const updateData = {
            title,
            amount: Number(amount),
            category,
            date,
            type
        };

        const options = { new: true }; // this tells Mongoose to return the updated document

        const response = await Expense.findOneAndUpdate(
            {
                _id: id,
                user: req.user.id // who / what to find 
            },
            updateData, // what to change 
            options// how to return 
        );
        // expenses[expenseIndex] = {
        //     ...expenses[expenseIndex], // Copy the existing expense
        //     title,
        //     amount: Number(amount),
        //     category,
        //     date,
        //     type
        // };

        if (!response) {
            return res.status(404).json({ error: "Expense not found" }); // id to hai pee expense nahi hai
        }

        res.json(response);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const getExpenseById = async (req, res) => {
    try {
        const { id } = req.params;

        const expense = await Expense.findOne({
            _id: id,
            user: req.user.id,
        });

        if (!expense) {
            return res.status(404).json({
                error: "Expense not found",
            });
        }

        res.status(200).json(expense);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch expense",
        });
    }
};

export const getExpenseSummary = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.id);

        const summary = await Expense.aggregate([
            {
                $match: {
                    user: userId
                }
            },
            {
                $group: {
                    _id: null,

                    totalIncome: {
                        $sum: {
                            $cond: [
                                { $eq: ["$type", "income"] },
                                "$amount",
                                0
                            ]
                        }
                    },

                    totalExpense: {
                        $sum: {
                            $cond: [
                                { $eq: ["$type", "expense"] },
                                "$amount",
                                0
                            ]
                        }
                    },

                    numberOfExpenses: {
                        $sum: {
                            $cond: [
                                { $eq: ["$type", "expense"] }, // for every expense sum +1
                                1,
                                0
                            ]
                        }
                    },

                    averageExpense: {
                        $avg: {
                            $cond: [
                                { $eq: ["$type", "expense"] },
                                "$amount",
                                null
                            ]
                        }
                    },

                    totalTransactions: { // for every transaction
                        $sum: 1
                    },

                    highestExpense: {
                        $max: {
                            $cond: [
                                { $eq: ["$type", "expense"] },
                                "$amount",
                                0
                            ]
                        }
                    }
                }
            }
        ]);

        const categorySummary = await Expense.aggregate([
            {
                $match: {
                    user: userId,
                    type: "expense",
                },
            },
            {
                $group: {
                    _id: "$category",
                    total: {
                        $sum: "$amount",
                    },
                },
            },
        ]);

        const totalByCategory = categorySummary.map((item) => ({
            category: item._id,
            total: item.total,
        }));

        const result = summary[0] || {
            totalIncome: 0,
            totalExpense: 0,
            numberOfExpenses: 0,
            averageExpense: 0,
            highestExpense: 0,
            totalTransactions: 0,
        };
        
        const totalBalance =
            result.totalIncome - result.totalExpense;
        
        return res.json({
            totalIncome: result.totalIncome,
            totalExpense: result.totalExpense,
            totalBalance,
            numberOfExpenses: result.numberOfExpenses,
            totalTransactions: result.totalTransactions,
            averageExpense: result.averageExpense,
            highestExpense: result.highestExpense,
            totalByCategory
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Internal server error"
        });
    }
};

export const getRecentExpenses = async (req, res) => {
    try {
        const recentExpenses = await Expense.find({
            user: req.user.id,
        })
            .sort({ date: -1, _id: -1 }) // means newest first
            .limit(5);

        return res.json(recentExpenses);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Internal server error",
        });
    }
};