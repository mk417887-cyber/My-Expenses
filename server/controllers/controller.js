// Responsible for:

// reading req
// processing data
// sending res

import  Expense from "../models/Expense.js";
import mongoose from "mongoose";

export const  getExpenses = async (req, res) => {

   try{

    const data = await Expense.find(); //"Give me all documents from the Expense collection"

    res.json(data);
}
catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
}
   
};

export const deleteExpense =async (req, res) => {
   try{ // const id = Number(req.params.id);
    const id = req.params.id; // as mongodb makes its own objectid


    if( !mongoose.isValidObjectId(id)){
        return res.status(400).json({ error: "Invalid ID" });
    }
    const response = await Expense.findByIdAndDelete(id);
    
    if(!response){
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
    catch(error){
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const addExpense =async (req, res) => {

    try{    
        const { title, amount, category, date, type } = req.body; // Getting  the new expense from req.body as frontend sends it to backend // You're destructuring the data coming from the frontend.

    if (!title || !amount || !category || !date || !type) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    // const maxId = expenses.reduce((max, item) => {
        
    //     return Math.max(max, item.id);
    // }, 0);

    const newExpense = new Expense({ // newExpense is a JavaScript object
        // id: id, // mongodb makes its own id
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
try{
    const id = req.params.id;

    
    if( !mongoose.isValidObjectId(id)){
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

    const response = await Expense.findByIdAndUpdate( id, updateData, options )
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
