// A custom hook is simply a JavaScript function that lets us package reusable React logic.
// You can think of a custom hook as a function that returns a value or an object.
// The main difference between a custom hook and a regular function is that custom hooks start with use.
// agr hame kuch value chaiye in different compnents to hook pe jao vha se value retrive krr lo , baar baar un components me value define krne ki jrurat nahi hai

 // Get data from the hook → pass it to components → render the UI.

//  useEffect   → runs effect when dependencies change
// useMemo     → recalculates value when dependencies change
// useCallback → recreates function when dependencies change


import { useState, useEffect , useMemo, useCallback } from "react";
import expenses from "../data.js";
import useFetch from "./useFetch.js";

const useExpenses = () => {
    // const [expenseList, setExpenseList] = useState(() => {
    //     const storedExpenseList = localStorage.getItem("expenseList");

    //     if (storedExpenseList) {
    //         return JSON.parse(storedExpenseList);
    //     }

    //     return expenses;
    // });


    // useEffect(() => {
    //     localStorage.setItem(
    //         "expenseList",
    //         JSON.stringify(expenseList)
    //     );
    // }, [expenseList]);


    // const handleDelete = useCallback((id) => {
    //     setExpenseList((previousExpenses) => { // functional state update // The functional state updater is useful because it lets us avoid directly reading the current state.
    //         return previousExpenses.filter((item) => item.id !== id); 
    //     });
    // }, []); // Why [] now? // The dependency array is an array of values that tell React when to re-run the effect.
    // Because the callback doesn't depend on expenseList anymore, we can remove it from the dependency array.
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    
    const url = `http://localhost:3001/api/expenses?search=${debouncedSearchTerm}`;

    
    const { data, loading, error } = useFetch(url);

    console.log(data);
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    },[searchTerm]);


    const [expenseList, setExpenseList] = useState([]);

useEffect(() => {
    setExpenseList(data);
}, [data]);

const handleDelete = useCallback(async (id) => {
    try{const response = await fetch( // fetching from backend // backend delets the data
        `http://localhost:3001/api/expenses/${id}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        throw new Error("Failed to delete expense");
    }

    const data = await response.json();

    setExpenseList(data)}
    catch(error){
        return error
    }
}, []);
 
    const handleAddExpense = useCallback((newExpense) => { // newExpense → function parameter, not a dependency
        setExpenseList((previousExpenses) => { // previousExpenses → supplied by React's state updater  // setExpenseList → React's state setter, which is stable
            return [...previousExpenses, newExpense];
        });
        },[]);
        //     previousExpenses = the latest state
        // ...previousExpenses = copy all existing expenses
        // newExpense = add the new one
    


    const [editingId, setEditingId] = useState(null);


    const handleEdit = useCallback((id) => {
        setEditingId(id);
    } , []);

    const handleCancelEdit = useCallback(() => {
        setEditingId(null);
    },[]);

    // const handleSave = useCallback((updatedExpense) => {
    //     setExpenseList(
    //         expenseList.map((item) =>
    //             item.id === editingId ? updatedExpense : item
    //         )
    //     )

    //     setEditingId(null);
    // },[editingId , expenseList]); // or youcan use functional state updater to avoid directly reading the current state

    const handleSave = useCallback((updatedExpense) => {
        setExpenseList((previousExpenses) => {
            return previousExpenses.map((item) =>
                item.id === editingId ? updatedExpense : item
            );
        });
    
        setEditingId(null);
    }, [editingId]); // It reads editingId, so editingId must be a dependency.
// Dependencies are determined by what the callback uses from its surrounding scope.

   
    const [filterType, setFilterType] = useState("all");
    const [filterCategory, setFilterCategory] = useState("all");
    const [sortOption, setSortOption] = useState("default");
   

    const handleFilterTypeChange = useCallback((value) => {
        setFilterType(value);
    },[]);

    const handleFilterCategoryChange = useCallback((value) => {
        setFilterCategory(value);
    },[]);

    const handleSortOptionChange = useCallback((value) => {
        setSortOption(value);
    }, []);

    const handleSearchChange = useCallback((value) => {
        setSearchTerm(value);
    }, []);

    const filteredExpenses = data.filter((item) => {
        const typeMatches =
            filterType === "all" || item.type === filterType;

        const categoryMatches =
            filterCategory === "all" ||
            item.category === filterCategory;

       

        return typeMatches && categoryMatches ;
    });


    const sortedExpenses = [...filteredExpenses]; // make a copy // because it will be modified by sort

    if (sortOption === "highest") {
        sortedExpenses.sort((a, b) => b.amount - a.amount);
    }

    if (sortOption === "lowest") {
        sortedExpenses.sort((a, b) => a.amount - b.amount);
    }

    if (sortOption === "oldest") {
        sortedExpenses.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
        );
    }

    if (sortOption === "newest") {
        sortedExpenses.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );
    }

    const totalIncome = useMemo(() => { 
        return expenseList
        .filter((item) => item.type === "income")
        .reduce((total, item) => total + item.amount, 0);
    }, [expenseList]);

        const totalExpense = useMemo(() => {
            return expenseList
                .filter((item) => item.type === "expense")
                .reduce((total, item) => total + item.amount, 0);
        }, [expenseList]); //  totalExpense depend on expenseList so it is dependency of useMemo


    const totalBalance =useMemo(() => {
        return   totalIncome - totalExpense;
    }, [totalIncome, totalExpense]);// because totalBalance depend on totalIncome and totalExpense
  


    const numberOfExpenses = useMemo(() => {
        return expenseList
            .filter((item) => item.type === "expense")
            .length;
    },[expenseList]);
  

    const averageOfExpenses = useMemo(() =>{
       return numberOfExpenses === 0
    ? 0
    :  expenseList
        .filter((item) => item.type === "expense")
        .reduce(
            (total, item) => total + item.amount,
            0
        ) / numberOfExpenses;
}, [numberOfExpenses, expenseList]);
     

    const highestExpense = useMemo(() => {
        return expenseList
            .filter((item) => item.type === "expense")
            .reduce(
                (max, item) => Math.max(max, item.amount),
                0
            );
    } , [expenseList]);
//    This is exactly how you should think about useMemo: identify what the calculation actually reads, then put those values in the dependency array. 

 

const totalByCategory = useMemo(() => {
    const expensesByCategory = expenseList
        .filter((item) => item.type === "expense")
        .reduce((acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = 0;
            }

            acc[item.category] += item.amount;

            return acc;
        }, {});
          
//         This produces:

// {
//     Food: 2500,
//     Travel: 250,
//     Home: 7500
// }

    return Object.keys(expensesByCategory).map((category) => ({
        category,
        total: expensesByCategory[category]
    }));
}, [expenseList]);
    // Convert it into an array
    // Which produces:

    // [
    //     { category: "Food", total: 2500 },
    //     { category: "Travel", total: 250 },
    //     { category: "Home", total: 7500 }
    // ]

//     expenseList
//     ↓
// filter
//     ↓
// reduce → object
//     ↓
// Object.keys
//     ↓
// map
//     ↓
// final array
  

return {

        // ou don't need to return setExpenseList anymore. That's an internal implementation detail of the hook.
        // state
        expenseList, // this is also a type of destructuring
        editingId,

        // CRUD
        handleAddExpense,
        handleDelete,
        handleEdit,
        handleCancelEdit,
        handleSave,

        // filters
        searchTerm,
        filterType,
        filterCategory,
        sortOption,
        handleSearchChange,
        handleFilterTypeChange,
        handleFilterCategoryChange,
        handleSortOptionChange,

        // data
        sortedExpenses,

        // analytics
        totalIncome,
        totalExpense,
        totalBalance,
        numberOfExpenses,
        averageOfExpenses,
        highestExpense,
        totalByCategory
    };
    // your entire CRUD state logic will be inside the custom hook
}

export default useExpenses

// What your architecture looks like now
// App.jsx
// │
// │ useExpenses()
// ↓
// ┌──────────────┐
// │ useExpenses  │
// └──────────────┘
// │
// ┌────────────┼────────────┐
// ↓            ↓            ↓
// State         Logic       Derived data
// │            │            │
// expenses       add/edit/     totals
// editingId      delete        analytics
// filters        filter        sortedExpenses
// search         sort          category totals
// │
// ↓
// Components
// │
// ┌─────┼─────┬──────────┐
// ↓     ↓     ↓          ↓
// Dashboard Summary Filters List
// ↓
// AddExpense

// You've already built several derived values in useExpenses():

// expenseList
//     ↓
// filter
//     ↓
// filteredExpenses
//     ↓
// sort
//     ↓
// sortedExpenses

// and:

// expenseList
//     ↓
// reduce
//     ↓
// totalIncome
// totalExpense
// averageExpense
// highestExpense
// totalByCategory

// These calculations happen every time the hook runs.
 
// bina useMemo ke jbb bhi hook run hoga tbb calculations hogi with memoization memo ye calculation ko yaad krta h.

// Step 10 — Understand useMemo

// useMemo lets React remember the result of a calculation and reuse it until its dependencies change.

// Step 11 — Use useCallback and React.memo

// . Why did we learn useCallback first?

// This is where the two concepts connect.

// Imagine:

// const handleDelete = () => {
//     // ...
// };

// Every time the parent renders, JavaScript creates a new function.

// So even though the function looks identical:

// previous render → handleDelete = function A
// new render      → handleDelete = function B

// React sees:

// function A !== function B

// Therefore, React.memo can't consider that prop unchanged.

// That's why:

// useCallback
//     ↓
// keeps same function reference
//     ↓
// React.memo
//     ↓
// can skip unnecessary child renders

// Parent re-renders
//       ↓
// useCallback keeps same function reference
//       ↓
// React.memo sees same function prop
//       ↓
// Child can skip re-render

// React.memo performs a shallow comparison of props.