import React from 'react'

const ExpenseFilters = ({ filterType, filterCategory, sortOption, searchTerm,
    onFilterTypeChange,
    onFilterCategoryChange,
    onSortOptionChange,
    onSearchChange }) => {


    return (
        <div>
            <button onClick={() => onFilterTypeChange("all")}>All</button>
            {/* //  User clicks Income     ↓ExpenseFilters calls onFilterTypeChange("income")     ↓App's handleFilterTypeChange receives "income"     ↓setFilterType("income")       ↓App re-renders     ↓filteredExpenses changes */}
            <button onClick={() => onFilterTypeChange("income")}>Income</button>
            <button onClick={() => onFilterTypeChange("expense")}>Expense</button>

            <form>
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
                <select
                    value={sortOption}
                    onChange={(e) =>  onSortOptionChange(e.target.value)}
                >
                    <option value="default">Default</option>
                    <option value="highest">Highest</option>
                    <option value="lowest">Lowest</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                </select>

                <input
                    type="text"
                    placeholder="Search expenses..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </form>
        </div>
    )
}

export default ExpenseFilters