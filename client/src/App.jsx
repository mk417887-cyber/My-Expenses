// // Notice that App is becoming a data/controller component, while the children mostly handle presentation:
// import expenses from "./data.js";
// import ExpenseItem from "./components/ExpenseItem.jsx";
// import ExpenseList from "./components/ExpenseList.jsx";
// import AddExpense from "./components/AddExpense.jsx";
// import { useState, useEffect } from "react"; // useEffect lets React run some code after rendering, usually when something changes.
// import Dashboard from "./components/Dashboard.jsx";
// import ExpenseFilters from "./components/ExpenseFilters.jsx";
// import ExpenseSummary from "./components/ExpenseSummary.jsx";
// // useEffect(() => {
// //   // code you want React to run
// // }, []);

// // The second part, [], is called the dependency array.

// // The 3 important patterns
// // useEffect(() => {
// //   // runs after every render
// // });
// // useEffect(() => {
// //   // runs once when component mounts
// // }, []);
// // useEffect(() => {
// //   // runs when expenseList changes
// // }, [expenseList]);

// // For our Expense Tracker, we want the third one.
// const App = () => {

//   const [expenseList, setExpenseList] = useState(() => {
//     const storedExpenseList = localStorage.getItem("expenseList"); // expenseList ko local storage se lakr storeExpenseList me save krr diya 
//     if (storedExpenseList) {
//       const parseddata = JSON.parse(storedExpenseList);
//       return parseddata;
//     }
//     return expenses;
//   })

//   useEffect(() => {
//     localStorage.setItem("expenseList",  // setIteam means tumne expenseList ko localstorage me store krna hai
//       JSON.stringify(expenseList));
//   }, [expenseList]);
//   //   setExpenseList(...)
//   //        ↓
//   // expenseList changes
//   //        ↓
//   // useEffect detects the change
//   //        ↓
//   // JSON.stringify(expenseList)
//   //        ↓
//   // localStorage.setItem(...)



//   const [editingId, setEditingId] = useState(null);

//   const handleCancelEdit = () => {
//     setEditingId(null);
//   };


//   const handleDelete = (id) => {
//     setExpenseList(expenseList.filter((item) => item.id !== id));
//   };

//   const handleEdit = (id, updatedExpense) => {
//     // We're just telling React:   "The user wants to edit expense #3."
//     setEditingId(id);

//     // setExpenseList(expenseList.map((item) => (item.id === id ? updatedExpense : item)));
//   };

//   const handleSave = (updatedExpense) => {
//     setExpenseList(
//       expenseList.map((item) =>
//         item.id === editingId ? updatedExpense : item
//       )
//     );
//     setEditingId(null);
//   }

//   // setExpenseList state ko aise update krna hai 

//   //   expenseList
//   //     ↓
//   // map()
//   //     ↓
//   // Does item.id === editingId?
//   //     ↓
//   //  YES → updatedExpense
//   //  NO  → original item
//   //     ↓
//   // new array
//   //     ↓
//   // setExpenseList()

//   // This is a very important React pattern. You're not modifying the existing array; you're creating a new one.

//   // So the flow becomes:

//   // Save
//   //  ↓
//   // updatedExpense
//   //  ↓
//   // onSave(updatedExpense)
//   //  ↓
//   // App.handleSave()
//   //  ↓
//   // map() replaces matching item
//   //  ↓
//   // setExpenseList()
//   //  ↓
//   // setEditingId(null)
//   //  ↓
//   // back to normal view

//   const handleAddExpense = (newExpense) => {
//     // add newExpense to expenseList
//     // We want the new expense to be added without modifying the existing array.
//     setExpenseList([...expenseList, newExpense]); // spread operator use is to create a new array and add newExpense to it 
//   };

//   // You didn't modify the original array.
//   // Instead of doing something like splice(), you created a new array with filter().
//   // This idea is called immutability, and it's very important in React.


//   const totalIncome = expenseList
//     .filter((item) => item.type === "income")
//     .reduce((total, item) => total + item.amount, 0);


//   const totalExpense = expenseList
//     .filter((item) => item.type === "expense")
//     .reduce((total, item) => total + item.amount, 0);


//   // This is called derived data/state. If expenseList changes, totalIncome and totalExpense are recalculated during the render, and therefore balance automatically updates too.

//   const totalBalance = totalIncome - totalExpense;

//   // console.log(expenses);
//   //   //;  No React key is needed here because you're creating strings, not React elements.// But when you do:// expenses.map((item) => {//     return <h3>...</h3>;// })// you're creating a list of React elements, and React needs a key so it can identify each element efficiently.

//   // const titles = expenses.map((item) => {

//   //   return item.title;
//   // });


//   // const category =
//   // expenses
//   //   .filter( (item) => item.category === "Food")
//   //   .map((item) => {
//   //     return item.category;
//   //   });
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterType, setFilterType] = useState("all");
//   const [filterCategory, setFilterCategory] = useState("all");
//   const [sortOption, setSortOption] = useState("default");

//   const filteredExpenses = expenseList.filter((item) => {

//     const typeMatches =
//       filterType === "all" || item.type === filterType;

//     const categoryMatches =
//       filterCategory === "all" || item.category === filterCategory;

//     const searchMatches = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.category.toLowerCase().includes(searchTerm.toLowerCase());  //  "hello world".includes("hello") // true  "hello world".includes("xyz")   // false

//     return typeMatches && categoryMatches && searchMatches;
//   });


//   //   filter() = "Which items should I keep?"
//   // map()    = "What should I render for each kept item?"

//   // first data comes in expenseList // ↓  // filter()    //     ↓   // filteredExpenses   //     ↓  // map()  //     ↓   // ExpenseItem till type , category search

//   //   const testExpenses = [
//   //     { id: 1, title: "Food", amount: 500 },
//   //     { id: 2, title: "Travel", amount: 300 }
//   // ];

//   // localStorage.setItem( 
//   //   "testExpression", JSON.stringify(testExpenses) 
//   //   //  Convert it to JSON and store it in localStorage
//   //   // converts the array/object into a string because localStorage stores strings..
//   // )

//   // const savedData = localStorage.getItem("testExpression"); // reteriving the data in savedData

//   // const parsedData = JSON.parse(savedData); // You convert savedData back into an array called parsedData. JSON.parse() expects a JSON string. and convert it into an array

//   // console.log(parsedData);

//   // useEffect, which is the key React concept for automatically saving your Expense Tracker whenever expenseList changes.

//   // Instead, create a new array from the filtered results:  Then we'll sort sortedExpenses.
//   const sortedExpenses = [...filteredExpenses];


//   if (sortOption === "highest") {
//     // your sorting logic
//     sortedExpenses.sort((a, b) => b.amount - a.amount);
//   }

//   if (sortOption === "lowest") {
//     // your sorting logic
//     sortedExpenses.sort((a, b) => a.amount - b.amount);
//   }
//   if (sortOption === "oldest") {
//     sortedExpenses.sort((a, b) => {
//       return new Date(a.date) - new Date(b.date);
//     });
//   }

//   if (sortOption === "newest") {
//     sortedExpenses.sort((a, b) => {
//       return new Date(b.date) - new Date(a.date);
//     });
//   }
//   // Think of .sort() as saying:

//   // "Give me a rule that tells me which item should come first."

//   //   Your App should conceptually work like this:
//   //   expenseList
//   //     ↓
//   // filter()
//   //     ↓
//   // filteredExpenses
//   //     ↓
//   // copy with [...filteredExpenses]
//   //     ↓
//   // sort()
//   //     ↓
//   // sortedExpenses
//   //     ↓
//   // map()
//   //     ↓
//   // ExpenseItem components

//   const numberOfExpenses = expenseList.filter((item) => item.type === "expense").length;

//   const averageOfExpenses = numberOfExpenses === 0
//     ? 0
//     : expenseList.filter((item) => item.type === "expense")
//       .reduce((total, item) => total + item.amount, 0) / numberOfExpenses;

//   const highestExpense = expenseList
//     .filter((item) => item.type === "expense")
//     .reduce((max, item) => {  // item → current expense
//       return Math.max(max, item.amount);
//     }, 0);

//     //
//     //
//     // Making an object using reduce
//   const expensesByCategory = expenseList
//   .filter((item) => item.type === "expense")
//   .reduce((acc, item) => {    // acc = accumulator → the object we're building  //  item = current expense
//     if (!acc[item.category]) {  // "If this category doesn't exist in my object yet, create it and give it a starting value of 0."  // at initially every category is empty so first  acc = { Food : 0}
//       acc[item.category] = 0;
//     }
//     acc[item.category] += item.amount;
//     return acc;
//   }, {}); // empty object at first so initially acc  = 0 

//   const totalByCategory = Object.keys(expensesByCategory).map((category) => { // category is a variable      // Object.keys() returns an array of all the keys in an object // 
//      // o basically we are converting object -> keys -> array
//     return {
//       category,
//       total: expensesByCategory[category]
//     }
//   })

// //   You've just built this pipeline:
// //   expenseList
// //      ↓
// //    filter()
// // "Only expenses"
// //      ↓
// //    reduce()
// // "Group & add amounts by category"
// //      ↓
// // expensesByCategory
// //      ↓
// // Object.keys()
// // "Get category names"
// //      ↓
// //    map()
// // "Convert into render-friendly objects"
// //      ↓
// // totalByCategory

// const handleFilterTypeChange = (value) => {
//   setFilterType(value);
// };

// const handleFilterCategoryChange = (value) => {
//   setFilterCategory(value);
// };

// const handleSortOptionChange = (value) => {
//   setSortOption(value);
// };

// const handleSearchChange = (value) => {
//   setSearchTerm(value);
// };


//   return (
//     <div>
//       <ExpenseFilters
//         filterType={filterType}
//         filterCategory={filterCategory}
//         sortOption={sortOption}
//         searchTerm={searchTerm}
//         onFilterTypeChange={handleFilterTypeChange} // onFilterTypeChange={setFilterType}
//         onFilterCategoryChange={handleFilterCategoryChange}
//         onSortOptionChange={handleSortOptionChange}
//         onSearchChange={handleSearchChange}
//       />
//       <Dashboard 
//         totalIncome={totalIncome} // sending props
//         totalExpense={totalExpense}
//         totalBalance={totalBalance}
//         numberOfExpenses={numberOfExpenses}
//         averageOfExpenses={averageOfExpenses}
//         highestExpense={highestExpense}

//          />

//       <ExpenseSummary
//         numberOfExpenses={numberOfExpenses}
//         averageOfExpenses={averageOfExpenses}
//         highestExpense={highestExpense}
//         totalByCategory={totalByCategory}
//       />

//       <AddExpense onAddExpense={handleAddExpense} />

//       <ExpenseList 
//         expenses={sortedExpenses}
//         handleDelete={handleDelete}
//         handleEdit={handleEdit}
//         editingId={editingId}
//         handleCancelEdit={handleCancelEdit}
//         handleSave={handleSave}
//         />

//     </div>
//   )
// }

// export default App
import useExpenses from "./hooks/useExpenses.js";
import Dashboard from "./components/Dashboard.jsx";
import ExpenseFilters from "./components/ExpenseFilters.jsx";
import ExpenseSummary from "./components/ExpenseSummary.jsx";
import AddExpense from "./components/AddExpense.jsx";
import ExpenseList from "./components/ExpenseList.jsx";
import Users from "./components/Users.jsx";

const App = () => {
 
  const {
    editingId,

    handleDelete,
    handleAddExpense,
    handleEdit,
    handleSave,
    handleCancelEdit,

    searchTerm,
    filterType,
    filterCategory,
    sortOption,

    handleFilterTypeChange,
    handleFilterCategoryChange,
    handleSortOptionChange,
    handleSearchChange,

    sortedExpenses,

    totalIncome,
    totalExpense,
    totalBalance,
    numberOfExpenses,
    averageOfExpenses,
    highestExpense,
    totalByCategory
} = useExpenses();
// And App.jsx will basically become:

// useExpenses()
//       ↓
// receive everything needed
//       ↓
// pass data to components
//       ↓
// render UI

  

  return (
    <div>

      <Users />
      
      <ExpenseFilters
        filterType={filterType}
        filterCategory={filterCategory}
        sortOption={sortOption}
        searchTerm={searchTerm}
        onFilterTypeChange={handleFilterTypeChange}
        onFilterCategoryChange={handleFilterCategoryChange}
        onSortOptionChange={handleSortOptionChange}
        onSearchChange={handleSearchChange}
      />

      <Dashboard
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        totalBalance={totalBalance}
        numberOfExpenses={numberOfExpenses}
        averageOfExpenses={averageOfExpenses}
        highestExpense={highestExpense}
      />

      <ExpenseSummary
        numberOfExpenses={numberOfExpenses}
        averageOfExpenses={averageOfExpenses}
        highestExpense={highestExpense}
        totalByCategory={totalByCategory}
      />

      <AddExpense
        onAddExpense={handleAddExpense}
      />

      <ExpenseList
        expenses={sortedExpenses} // these functions are being passed as props.  // Every time useExpenses() runs, JavaScript can create new function references: Previous render:
        // handleDelete → function A
        // Next render:
        // handleDelete → function B
        
        // Even if the function's code hasn't changed, A and B are different function objects.
        
        // This becomes important when using React.memo() on child components.    

        handleDelete={handleDelete}
        handleEdit={handleEdit}
        editingId={editingId}
        handleCancelEdit={handleCancelEdit}
        handleSave={handleSave}
      />
    </div>
  );
};

export default App;