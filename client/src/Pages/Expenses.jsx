import {
    Plus,
    Search,
    Filter,
    Receipt,
    Trash2,
    Edit,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import { useState } from "react";

import DeleteConfirmModal from "../components/DeleteConfirmModal";

import { Link } from "react-router-dom";

import useExpenses from "../hooks/useExpenses";

const Expenses = () => {

    const [expenseToDelete, setExpenseToDelete] = useState(null);

    const {
        sortedExpenses,
        loading,
        error,
        deletingId,

        page,
        totalPages,
        handlePreviousPage,
        handleNextPage,

        searchTerm,
        filterType,
        filterCategory,
        sortOption,

        setSearchTerm,
        setFilterType,
        setFilterCategory,
        setSortOption,

        handleDelete,
    } = useExpenses();

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Expenses
                    </h1>

                    <p className="mt-1 text-gray-500">
                        Manage and track your income and expenses.
                    </p>
                </div>

                <Link
                    to="/expenses/add"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                    <Plus size={18} />
                    Add Expense
                </Link>
            </div>

            {/* Filters */}
            <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-3 lg:flex-row">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(e.target.value)
                            }
                            placeholder="Search expenses..."
                            className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                        />
                    </div>

                    {/* Type */}
                    <select
                        value={filterType}
                        onChange={(e) =>
                            setFilterType(e.target.value)
                        }
                        className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-gray-400"
                    >
                        <option value="all">All types</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>

                    {/* Category */}
                    <select
                        value={filterCategory}
                        onChange={(e) =>
                            setFilterCategory(e.target.value)
                        }
                        className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-gray-400"
                    >
                        <option value="all">All categories</option>
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Entertainment">
                            Entertainment
                        </option>
                        <option value="Education">Education</option>
                        <option value="Health">Health</option>
                        <option value="Other">Other</option>
                    </select>

                    {/* Sort */}
                    <div className="relative">
                        <Filter
                            size={17}
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <select
                            value={sortOption}
                            onChange={(e) =>
                                setSortOption(e.target.value)
                            }
                            className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-10 text-sm text-gray-700 outline-none focus:border-gray-400 lg:w-44"
                        >
                            <option value="default">
                                Sort by
                            </option>
                            <option value="newest">
                                Newest
                            </option>
                            <option value="oldest">
                                Oldest
                            </option>
                            <option value="highest">
                                Highest amount
                            </option>
                            <option value="lowest">
                                Lowest amount
                            </option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4">
                    <p className="text-sm font-medium text-red-700">
                        {error}
                    </p>
                </div>
            )}

            {/* Expense list */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-200 px-6 py-5">
                    <h2 className="font-semibold text-gray-900">
                        Transactions
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        View and manage your transactions.
                    </p>
                </div>

                {/* Loading */}
                {loading ? (
                    <div className="divide-y divide-gray-100">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div
                                key={item}
                                className="flex items-center justify-between px-6 py-5"
                            >
                                <div className="flex-1">
                                    <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
                                    <div className="mt-2 h-3 w-28 animate-pulse rounded bg-gray-200" />
                                </div>

                                <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
                            </div>
                        ))}
                    </div>
                ) : sortedExpenses.length === 0 ? (
                    /* Empty state */
                    <div className="px-6 py-16 text-center">
                        <Receipt
                            size={44}
                            className="mx-auto text-gray-300"
                        />

                        <h3 className="mt-4 font-semibold text-gray-900">
                            No transactions found
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                            Try changing your filters or add a new
                            transaction.
                        </p>

                        <Link
                            to="/expenses/add"
                            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                        >
                            <Plus size={17} />
                            Add Expense
                        </Link>
                    </div>
                ) : (
                    /* Transactions */
                    <div className="divide-y divide-gray-100">
                        {sortedExpenses.map((expense) => (
                            <div
                                key={expense._id}
                                className="flex flex-col gap-4 px-6 py-5 transition hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between"
                            >
                                {/* Left side */}
                                <div className="flex min-w-0 items-center gap-4">
                                    <div
                                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${expense.type === "income"
                                            ? "bg-green-100 text-green-600"
                                            : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        {expense.type === "income" ? (
                                            <Plus size={20} />
                                        ) : (
                                            <Receipt size={20} />
                                        )}
                                    </div>

                                    <div className="min-w-0">
                                        <p className="truncate font-medium text-gray-900">
                                            {expense.title}
                                        </p>

                                        <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                                            <span>
                                                {expense.category}
                                            </span>

                                            <span>•</span>

                                            <span>
                                                {expense.date}
                                            </span>

                                            <span>•</span>

                                            <span className="capitalize">
                                                {expense.type}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right side */}
                                <div className="flex items-center justify-between gap-5 sm:justify-end">
                                    <p
                                        className={`whitespace-nowrap font-semibold ${expense.type === "income"
                                            ? "text-green-600"
                                            : "text-red-600"
                                            }`}
                                    >
                                        {expense.type === "income"
                                            ? "+"
                                            : "-"}
                                        ₹
                                        {Number(
                                            expense.amount
                                        ).toLocaleString("en-IN")}
                                    </p>

                                    <div className="flex items-center gap-1">
                                        {/* Edit */}
                                        <Link
                                            to={`/expenses/${expense._id}/edit`}
                                            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                                            aria-label="Edit expense"
                                        >
                                            <Edit size={18} />
                                        </Link>

                                        {/* Delete */}
                                        <button
                                            onClick={() => setExpenseToDelete(expense)}
                                            disabled={deletingId === expense._id}
                                            className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                                            aria-label="Delete expense"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {!loading &&
                    sortedExpenses.length > 0 &&
                    totalPages > 1 && (
                        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
                            <button
                                onClick={handlePreviousPage}
                                disabled={page === 1}
                                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <ChevronLeft size={17} />
                                Previous
                            </button>

                            <span className="text-sm text-gray-500">
                                Page{" "}
                                <span className="font-medium text-gray-900">
                                    {page}
                                </span>{" "}
                                of{" "}
                                <span className="font-medium text-gray-900">
                                    {totalPages}
                                </span>
                            </span>

                            <button
                                onClick={handleNextPage}
                                disabled={page === totalPages}
                                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Next
                                <ChevronRight size={17} />
                            </button>
                          
                        </div>
                    )}
            </div>
            <DeleteConfirmModal
                                isOpen={Boolean(expenseToDelete)}
                                expense={expenseToDelete}
                                onCancel={() => setExpenseToDelete(null)}
                                onConfirm={async () => {
                                    try {
                                        await handleDelete(expenseToDelete._id);
                                        setExpenseToDelete(null);
                                    } catch (error) {
                                        // Error toast is already handled inside useExpenses.
                                    }
                                }}
                                isDeleting={deletingId === expenseToDelete?._id}
                            />
        </div>
    );
};

export default Expenses;