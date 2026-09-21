import { useNavigate } from "react-router-dom";

import ExpenseForm from "../components/ExpenseForm";
import useExpenses from "../hooks/useExpenses";

const AddExpense = () => {
    const navigate = useNavigate();

    const {
        handleAddExpense,
        isAdding,
    } = useExpenses();

    const handleSubmit = async (expenseData) => {
        await handleAddExpense(expenseData);

        navigate("/expenses");
    };

    return (
        <div className="p-6 lg:p-8">
            <div className="mx-auto max-w-3xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Add Expense
                    </h1>

                    <p className="mt-1 text-gray-500">
                        Add a new income or expense transaction.
                    </p>
                </div>

                <ExpenseForm
                    onSubmit={handleSubmit}
                    isSubmitting={isAdding}
                />
            </div>
        </div>
    );
};

export default AddExpense;