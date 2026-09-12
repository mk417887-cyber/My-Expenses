// useState is a named export, so you need curly braces:
import { useState } from "react";

const AddExpense = ({ onAddExpense }) => {

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("0");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [type, setType] = useState("expense");


    const handleSubmit = (e) => {
        e.preventDefault(); // Normally, submitting an HTML form causes the browser to refresh/navigate
        const newExpense = {
            id: Math.random(),
            title,
            amount: Number(amount),
            category,
            date,
            type,
        };
        // console.log(newExpense);

        // if (title === "" ||
            
        //     category === "" ||
        //     date === "" ||
        //     type === "") {
        //     return;
        // }

        onAddExpense(newExpense);
        // Reset the form
        setTitle("");
        setAmount("0");
        setCategory("");
        setDate("");
        setType("expense");
    }

    return (
        <div>
            <h2>Add Expense</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="Food">Food</option>
                    <option value="Travel">Travel</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Other">Other</option>
                    <option value="Education">Education</option>
                    <option value="Salary">Salary</option>
                </select>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                <button type="submit" >Add</button>
            </form>
        </div>
    );
};

export default AddExpense;