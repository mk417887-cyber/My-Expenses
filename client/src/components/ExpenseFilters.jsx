import React from 'react'

const ExpenseFilters = ({ filterType, filterCategory, sortOption, searchTerm,
    onFilterTypeChange,
    onFilterCategoryChange,
    onSortOptionChange,
    onSearchChange }) => {


    return (
        <div>
            <div className="min-h-screen bg-slate-950 text-white">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                    <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">

                        <div className="mb-5">
                            <h2 className="text-xl font-semibold">
                                Transactions
                            </h2>

                            <p className="mt-1 text-sm text-slate-400">
                                Search, filter and sort your transactions.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <form>
                                <button onClick={() => onFilterTypeChange("all")}>All</button>
                                {/* //  User clicks Income     ↓ExpenseFilters calls onFilterTypeChange("income")     ↓App's handleFilterTypeChange receives "income"     ↓setFilterType("income")       ↓App re-renders     ↓filteredExpenses changes */}
                                <button onClick={() => onFilterTypeChange("income")}>Income</button>
                                <button onClick={() => onFilterTypeChange("expense")}>Expense</button>

                                {/* Search */}
                                <input
                                    type="text"
                                    placeholder="Search expenses..."
                                    value={searchTerm}
                                    onChange={(e) => onSearchChange(e.target.value)}
                                />
                                {/* Type */}
                                <span className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20">
                                    {/* {onFilterTypeChange} */}
                                    <select
                                        value={sortOption}
                                        onChange={(e) => onSortOptionChange(e.target.value)}
                                    >
                                        <option value="default">Default</option>
                                        <option value="highest">Highest</option>
                                        <option value="lowest">Lowest</option>
                                        <option value="newest">Newest</option>
                                        <option value="oldest">Oldest</option>
                                    </select>

                                </span>
                                {/* Category */}
                                <span className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20">
                                    {/* {onFilterCategoryChange} */}
                                    <select
                                        value={filterCategory}
                                        onChange={(e) => onFilterCategoryChange(e.target.value)}
                                    >
                                        <option value="all">all</option>
                                        <option value="Food">Food</option>
                                        <option value="Travel">Travel</option>
                                        <option value="Entertainment">Entertainment</option>
                                        <option value="Other">Other</option>
                                        <option value="Education">Education</option>
                                        <option value="Salary">Salary</option>
                                    </select>
                                </span>
                                {/* Sort */}
                            </form>
                        </div>

                    </section>

                </div>
            </div>
        </div>
    )
}

export default ExpenseFilters