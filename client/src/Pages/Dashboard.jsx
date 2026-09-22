import {
    ArrowDownRight,
    ArrowUpRight,
    IndianRupee,
    Wallet,
    Receipt,
    TrendingUp,
} from "lucide-react";

import useExpenses from "../hooks/useExpenses";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const {
        expenseList,
        sortedExpenses,
        loading,
        error,

        totalIncome,
        totalExpense,
        totalBalance,

        numberOfExpenses,
        averageOfExpenses,
        highestExpense,
    } = useExpenses();

    const { token, isAuthenticated } = useAuth();

    console.log("is it authenticated",isAuthenticated);


    const stats = [
        {
            title: "Total Balance",
            value: totalBalance,
            icon: Wallet,
            description: "Your current balance",
        },
        {
            title: "Total Income",
            value: totalIncome,
            icon: ArrowUpRight,
            description: "Total money received",
        },
        {
            title: "Total Expenses",
            value: totalExpense,
            icon: ArrowDownRight,
            description: "Total money spent",
        },
        {
            title: "Transactions",
            value: numberOfExpenses,
            icon: Receipt,
            description: "Total transactions",
        },
    ];

    if (loading) {
        return (
            <div className="p-6 lg:p-8">
                <div className="mb-8">
                    <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
                    <div className="mt-3 h-4 w-72 animate-pulse rounded bg-gray-200" />
                </div>

                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {[1, 2, 3, 4].map((item) => (
                        <div
                            key={item}
                            className="h-36 animate-pulse rounded-2xl bg-gray-200"
                        />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 lg:p-8">
                <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
                    <h2 className="font-semibold text-red-700">
                        Something went wrong
                    </h2>

                    <p className="mt-1 text-sm text-red-600">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    Dashboard
                </h1>

                <p className="mt-1 text-gray-500">
                    Here's what's happening with your finances.
                </p>
            </div>

            {/* Stats */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.title}
                            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        {stat.title}
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-gray-900">
                                        {typeof stat.value === "number"
                                            ? `₹${stat.value.toLocaleString("en-IN")}`
                                            : stat.value}
                                    </h2>
                                </div>

                                <div className="rounded-xl bg-gray-100 p-3">
                                    <Icon
                                        size={21}
                                        className="text-gray-700"
                                    />
                                </div>
                            </div>

                            <p className="mt-4 text-sm text-gray-500">
                                {stat.description}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Additional statistics */}
            <div className="mt-8 grid gap-5 md:grid-cols-3">
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-gray-100 p-3">
                            <TrendingUp size={20} />
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Average Expense
                            </p>

                            <p className="mt-1 text-xl font-bold text-gray-900">
                                ₹
                                {averageOfExpenses.toLocaleString("en-IN")}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-gray-100 p-3">
                            <IndianRupee size={20} />
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Highest Expense
                            </p>

                            <p className="mt-1 text-xl font-bold text-gray-900">
                                ₹
                                {highestExpense.toLocaleString("en-IN")}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-gray-100 p-3">
                            <Receipt size={20} />
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Total Transactions
                            </p>

                            <p className="mt-1 text-xl font-bold text-gray-900">
                                {numberOfExpenses}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Expenses */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Recent Transactions
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Your latest income and expenses
                        </p>
                    </div>
                </div>

                {sortedExpenses.length === 0 ? (
                    <div className="px-6 py-12 text-center">
                        <Receipt
                            size={40}
                            className="mx-auto text-gray-300"
                        />

                        <h3 className="mt-4 font-medium text-gray-900">
                            No transactions yet
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                            Add your first expense to see it here.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {sortedExpenses.slice(0, 5).map((expense) => (
                            <div
                                key={expense._id || expense.id}
                                className="flex items-center justify-between px-6 py-5"
                            >
                                <div className="min-w-0">
                                    <p className="truncate font-medium text-gray-900">
                                        {expense.title}
                                    </p>

                                    <p className="mt-1 text-sm text-gray-500">
                                        {expense.category} · {expense.date}
                                    </p>
                                </div>

                                <p
                                    className={`ml-4 whitespace-nowrap font-semibold ${expense.type === "income"
                                            ? "text-green-600"
                                            : "text-red-600"
                                        }`}
                                >
                                    {expense.type === "income" ? "+" : "-"}₹
                                    {Number(
                                        expense.amount
                                    ).toLocaleString("en-IN")}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;