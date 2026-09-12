// import React from 'react'
// import expenses from "./data.js"
import { useState } from "react";

const ExpenseItem = ({ expense, onDelete, onEdit, isEditing , onCancelEdit }) => {  // This is destructuring.

    const amount = expense.type === "income" ? expense.amount : -1 * expense.amount;

    const [editTitle, setEditTitle] = useState(expense.title);
    const [editAmount, setEditAmount] = useState(expense.amount);
    const [editCategory, setEditCategory] = useState(expense.category);
    const [editDate, setEditDate] = useState(expense.date);
    const [editType, setEditType] = useState(expense.type);

    
const handleSave = (e) => {
    e.preventDefault();
  
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
                <form>
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                    />

                    <input
                        type="number"
                        value={editAmount}
                        onChange={(e) => setEditAmount(e.target.value)}
                    />
                    {/* // Even with:
            // type="number"
            // e.target.value is still a string.
            // We'll convert it to a number when saving. */}
                    <button>Save</button>
                    <button onClick={onCancelEdit}>Cancel</button>
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
                    <h3>{expense.type === "income" ? "Income" : "Expense"}</h3>
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

export default ExpenseItem
