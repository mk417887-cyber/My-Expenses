// Responsible for:

// reading req
// processing data
// sending res

import expenses from "../data/expenses.js";

export const  getExpenses = (req, res) => {

    const search = req.query.search;

    if (!search) {
        return res.json(expenses);
    }
    const filteredExpenses = expenses
    .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase())); // server side filtering
    
    res.json(filteredExpenses);
};

export const deleteExpense = (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }

    const expenseIndex = expenses.findIndex( // This gives you the position of the expense.
        (item) => item.id === id
    );

    if (expenseIndex === -1) {
        return res.status(404).json({ error: "Expense not found" });
    }

    expenses.splice(expenseIndex, 1); // Start at this index and remove 1 item.

    res.json(expenses);
};

export const addExpense = (req, res) => {
    const { title, amount, category, date, type } = req.body; // Getting  the new expense from req.body as frontend sends it to backend // You're destructuring the data coming from the frontend.

    if (!title || !amount || !category || !date || !type) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const maxId = expenses.reduce((max, item) => {
        
        return Math.max(max, item.id);
    }, 0);

    const newExpense = {
        id: maxId + 1,
        title,
        amount: Number(amount),
        category,
        date,
        type
    }
    expenses.push(newExpense); // Add it to the expenses array using .push(

    res.status(201).json(newExpense);

};

export const updateExpense = (req, res) => {

    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }

    const expenseIndex = expenses.findIndex(
        (item) => item.id === id
    );

    if (expenseIndex === -1) {
        return res.status(404).json({ error: "Expense not found" });
    }

    const { title, amount, category, date, type } = req.body; 

    if (!title || !amount || !category || !date || !type) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    expenses[expenseIndex] = {
        ...expenses[expenseIndex], // Copy the existing expense
        title,
        amount: Number(amount),
        category,
        date,
        type
    };

    res.json(expenses[expenseIndex]);
};
