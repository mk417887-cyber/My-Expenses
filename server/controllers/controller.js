import Expense from "../models/Expense.js";
// Imports the Expense Mongoose model.
// The model is used to create, find, update, and delete expense documents
// in the MongoDB Expense collection.

import mongoose from "mongoose";
// Imports the Mongoose library.
// We use it here mainly to validate MongoDB ObjectId values.


const escapeRegex = (value) => {
    // Takes a string and escapes characters that have special meaning in Regex.
    // This makes the user's search text behave like normal text
    // instead of being interpreted as a Regex expression.

    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // Finds Regex-special characters in the input and adds "\" before them.
    // Example: "a+b" becomes "a\+b", so "+" is treated as a literal character.
};



export const getExpenses = async (req, res) => {
    // Controller responsible for getting expenses belonging to the logged-in user.
    // It is async because it performs database operations using await.

    try {

        const { search, type, category, page, limit } = req.query;
        // req.query contains values provided in the URL's query string.
        // Example:
        // /api/expenses?search=food&type=expense&page=2&limit=10
        //
        // req.query would approximately be:
        // {
        //     search: "food",
        //     type: "expense",
        //     category: "...",
        //     page: "2",
        //     limit: "10"
        // }
        //
        // Query-string values are received as strings.
        // Destructuring extracts the required values into separate variables.



        const parsedPage = Number(page);
        // Converts page from a string to a number.
        // Example: "2" → 2.

        const parsedLimit = Number(limit);
        // Converts limit from a string to a number.
        // Example: "10" → 10.



        const pageNumber =
            // If parsedPage is an integer and is >= 1,
            // use it; otherwise use 1 as the default page.

            Number.isInteger(parsedPage) && parsedPage >= 1
                ? parsedPage
                : 1;



        const limitNumber =
            // If parsedLimit is an integer between 1 and 100,
            // use it; otherwise use 10 as the default limit.

            Number.isInteger(parsedLimit) &&
                parsedLimit >= 1 &&
                parsedLimit <= 100
                ? parsedLimit
                : 10;



        const userId = req.user.id;
        // Gets the ID of the currently authenticated user.
        // req.user is created/populated by the protect middleware
        // after successfully verifying the user's JWT.



        const query = { user: userId };
        // Creates the initial MongoDB query.
        // It tells MongoDB:
        // "Only return expenses whose user field matches this logged-in user."



        const skip = (pageNumber - 1) * limitNumber;
        // Calculates how many documents should be skipped for pagination.
        //
        // Example:
        // page = 1, limit = 10 → skip 0
        // page = 2, limit = 10 → skip 10
        // page = 3, limit = 10 → skip 20



        if (search) {
            // If the user provided a search value,
            // add a title-search condition to the MongoDB query.

            query.title = {
                $regex: escapeRegex(search),
                // Searches the title using Regex.
                // escapeRegex() makes the user's search text literal
                // instead of allowing Regex-special characters to act as operators.

                $options: "i"
                // "i" means case-insensitive.
                // Example: "food", "Food", and "FOOD" can match.
            };
        }



        if (type) {
            // If a type was provided, add it to the MongoDB query.
            // Example: type = "expense"

            query.type = type;
        }



        if (category) {
            // If a category was provided, add it to the MongoDB query.
            // Example: category = "Food"

            query.category = category;
        }



        const total = await Expense.countDocuments(query);
        // Counts how many documents match the complete query.
        // This is used to calculate pagination information.
        //
        // For example, if there are 47 matching expenses,
        // total will be 47.



        const totalPages = Math.ceil(total / limitNumber);
        // Calculates the total number of pages.
        //
        // Example:
        // total = 47
        // limit = 10
        // totalPages = Math.ceil(47 / 10) = 5



        const data = await Expense.find(query)
            // Finds all Expense documents matching the query.
            //
            // The query may contain:
            // user
            // search/title
            // type
            // category

            .sort({ date: -1 })
            // Sorts the matching expenses by date.
            // -1 means descending order, so newest dates appear first.
            // 1 would mean ascending order.

            .skip(skip)
            // Skips the number of documents calculated for pagination.

            .limit(limitNumber);
        // Limits the number of documents returned for this page.



        res.json({
            // Sends a JSON response back to the frontend.

            data,
            // The expenses returned for the current page.

            total,
            // Total number of matching expenses.

            page: pageNumber,
            // Current page number.

            limit: limitNumber,
            // Number of expenses returned per page.

            totalPages
            // Total number of pages available.
        });



    }

    catch (error) {
        // If any unexpected error occurs while processing the request,
        // execution comes here.

        console.error(error);
        // Prints the error on the backend console for debugging.

        return res.status(500).json({
            error: "Internal server error"
        });
        // Sends HTTP 500 (Internal Server Error) to the frontend
        // in JSON format.
    }
};



// ------------------------------------------------------------
// DELETE EXPENSE
// ------------------------------------------------------------

export const deleteExpense = async (req, res) => {
    // Controller responsible for deleting an expense.
    // It deletes only an expense belonging to the logged-in user.

    try {

        const id = req.params.id;
        // req.params contains dynamic parameters from the URL.
        //
        // For a route such as:
        // DELETE /api/expenses/65abc123
        //
        // req.params is:
        // { id: "65abc123" }
        //
        // Therefore req.params.id gives us:
        // "65abc123"



        if (!mongoose.isValidObjectId(id)) {
            // Checks whether the provided ID has a valid MongoDB ObjectId format.
            // This checks the format of the ID, NOT whether the document actually exists.

            return res.status(400).json({
                error: "Invalid ID"
            });
            // Sends HTTP 400 (Bad Request) if the ID format is invalid.
        }



        const response = await Expense.findOneAndDelete({
            // Finds ONE expense matching ALL of the conditions below
            // and deletes it if found.

            _id: id,
            // The expense's MongoDB ID must match the ID from the URL.

            user: req.user.id
            // The expense must also belong to the currently logged-in user.
            //
            // This prevents a user from deleting another user's expense
            // simply by knowing its ID.
        });



        if (!response) {
            // If no matching expense was found,
            // findOneAndDelete() returns null.

            return res.status(404).json({
                error: "Expense not found"
            });
            // Sends HTTP 404 (Not Found) to the frontend.
        }



        res.json(response);
        // If the expense was successfully deleted,
        // sends the deleted expense document back as JSON.
    }

    catch (error) {

        console.error(error);
        // Logs the unexpected backend error.

        return res.status(500).json({
            error: "Internal server error"
        });
        // Sends HTTP 500 to the frontend.
    }
};



// ------------------------------------------------------------
// ADD EXPENSE
// ------------------------------------------------------------

export const addExpense = async (req, res) => {
    // Controller responsible for creating a new expense
    // for the currently authenticated user.

    try {

        const { title, amount, category, date, type } = req.body;
        // req.body contains data sent by the frontend.
        //
        // Example:
        // {
        //     title: "Food",
        //     amount: 500,
        //     category: "Food",
        //     date: "2026-09-25",
        //     type: "expense"
        // }
        //
        // Destructuring extracts these values into separate variables.



        if (!title || !category || !date || !type || amount === undefined) {
            // Checks whether any required field is missing.
            //
            // amount === undefined is used instead of !amount because 0 is also
            // a falsy value in JavaScript.
            // We want the later validation to specifically handle invalid/zero amounts.

            return res.status(400).json({
                error: "Missing required fields"
            });
            // Sends HTTP 400 because the client did not provide all required data.
        }



        const trimmedTitle = title.trim();
        // Removes unnecessary whitespace from the beginning and end of the title.
        //
        // Example:
        // "   Grocery   " → "Grocery"



        if (trimmedTitle.length < 1 || trimmedTitle.length > 100) {
            // Makes sure the title contains between 1 and 100 characters.

            return res.status(400).json({
                error: "Title must be between 1 and 100 characters"
            });
        }



        const numericAmount = Number(amount);
        // Converts amount into a JavaScript number.
        //
        // Example:
        // "500" → 500



        if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
            // Checks that the amount is:
            // 1. A valid finite number
            // 2. Greater than 0
            //
            // This rejects values such as:
            // NaN
            // Infinity
            // 0
            // negative numbers

            return res.status(400).json({
                error: "Amount must be a valid positive number"
            });
        }



        const allowedCategories = [
            // Defines the categories that the application allows.

            "Food",
            "Travel",
            "Entertainment",
            "Other",
            "Education",
            "Health",
        ];



        if (!allowedCategories.includes(category)) {
            // Checks whether the submitted category exists
            // inside the allowedCategories array.

            return res.status(400).json({
                error: "Invalid category"
            });
        }



        const allowedTypes = ["income", "expense"];
        // Defines the only two types allowed by the application.



        if (!allowedTypes.includes(type)) {
            // Checks whether the submitted type is either
            // "income" or "expense".

            return res.status(400).json({
                error: "Invalid expense type"
            });
        }



        const expenseDate = new Date(date);
        // Converts the incoming date value into a JavaScript Date object.



        if (Number.isNaN(expenseDate.getTime())) {
            // getTime() returns a numeric timestamp for a valid Date.
            // An invalid Date produces NaN.
            // Therefore this checks whether the provided date is invalid.

            return res.status(400).json({
                error: "Invalid date"
            });
        }



        const userId = req.user.id;
        // Gets the authenticated user's ID.
        // This comes from the protect middleware after the JWT is verified.
        //
        // The frontend should NOT be trusted to tell us which user owns the expense.
        // The authenticated user ID comes from req.user.



        const newExpense = new Expense({
            // Creates a new Mongoose document using the Expense model.
            //
            // At this point the document exists in the Node.js application's memory.
            // It has NOT been saved to MongoDB yet.

            // MongoDB automatically generates the _id.

            user: userId,
            // Associates this expense with the authenticated user.

            title: trimmedTitle,
            // Stores the cleaned title.

            amount: numericAmount,
            // Stores the validated numeric amount.

            category,
            // Stores the selected category.

            date: expenseDate,
            // Stores the validated Date object.

            type
            // Stores either "income" or "expense".
        });



        await newExpense.save();
        // Saves the Mongoose document to MongoDB.
        // This is the step that actually persists the new expense
        // in the database.



        res.status(201).json(newExpense);
        // Sends the newly created expense back to the frontend as JSON.
        //
        // 201 means "Created" and is commonly used when a new resource
        // has been successfully created.
    }

    catch (error) {

        console.error(error);
        // Logs unexpected backend errors.

        return res.status(500).json({
            error: "Internal server error"
        });
        // Sends HTTP 500 to the frontend.
    }
};


//--------------------------------------------------------------
// Edit Expense
//--------------------------------------------------------------

export const updateExpense = async (req, res) => {// creating a async function to update a expense
    try {
        const id = req.params.id; // req.params contains dynamic parameters from the URL
        // we are storing the dynamic id provided by frontend in a variable 


        if (!mongoose.isValidObjectId(id)) { // checking if the id is in correct mongoose vormat
            return res.status(400).json({ error: "Invalid ID" }); // if it is not in correct format then we are sending a error message and returning from thre function
        }


        const { title, amount, category, date, type } = req.body;  // destruvtring the fileds from req.body // You're destructuring the data coming from the frontend.

        if (!title || !amount || !category || !date || !type) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const updateData = { //  storing the already existing data in a variable
            title,
            amount: Number(amount),
            category,
            date,
            type
        };

        const options = { new: true }; // this tells Mongoose to return the updated document

        const response = await Expense.findOneAndUpdate( // find one expense in database with these particular conditions 
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
            return res.status(404).json({ error: "Expense not found" }); // if can't find the expense then we are sending a error message
        }

        res.json(response);  // if found then we are sending the updated expense to the frontend
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" }); // if there is any error then we are sending a error message in json format
    }
};

export const getExpenseById = async (req, res) => { // this function helps in finding a particular expense by a given id
    try {
        const { id } = req.params;  // req.params contains dynamic parameters from the URL // but why is id in curly brackets ??

        const expense = await Expense.findOne({ // finding a particular expense by a given id and user
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

export const getExpenseSummary = async (req, res) => { // doing a summary of the expenses  in backend
    try {
        const userId = new mongoose.Types.ObjectId(req.user.id); // converting the coming id into mongoose format 

        const summary = await Expense.aggregate([ // doing calculations on the expenses
            {
                $match: { // first match the user id with the one in the database 
                    user: userId
                } 
            },
            {
                $group: { // grouping the expenses by user id 
                    _id: null, // null means no group   ,, why are we doing this ??

                    totalIncome: { // 
                        $sum: {  // applying sum function
                            $cond: [ // if the type is income then sum the amount else 0
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

        const categorySummary = await Expense.aggregate([ // what does aggreate means and why are we doing this ?
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

        const result = summary[0] || { // if summary is empty then return an empty object else return the summary
            totalIncome: 0,
            totalExpense: 0,
            numberOfExpenses: 0,
            averageExpense: 0,
            highestExpense: 0,
            totalTransactions: 0,
        };

        const totalBalance =
            result.totalIncome - result.totalExpense;

        return res.json({ // returning the summary
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