
const Dashboard = ({ totalExpense, totalIncome, totalBalance , numberOfExpenses , averageOfExpenses , highestExpense }) => { // receving props
    return (
        <div>Dashboard
            <h3>Total Income : {totalIncome}</h3>
            <h3> Total Expense : {totalExpense}</h3>
            <h3> Balance : {totalBalance} </h3>
            <h3>Number of Expenses: {numberOfExpenses}</h3>
            <h3>Average Expense: {averageOfExpenses}</h3>
            <h3>Highest Expense: {highestExpense}</h3>
        </div>
    )
}

export default Dashboard 