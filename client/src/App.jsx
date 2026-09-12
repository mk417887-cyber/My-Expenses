import expenses from "./data.js";
import ExpenseItem from "./ExpenseItem.jsx";
import { useState } from "react";
import AddExpense from "./AddExpense.jsx";


const App = () => {

  const [expenseList, setExpenseList] = useState(expenses);
  const [editingId, setEditingId] = useState(null);

  const handleCancelEdit = () => {
    setEditingId(null);
};


  const handleDelete = (id) => {
    setExpenseList(expenseList.filter((item) => item.id !== id));
  };

  const handleEdit = (id, updatedExpense) => {
    // We're just telling React:   "The user wants to edit expense #3."
    setEditingId(id);  

    setExpenseList(expenseList.map((item) => (item.id === id ? updatedExpense : item)));
  };

  const handleAddExpense = (newExpense) => {
    // add newExpense to expenseList
    // We want the new expense to be added without modifying the existing array.
    setExpenseList([...expenseList, newExpense]); // spread operator use is to create a new array and add newExpense to it 
  };

  // You didn't modify the original array.
  // Instead of doing something like splice(), you created a new array with filter().
  // This idea is called immutability, and it's very important in React.


  const totalIncome = expenseList
    .filter((item) => item.type === "income")
    .reduce((total, item) => total + item.amount, 0);


  const totalExpense = expenseList
    .filter((item) => item.type === "expense")
    .reduce((total, item) => total + item.amount, 0);


  // This is called derived data/state. If expenseList changes, totalIncome and totalExpense are recalculated during the render, and therefore balance automatically updates too.

  const totalBalance = totalIncome - totalExpense;
  const [SeeExpenses, setSeeExpenses] = useState(false);

  // console.log(expenses);
  //   //;  No React key is needed here because you're creating strings, not React elements.// But when you do:// expenses.map((item) => {//     return <h3>...</h3>;// })// you're creating a list of React elements, and React needs a key so it can identify each element efficiently.

  // const titles = expenses.map((item) => {

  //   return item.title;
  // });


  // const category =
  // expenses
  //   .filter( (item) => item.category === "Food")
  //   .map((item) => {
  //     return item.category;
  //   });
  const [searchTerm, setSearchTerm] = useState("");
  const [FilterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const filteredExpenses = expenseList.filter((item) => {

    const typeMatches =
      FilterType === "all" || item.type === FilterType;

    const categoryMatches =
      filterCategory === "all" || item.category === filterCategory;

      const searchMatches = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.category.toLowerCase().includes(searchTerm.toLowerCase());  //  "hello world".includes("hello") // true  "hello world".includes("xyz")   // false

    return typeMatches && categoryMatches && searchMatches;
  });

  //   filter() = "Which items should I keep?"
  // map()    = "What should I render for each kept item?"

  // first data comes in expenseList // ↓  // filter()    //     ↓   // filteredExpenses   //     ↓  // map()  //     ↓   // ExpenseItem till type , category search

 

  const Expenses = filteredExpenses.map((item) => {
    return (
      <ExpenseItem
        key={item.id}
        expense={item}
        onDelete={handleDelete} // handleDelete ko onDelete me bhr ke child (ExpenseItem) me pass karenge
        onEdit={handleEdit}
        // How does ExpenseItem know whether it is the one being edited?
        isEditing={editingId === item.id}
        onCancelEdit={handleCancelEdit}
      />
    );
  });



  return (
    <div>
      <button onClick={() => setFilterType("all")}>All</button>
      <button onClick={() => setFilterType("income")}>Income</button>
      <button onClick={() => setFilterType("expense")}>Expense</button>

      <form>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="all">all</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
          <option value="Education">Education</option>
          <option value="Salary">Salary</option>
        </select>

        <input
          type="text"
          placeholder="Search expenses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      {/* {Expenses} */}

      {/* <AddExpense /> */}
      {/* //  // handleAddExpense ko onAddExpense me bhr ke child (AddExpense) me pass karenge as props */}
      {/* <AddExpense onAddExpense={handleAddExpense} />  */}

      {SeeExpenses &&   (filteredExpenses.length === 0       ? "No Expenses Found"       : Expenses    )}

      <AddExpense onAddExpense={handleAddExpense} />

      <button onClick={() => setSeeExpenses(!SeeExpenses)}>Toggle Expenses</button>

      {/* count: {count}
      <button onClick={handleClick}>Click Me</button> */}

      <h2>Income: {totalIncome}</h2>
      <h2>Expense: {totalExpense}</h2>
      <h2>Balance: {totalBalance}</h2>


    </div>
  )
}

export default App