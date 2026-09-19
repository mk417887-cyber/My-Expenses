// useState is a named export, so you need curly braces:
import { useState } from "react";

const AddExpense = ({ onAddExpense, isAdding }) => {

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Food");
    const [date, setDate] = useState("");
    const [type, setType] = useState("expense");
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
        if (title === "") {
            newErrors.title = "Title is required";
        }

        if (amount === "" || Number(amount) <= 0) {
            newErrors.amount = "Amount must be greater than 0";
        }

        if (category === "") {
            newErrors.category = "Category is required";
        }

        if (date === "") {
            newErrors.date = "Date is required";
        }
        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some( // asks:          "Is there at least one error that isn't an empty string?"
            (error) => error !== ""
        );
        return !hasErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Normally, submitting an HTML form causes the browser to refresh/navigate
        if (!validateForm()) {
            return;
        }
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
            <div className="min-h-screen bg-slate-950 text-white">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                    <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold">
                                Add New Expense
                            </h2>

                            <p className="mt-1 text-sm text-slate-400">
                                Add your income or expense.
                            </p>
                        </div>


                    </section>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <input
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            {errors.title && <p>{errors.title}</p>}
                            <input
                                type="number"
                                placeholder="Amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                            {errors.amount && <p>{errors.amount}</p>}
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
                            {errors.category && <p>{errors.category}</p>}
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                            {errors.date && <p>{errors.date}</p>}
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                            <button
                                type="submit"
                                disabled={isAdding}
                                className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-500 active:scale-[0.98]"
                            >
                                {isAdding ? "Adding..." : "Add Expense"}
                            </button>
                            <button type="submit" >

                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddExpense;