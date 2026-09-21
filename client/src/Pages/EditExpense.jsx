import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ExpenseForm from "../components/ExpenseForm";
import useExpenses from "../hooks/useExpenses";
import { getExpenseById } from "../api/expenseApi";

const EditExpense = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { handleSave, updatingId } = useExpenses();

    const [expense, setExpense] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExpense = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await getExpenseById(id);

                setExpense(data);
            } catch (error) {
                console.error(error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchExpense();
    }, [id]);

    const handleSubmit = async (updatedData) => {
        await handleSave({
            ...updatedData,
            _id: id,
        });

        navigate("/expenses");
    };

    if (loading) {
        return (
            <div className="p-6 lg:p-8">
                <div className="mx-auto max-w-3xl">
                    <div className="mb-8">
                        <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
                        <div className="mt-3 h-4 w-72 animate-pulse rounded bg-gray-200" />
                    </div>

                    <div className="h-96 animate-pulse rounded-2xl bg-gray-200" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 lg:p-8">
                <div className="mx-auto max-w-3xl rounded-2xl border border-red-200 bg-red-50 p-6">
                    <h2 className="font-semibold text-red-700">
                        Failed to load expense
                    </h2>

                    <p className="mt-1 text-sm text-red-600">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    if (!expense) {
        return null;
    }

    return (
        <div className="p-6 lg:p-8">
            <div className="mx-auto max-w-3xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Edit Expense
                    </h1>

                    <p className="mt-1 text-gray-500">
                        Update your income or expense transaction.
                    </p>
                </div>

                <ExpenseForm
                    initialData={expense}
                    onSubmit={handleSubmit}
                    isSubmitting={updatingId === id}
                    submitText="Update Expense"
                />
            </div>
        </div>
    );
};

export default EditExpense;