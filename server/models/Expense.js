import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        amount: { type: Number, required: true },
        category: { type: String, required: true },
        date: { type: Date , required: true },
        type: { type: String, required: true }
    },
    { timestamps: true }
);

export default mongoose.model("Expense", expenseSchema);// creates the Expense model that your controllers will use to communicate with MongoDB.