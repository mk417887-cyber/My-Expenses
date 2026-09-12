import expenses from "./data.js";

function getAllExpenses(expenses) {
    return expenses;
}

function getExpenseById(expenses, id) {
    return expenses.find((item) => item.id === id);
}

function getExpenseByType(expenses , type) {
    return expenses.filter((item) => item.type === type);
}

function getExpenseByCategory(expenses, category) {
    return expenses.filter((item) => item.category === category);
}

function getTotalExpenses(expenses){
    return expenses
    .filter((item) => item.type === "expense") 
    .reduce((total, item) => total + item.amount, 0);
}

function getTotalIncome(expenses) { // Parameter → variable in function definition   Argument  → actual value passed when calling the function
   
    return expenses
    .filter((item) => item.type === "income") 
    .reduce((total, item) => total + item.amount, 0);
}

function getTotalByCategory(expenses , category) { // category is a variable
    return expenses
    .filter((item) => item.category === category)
    .reduce((total, item) => total + item.amount, 0);
}

function getAverageExpense(expenses){
    return expenses
    .filter((item) => item.type === "expense")
    .reduce((total, item) => total + item.amount, 0) / expenses.length;
}

console.log(getAllExpenses(expenses));
console.log(getExpenseById(expenses , 3));
console.log(getExpenseByType(expenses , "income"));
console.log(getExpenseByCategory(expenses , "Food" ));
console.log(getTotalExpenses(expenses));
console.log(getTotalIncome(expenses));
console.log(getTotalByCategory(expenses , "Food"));
console.log(getAverageExpense(expenses));

export {
    getAllExpenses,
    getExpenseById,
    getExpenseByType,
    getExpenseByCategory,
    getTotalIncome,
    getTotalExpenses,
    getTotalByCategory,
    getAverageExpense
};