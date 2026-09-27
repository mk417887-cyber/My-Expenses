import mongoose from "mongoose";
const expenseSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        amount: {
            type: Number,
            required: true,
            min: 0.01,
        },

        category: {
            type: String,
            required: true,
            enum: [
                "Food",
                "Travel",
                "Entertainment",
                "Other",
                "Education",
                "Health",
            ],
        },

        date: {
            type: Date,
            required: true,
        },

        type: {
            type: String,
            required: true,
            enum: ["income", "expense"],
        },
    },
    { timestamps: true }
);

expenseSchema.index({ user: 1, date: -1 });// find user expense sort them by date descending so later it ecomes easy to paginate

export default mongoose.model("Expense", expenseSchema);// creates the Expense model that your controllers will use to communicate with MongoDB.