// import React from 'react'
// import expenses from "./data.js"
import { useState , memo} from "react";

const ExpenseItem = ({ expense, onDelete, onEdit, isEditing, onCancelEdit, onSave }) => {  // This is destructuring. of props

    const amount = expense.type === "income" ? expense.amount : -1 * expense.amount;

    const [editTitle, setEditTitle] = useState(expense.title);
    const [editAmount, setEditAmount] = useState(expense.amount);
    const [editCategory, setEditCategory] = useState(expense.category);
    const [editDate, setEditDate] = useState(expense.date);
    const [editType, setEditType] = useState(expense.type);
    const [errors , setErrors] = useState(
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
                    <h2>{expense.id}</h2>
                    <h3>{expense.title}</h3>
                    <p>{amount}</p>
                    <p>{expense.category}</p>
                    <p>{expense.date}</p>
                    <p>{expense.type}</p>
                    <p>{expense.type === "income" ? "Income" : "Expense"}</p>
                    <button onClick={() => onDelete(expense.id)}>Delete</button>
                    {/* //  Remember how Delete works: ExpenseItem  ↓onDelete(expense.id) ↓ App.handleDelete(id) ↓ setExpenseList(...) */}

                    <button onClick={() => onEdit(expense.id)}>
                        Edit
                    </button>
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