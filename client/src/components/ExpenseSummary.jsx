
const ExpenseSummary = ({
    numberOfExpenses,
    averageOfExpenses,
    highestExpense,
    totalByCategory // you don't need Object.keys() inside this component anymore. App already converted the object into an array suitable for rendering.
}) => {
    return (
        <div>
            ExpenseSummary --
            <p>Number of Expenses: {numberOfExpenses}</p>
            <p>Average Expense: {averageOfExpenses}</p>
            <p>Highest Expense: {highestExpense}</p>
            {totalByCategory.map((item) => {
                return (
                    <div key={item.category}>
                        <h5>{item.category} : </h5>
                        <p>{item.total}</p>
                    </div>
                );
            })}
        </div>
    )
}

export default ExpenseSummary