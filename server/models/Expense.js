import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId, // "Store a MongoDB ObjectId here."
            ref: "User",   // That ObjectId refers to a document in the User collection."
            required: true
        },
        title: { type: String, required: true },
        amount: { type: Number, required: true },
        category: { type: String, required: true },
        date: { type: Date , required: true },
        type: { type: String, required: true }
    },
    { timestamps: true }
);

export default mongoose.model("Expense", expenseSchema);// creates the Expense model that your controllers will use to communicate with MongoDB.