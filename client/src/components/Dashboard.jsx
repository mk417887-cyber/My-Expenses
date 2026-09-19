
const Dashboard = ({ totalExpense, totalIncome, totalBalance, numberOfExpenses, averageOfExpenses, highestExpense }) => { // receving props
    return (
        <div>
            <div className="min-h-screen bg-slate-950 text-white">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                    {/* Header */}
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Expense Tracker
                        </h1>
                        <p className="mt-2 text-sm text-slate-400">
                            Track your income and expenses with ease.
                        </p>
                    </header>
                    {/* Dashboard */}

                    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
                            <p className="text-sm font-medium text-slate-400">
                                Total Balance
                            </p>

                            <h2 className="mt-2 text-2xl font-bold">
                                ₹{totalBalance}
                            </h2>
                        </div>
                        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
                            <p className="text-sm font-medium text-slate-400">
                                Total Income
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-emerald-400">
                                ₹{totalIncome}
                            </h2>
                        </div>
                        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
                            <p className="text-sm font-medium text-slate-400">
                                Total Expenses
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-red-400">
                                ₹{totalExpense}
                            </h2>
                        </div>
                        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
                            <p className="text-sm font-medium text-slate-400">
                                No. of Expenses
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-red-400">
                                ₹{numberOfExpenses}
                            </h2>
                        </div>
                        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
                            <p className="text-sm font-medium text-slate-400">
                                Average of  Expenses
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-red-400">
                                ₹{averageOfExpenses}
                            </h2>
                        </div>
                        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
                            <p className="text-sm font-medium text-slate-400">
                                Highest Expenses
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-red-400">
                                ₹{highestExpense}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dashboard 