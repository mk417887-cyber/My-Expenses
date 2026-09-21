import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { Link } from "react-router-dom";

const ExpenseForm = ({
    onSubmit,
    isSubmitting = false,
    initialData = null,
    submitText = "Save Expense",
}) => {

    const [title, setTitle] = useState(initialData?.title || "");
    const [amount, setAmount] = useState(
        initialData?.amount || ""
    );
    const [category, setCategory] = useState(
        initialData?.category || ""
    );
    const [date, setDate] = useState(
        initialData?.date || ""
    );
    const [type, setType] = useState(
        initialData?.type || "expense"
    );

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!title.trim()) {
            newErrors.title = "Title is required";
        }

        if (!amount || Number(amount) <= 0) {
            newErrors.amount = "Amount must be greater than 0";
        }

        if (!category) {
            newErrors.category = "Please select a category";
        }

        if (!date) {
            newErrors.date = "Please select a date";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        const expenseData = {
            title: title.trim(),
            amount: Number(amount),
            category,
            date,
            type,
        };

        await onSubmit(expenseData);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:p-8"
        >
            {/* Back */}
            <Link
                to="/expenses"
                className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
            >
                <ArrowLeft size={17} />
                Back to expenses
            </Link>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Title */}
                <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Title
                    </label>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Grocery shopping"
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                    />

                    {errors.title && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.title}
                        </p>
                    )}
                </div>

                {/* Amount */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Amount
                    </label>

                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                    />

                    {errors.amount && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.amount}
                        </p>
                    )}
                </div>

                {/* Type */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Type
                    </label>

                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                    >
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>
                </div>

                {/* Category */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Category
                    </label>

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                    >
                        <option value="">Select category</option>
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Entertainment">
                            Entertainment
                        </option>
                        <option value="Education">Education</option>
                        <option value="Health">Health</option>
                        <option value="Other">Other</option>
                    </select>

                    {errors.category && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.category}
                        </p>
                    )}
                </div>

                {/* Date */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Date
                    </label>

                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                    />

                    {errors.date && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.date}
                        </p>
                    )}
                </div>
            </div>

            {/* Submit */}
            <div className="mt-8 flex justify-end">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-blue-500 transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <Save size={18} />

                    {isSubmitting
                        ? "Saving..."
                        : submitText}
                </button>
            </div>
        </form>
    );
};

export default ExpenseForm;