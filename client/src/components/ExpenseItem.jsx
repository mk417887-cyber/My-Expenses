// import React from 'react'
// import expenses from "./data.js"
import { useState, memo } from "react";

const ExpenseItem = ({ expense, onDelete, onEdit, isEditing, onCancelEdit, onSave , deletingId }) => {  // This is destructuring. of props

    const amount = expense.type === "income" ? expense.amount : -1 * expense.amount;

    const [editTitle, setEditTitle] = useState(expense.title);
    const [editAmount, setEditAmount] = useState(expense.amount);
    const [editCategory, setEditCategory] = useState(expense.category);
    const [editDate, setEditDate] = useState(expense.date);
    const [editType, setEditType] = useState(expense.type);
    const isDeleting = deletingId === expense._id;
    const [errors, setErrors] = useState(
        {
            title: "",
            amount: "",
            category: "",
            date: ""
        } // Using plural errors makes sense because you're storing errors for multiple fields.
    );
    const validateForm = () => {
        // validation here
        //new object
        const newErrors = {
            title: "",
            amount: "",
            category: "",
            date: ""
        };
        if (editTitle === "") {
            newErrors.title = "Title is required";
        }

        if (editAmount === "" || Number(editAmount) <= 0) {
            newErrors.amount = "Amount must be greater than 0";
        }

        if (editCategory === "") {
            newErrors.category = "Category is required";
        }

        if (editDate === "") {
            newErrors.date = "Date is required";
        }
        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some( // asks:          "Is there at least one error that isn't an empty string?"
            (error) => error !== ""
        );
        return !hasErrors;
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }
        // create updated expense
        const updatedExpense = {
            id: expense.id,
            title: editTitle,
            amount: Number(editAmount),
            category: editCategory,
            date: editDate,
            type: editType
        };
        // Notice that we're creating a new object rather than changing:
        // expense.title = editTitle
        // That's important for React's immutability principle.

        // call the onEdit function with the updated expense
        // we'll now do:
        // ExpenseItem
        //     ↓
        // onSave(updatedExpense)
        //     ↓
        // App
        // So you'll need to create an onSave prop.
        onSave(updatedExpense);

    };

    return (
        <div>
            {isEditing ? (
                // EDIT FORM
                <div>
                    <form onSubmit={handleEditSubmit}>
                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        {errors.title && <p>{errors.title}</p>}
                        {/* // // / if errors.title = "Title is required" then show "Title is required" */}
                        <input
                            type="number"
                            value={editAmount}
                            onChange={(e) => setEditAmount(e.target.value)}
                        />
                        {errors.amount && <p>{errors.amount}</p>}
                        {/* // Even with:
            // type="number"
            // e.target.value is still a string.
            // We'll convert it to a number when saving. */}
                        <input
                            type="text"
                            value={editCategory}
                            onChange={(e) => setEditCategory(e.target.value)}
                        />
                        {errors.category && <p>{errors.category}</p>}
                        <input
                            type="date"
                            value={editDate}
                            onChange={(e) => setEditDate(e.target.value)}
                        />
                        {errors.date && <p>{errors.date}</p>}
                        <select
                            value={editType}
                            onChange={(e) => setEditType(e.target.value)}
                        >
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>

                        <button type="submit">Save</button>
                        <button type="button" onClick={onCancelEdit}>
                            Cancel
                        </button>
                        {/* This is a good HTML/form concept to remember:button inside form     ↓ default type = submit */}
                    </form>
                </div>
            ) : (
                // NORMAL EXPENSE DISPLAY
                <div>
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-md transition hover:border-slate-700 hover:shadow-lg">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                            {/* Left side */}
                            <div>
                                <h3 className="text-lg font-semibold text-white">
                                    Title : {expense.title}
                                </h3>

                                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                                    <span className="rounded-full bg-slate-800 px-3 py-1 text-slate-300">
                                        Category : {expense.category}
                                    </span>

                                    <span className="rounded-full bg-slate-800 px-3 py-1 text-slate-300">
                                        Date is : {expense.date}
                                    </span>
                                </div>
                            </div>

                            {/* Right side */}
                            <div className="flex items-center gap-4">

                                <p className={`text-lg font-bold ${expense.type === "income"
                                    ? "text-emerald-400"
                                    : "text-red-400"
                                    }`}>
                                    {expense.type} : {expense.type === "income" ? "+" : "-"}₹{expense.amount}
                                </p>

                                {/* Edit button */}
                                <button className="rounded-lg bg-indigo-500/10 px-3 py-2 text-sm font-medium text-indigo-400 transition hover:bg-indigo-500/20"
                                    onClick={() => onEdit(expense._id)}>
                                    Edit
                                </button>

                                {/* Delete button */}
                                <button className="rounded-lg bg-red-500/10 px-3 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/20"
                                    onClick={() => onDelete(expense._id)                                     
                                    } disabled={isDeleting}>
                                   {isDeleting ? "Deleting..." : "Delete"}
                                </button>

                            </div>

                        </div>
                    </div>
                   
                </div>
            )}

        </div>
    )
}

export default memo(ExpenseItem)  // memorize the component using memo

// Now ask yourself:

// If ExpenseItem is memoized, will it always avoid re-rendering when App re-renders?

// No. Because it receives several props:

// expense
// onDelete
// onEdit
// isEditing
// onCancelEdit
// onSave

// If any of those props changes, the component can render again.

// And this is exactly why we learned useCallback before React.memo.
// Right now there's a major problem: before Local storage usage

// If you refresh the browser, all newly added/edited/deleted expenses disappear. When you add/delete/edit:

// React State
// ↓
// expenseList changes
// ↓
// UI re-renders

// But expenseList exists only while the page is running.

// We'll fix that using localStorage + useEffect.

// But JavaScript's default sort() converts values to strings and compares them.

// For numbers, we usually provide a comparator function:

// numbers.sort((a, b) => a - b);
// How it works
// a - b < 0  → a comes before b
// a - b > 0  → b comes before a
// a - b = 0  → same order

// So:

// numbers.sort((a, b) => a - b);

// means ascending.

// And:

// numbers.sort((a, b) => b - a);

// means descending.

// Don't do this directly:

// expenseList.sort(...)

// Why?

// Because .sort() mutates the original array.

// React state should not be directly mutated.

// Instead, make a copy:

// const sortedExpenses = [...expenseList];

// Then sort the copy.

// expenseList
//      ↓
// [...expenseList]
//      ↓
// new array
//      ↓
// sort()

// This is another example of the immutability principle you've already learned.