
import Expense from "../models/Expense.js"; // importing the schema of mongoose
import mongoose from "mongoose"; // importing the mongoose library


const escapeRegex = (value) => { // What does it do??
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // It converts regex-special characters into literal characters. meaning a\+b → literal "a+b"
};

export const getExpenses = async (req, res) => { // making a async function which gives us the expenses

    try {

        const { search, type, category, page, limit } = req.query; // remember req.query values are strings // req.query is an object parsed by express previously
        // now we are destructring it meaning we are assigning the values to these variables


        const parsedPage = Number(page); // converting it to a number as it is a string in req.query
        const parsedLimit = Number(limit); // converting it to a number

        const pageNumber =  // if it is a number and it is greater than or equal to 1 then page number is equal to parsedPage else 1
            Number.isInteger(parsedPage) && parsedPage >= 1 
                ? parsedPage
                : 1;

        const limitNumber = // if it is a number and it is between 1 and 100 then limit number is equal to parsedLimit else 10
            Number.isInteger(parsedLimit) &&
                parsedLimit >= 1 &&
                parsedLimit <= 100
                ? parsedLimit
                : 10;

        const userId = req.user.id; // getting the user id from req.user object in  userId
 
        const query = { user: userId }; // it is an object // Think of query as the instructions you are building for MongoDB. // it contains a key user and value userId

        const skip = (pageNumber - 1) * limitNumber; //  skiping page number calculations 

        if (search) { // if search is present then query will be updated and search will be added as query title // "Give me all documents from the Expense collection with that query title"
            query.title = {
                $regex: escapeRegex(search),
                $options: "i" // "i" means case-insensitive
            };

        }

        if (type) { // if type exists then query will be updated and type will be added in query
            query.type = type; 

        }

        if (category) {
            query.category = category;

        }

        const total = await Expense.countDocuments(query); // counting the matching documents with query keys 

        const totalPages = Math.ceil(total / limitNumber); 

        const data = await Expense.find(query)////"Give me all documents from the Expense collection with that query"
            .sort({ date: -1 }) // sorting the dcuments in descending order
            .skip(skip) // skipping the documents that are not required
            .limit(limitNumber); // limit the documents to limitNumber

        res.json({ // sending the data to frontend as array object
            data,
            total,
            page: pageNumber,
            limit: limitNumber,
            totalPages
        });


    } 
    catch (error) {  // catch the error if any 
        console.error(error);
        return res.status(500).json({ error: "Internal server error" }); // send the error to frontend as json
    }

};

export const deleteExpense = async (req, res) => { 
    try { 
        const id = req.params.id; // getting the id from req.params as req.params returns ???


        if (!mongoose.isValidObjectId(id)) { // checking if the id is valid and exists in mongoose
            return res.status(400).json({ error: "Invalid ID" }); // send the error to frontend in ?? format
        }

        const response = await Expense.findOneAndDelete({ // Find an expense whose _id is this ID AND whose user is the current logged-in user, then delete it.
            _id: id, // delete this expense from the database
            user: req.user.id // belonging to this user only
        });

        if (!response) { // if the expense is not found then return with status code 404 
            return res.status(404).json({ error: "Expense not found" });
        }
        res.json(response); // if expense found then send it to frontend 

    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const addExpense = async (req, res) => {

    try {
        const { title, amount, category, date, type } = req.body; // Getting  the new expense from req.body as frontend sends it to backend // You're destructuring the data coming from the frontend.
        
                if (!title || !category || !date || !type || amount === undefined) {
                    return res.status(400).json({ error: "Missing required fields" });
                }

        const trimmedTitle = title.trim(); // remove the unnecessary whitespaces from title and store it in trimmedTitle

        if (trimmedTitle.length < 1 || trimmedTitle.length > 100) {
            return res.status(400).json({
                error: "Title must be between 1 and 100 characters"
            });
        }

        const numericAmount = Number(amount); // converting amount to number as by default it is a string

        if (!Number.isFinite(numericAmount) || numericAmount <= 0) { // checking if amount is a valid number and greater than 0 if not return error to frontend
            return res.status(400).json({
                error: "Amount must be a valid positive number"
            });
        }

        const allowedCategories = [ // amking an array of allowed categories 
            "Food",
            "Travel",
            "Entertainment",
            "Other",
            "Education",
            "Health",
        ];

        if (!allowedCategories.includes(category)) { // if your category is not in allowed categories then return error
            return res.status(400).json({
                error: "Invalid category"
            });
        }

        const allowedTypes = ["income", "expense"];

        if (!allowedTypes.includes(type)) {
            return res.status(400).json({
                error: "Invalid expense type"
            });
        }

        const expenseDate = new Date(date); // converting date into date format

        if (Number.isNaN(expenseDate.getTime())) { // ??? 
            return res.status(400).json({
                error: "Invalid date"
            });
        }

        const userId = req.user.id;// comes from verified jwt

        const newExpense = new Expense({ // newExpense is a JavaScript object as it has key and values 
            // id: id, // mongodb makes its own id
            user: userId,
            title: trimmedTitle,
            amount: numericAmount,
            category,
            date: expenseDate,
            type
        });

        await newExpense.save();  // rember always save the newExpense as object in mongodb
        
        res.status(201).json(newExpense); // send the newExpense to frontend 
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