import {
    ArrowDownRight,
    ArrowUpRight,
    IndianRupee,
    Wallet,
    Receipt,
    TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import useExpenses from "../hooks/useExpenses";

const Dashboard = () => {

    const {
    
        error,
        totalIncome,
        totalExpense,
        totalBalance,
        numberOfExpenses,
        averageExpense,
        highestExpense,
        summaryLoading,
        summaryError,
        recentExpenses,
        recentLoading,
        recentError,
        
        totalTransactions,
        totalByCategory,
    } = useExpenses();

    const navigate = useNavigate();

    const navigateToExpenses = () => {
        navigate("/expenses");
    }

    const navigateToEditExpense = (id) => {
        navigate(`/expenses/${id}/edit`);
    };

    const stats = [
        {
            title: "Total Balance",
            value: totalBalance,
            icon: Wallet,
            description: "Your current balance",
            isCurrency: true,
        },
        {
            title: "Total Income",
            value: totalIncome,
            icon: ArrowUpRight,
            description: "Total money received",
            isCurrency: true,
        },
        {
            title: "Total Expenses",
            value: totalExpense,
            icon: ArrowDownRight,
            description: "Total money spent",
            isCurrency: true,
        },
        {
            title: "Transactions",
            value: totalTransactions,
            icon: Receipt,
            description: "Total transactions",
            isCurrency: false,
        },
    ];

    // if (loading || summaryLoading) {
    //     return (
    //         <div className="p-6 lg:p-8">
    //             <div className="mb-8">
    //                 <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
    //                 <div className="mt-3 h-4 w-72 animate-pulse rounded bg-gray-200" />
    //             </div>

    //             <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
    //                 {[1, 2, 3, 4].map((item) => (
    //                     <div
    //                         key={item}
    //                         className="h-36 animate-pulse rounded-2xl bg-gray-200"
    //                     />
    //                 ))}
    //             </div>
    //         </div>
    //     );
    // }

    if (error || summaryError) {
        return (
            <div className="p-6 lg:p-8">
                <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
                    <h2 className="font-semibold text-red-700">
                        Something went wrong
                    </h2>

                    <p className="mt-1 text-sm text-red-600">
                        {error || summaryError}
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
                {summaryLoading ? (
                    [1, 2, 3, 4].map((item) => (
                        <div
                            key={item}
                            className="h-36 animate-pulse rounded-2xl bg-gray-200"
                        />
                    ))
                ) : (
                    stats.map((stat) => {
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

                                            {stat.isCurrency ? "₹" : ""}
                                            {Number(stat.value).toLocaleString("en-IN")}
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
                    })
                )}
            </div>


            {/* Additional statistics */}
            {/* Additional statistics */}
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {summaryLoading ? (
                    [1, 2, 3, 4].map((item) => (
                        <div
                            key={item}
                            className="h-28 animate-pulse rounded-2xl bg-gray-200"
                        />
                    ))
                ) : (
                    <>
                        {/* Average Expense */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                            <p className="text-sm font-medium text-gray-500">
                                Average Expense
                            </p>

                            <p className="mt-2 text-2xl font-bold text-gray-900">
                                ₹
                                {Number(averageExpense ?? 0).toLocaleString("en-IN", {
                                    maximumFractionDigits: 2,
                                })}
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                                Average amount per expense
                            </p>
                        </div>

                        {/* Highest Expense */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                            <p className="text-sm font-medium text-gray-500">
                                Highest Expense
                            </p>

                            <p className="mt-2 text-2xl font-bold text-gray-900">
                                ₹
                                {Number(highestExpense ?? 0).toLocaleString("en-IN")}
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                                Your largest expense
                            </p>
                        </div>

                        {/* Total Transactions */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                            <p className="text-sm font-medium text-gray-500">
                                Total Transactions
                            </p>

                            <p className="mt-2 text-2xl font-bold text-gray-900">
                                {Number(totalTransactions ?? 0).toLocaleString("en-IN")}
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                                Income + expenses
                            </p>
                        </div>

                        {/* Number of Expenses */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                            <p className="text-sm font-medium text-gray-500">
                                Number of Expenses
                            </p>

                            <p className="mt-2 text-2xl font-bold text-gray-900">
                                {Number(numberOfExpenses ?? 0).toLocaleString("en-IN")}
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                                Total expense entries
                            </p>
                        </div>
                    </>
                )}
            </div>


            {/* Spending by Category */}
            {/* Spending by Category */}
            <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        Spending by Category
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        See where your money is being spent
                    </p>
                </div>

                {summaryLoading ? (
                    <div className="mt-6 space-y-5">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item}>
                                <div className="mb-2 flex justify-between">
                                    <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                                    <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                                </div>

                                <div className="h-2 w-full animate-pulse rounded-full bg-gray-200" />
                            </div>
                        ))}
                    </div>
                ) : totalByCategory.length === 0 ? (
                    <div className="py-10 text-center">
                        <p className="text-sm font-medium text-gray-700">
                            No expense data available yet.
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                            Add an expense to see your spending breakdown.
                        </p>
                    </div>
                ) : (
                    <div className="mt-6 space-y-5">
                        {[...totalByCategory]
                            .sort((a, b) => b.total - a.total)
                            .map((item) => {
                                const percentage =
                                    totalExpense > 0
                                        ? (item.total / totalExpense) * 100
                                        : 0;

                                return (
                                    <div key={item.category}>
                                        <div className="mb-2 flex items-center justify-between">
                                            <p className="text-sm font-medium text-gray-700">
                                                {item.category}
                                            </p>

                                            <div className="flex items-center gap-3">
                                                <p className="text-sm font-semibold text-gray-900">
                                                    ₹
                                                    {Number(item.total).toLocaleString(
                                                        "en-IN"
                                                    )}
                                                </p>

                                                <p className="text-xs text-gray-500">
                                                    {percentage.toFixed(1)}%
                                                </p>
                                            </div>
                                        </div>

                                        <div className="w-full rounded-full bg-gray-200">
                                            <div
                                                className="h-2 rounded-full bg-red-500"
                                                style={{
                                                    width: `${Math.min(
                                                        percentage,
                                                        100
                                                    )}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                )}
            </div>


            {/* Recent Expenses */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 p-6  bg-white shadow-sm">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Recent Transactions
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Your latest transactions
                        </p>
                    </div>

                    <button
                        onClick={navigateToExpenses}
                        className="shrink-0 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
                    >
                        View all
                    </button>
                </div>

                {recentLoading ? (
                    <p className="px-6 py-12 text-center text-gray-500">
                        Loading recent transactions...
                    </p>
                ) : recentError ? (
                    <p className="px-6 py-12 text-center text-red-500">
                        {recentError}
                    </p>
                ) : recentExpenses.length === 0 ? (
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

                        {recentExpenses.map((expense) => (
                          <div
                          onClick={() => navigateToEditExpense(expense._id)}
                          key={expense._id}
                          className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 transition hover:bg-gray-50"
                      >
                          {/* Left side */}
                          <div className="flex min-w-0 items-center gap-4">
                              <div
                                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                                      expense.type === "income"
                                          ? "bg-green-100 text-green-600"
                                          : "bg-red-100 text-red-600"
                                  }`}
                              >
                                  {expense.type === "income" ? (
                                      <ArrowUpRight size={18} />
                                  ) : (
                                      <ArrowDownRight size={18} />
                                  )}
                              </div>
                      
                              <div className="min-w-0">
                                  <p className="truncate text-sm font-semibold text-gray-900">
                                      {expense.title}
                                  </p>
                      
                                  <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                                      <span>{expense.category}</span>
                      
                                      <span>•</span>
                      
                                      <span>
                                          {new Date(expense.date).toLocaleDateString("en-IN")}
                                      </span>
                                  </div>
                              </div>
                          </div>
                      
                          {/* Amount */}
                          <p
                              className={`shrink-0 text-sm font-semibold ${
                                  expense.type === "income"
                                      ? "text-green-600"
                                      : "text-red-600"
                              }`}
                          >
                              {expense.type === "income" ? "+" : "-"}₹
                              {Number(expense.amount).toLocaleString("en-IN")}
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