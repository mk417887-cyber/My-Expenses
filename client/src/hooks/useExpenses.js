// A custom hook is simply a JavaScript function that lets us package reusable React logic.
// You can think of a custom hook as a function that returns a value or an object.
// The main difference between a custom hook and a regular function is that custom hooks start with use.
// agr hame kuch value chaiye in different compnents to hook pe jao vha se value retrive krr lo , baar baar un components me value define krne ki jrurat nahi hai

 // Get data from the hook → pass it to components → render the UI.

//  useEffect   → runs effect when dependencies change
// useMemo     → recalculates value when dependencies change
// useCallback → recreates function when dependencies change


// import { useState, useEffect , useMemo, useCallback } from "react";
// import { getExpenses } from "../api/expenseApi.js";

// const useExpenses = () => {
//     // const [expenseList, setExpenseList] = useState(() => {
//     //     const storedExpenseList = localStorage.getItem("expenseList");

//     //     if (storedExpenseList) {
//     //         return JSON.parse(storedExpenseList);
//     //     }

//     //     return expenses;
//     // });


//     // useEffect(() => {
//     //     localStorage.setItem(
//     //         "expenseList",
//     //         JSON.stringify(expenseList)
//     //     );
//     // }, [expenseList]);


//     // const handleDelete = useCallback((id) => {
//     //     setExpenseList((previousExpenses) => { // functional state update // The functional state updater is useful because it lets us avoid directly reading the current state.
//     //         return previousExpenses.filter((item) => item.id !== id); 
//     //     });
//     // }, []); // Why [] now? // The dependency array is an array of values that tell React when to re-run the effect.
//     // Because the callback doesn't depend on expenseList anymore, we can remove it from the dependency array.
//     const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
//     const [searchTerm, setSearchTerm] = useState("");
//     const [isAdding , setIsAdding] = useState(false);
//     const [isEditing , setIsEditing] = useState(false);
//     const [isDeleting , setIsDeleting] = useState(false);
//     const [error , setError] = useState("");
//     const[loading , setLoading] = useState(false);
 
    
//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setDebouncedSearchTerm(searchTerm);
//         }, 500);

//         return () => {
//             clearTimeout(timer);
//         };
//     },[searchTerm]);


//     const [expenseList, setExpenseList] = useState([]);

//     useEffect(() => {
//       const fetchExpenses = async () => {
//           setLoading(true);
//            try{
//             // receive data
//             const data = await getExpenses();
//             // put data into expenseList
//             setExpenseList(data);
            
//             fetchExpenses();
//         }
    
//     catch(error){
//         return error
//     }
//     finally{
//         setLoading(false);
//     }
// }
//     }, []);


// const handleDelete = useCallback(async (id) => {

//     setIsDeleting(true);
//     try{const response = await fetch( // fetching from backend // backend delets the data
//         `http://localhost:3001/api/expenses/${id}`,
//         {
//             method: "DELETE"
//         }
//     );

//     if (!response.ok) {
//         throw new Error("Failed to delete expense");
//     }

//     const data = await response.json();

//     setExpenseList(data)}
//     catch(error){
//         return error
//     }
//     finally{
//         setIsDeleting(false);
//     }
// }, []);
 
//     // const handleAddExpense = useCallback((newExpense) => { // newExpense → function parameter, not a dependency
//     //     setExpenseList((previousExpenses) => { // previousExpenses → supplied by React's state updater  // setExpenseList → React's state setter, which is stable
//     //         return [...previousExpenses, newExpense];
//     //     });
//     //     },[]);
//         //     previousExpenses = the latest state
//         // ...previousExpenses = copy all existing expenses
//         // newExpense = add the new one
    
//         const handleAddExpense = useCallback(async (newExpense) => {
//             setIsAdding(true);
//             try {
//                 const response = await fetch(
//                     "http://localhost:3001/api/expenses",
//                     {
//                         method: "POST",
        
//                         headers: { // "The data I'm sending is JSON."
//                             "Content-Type": "application/json"
//                         },
        
//                         body: JSON.stringify(newExpense) // newExpense is a JavaScript object. // HTTP request body is sent as data, so we convert the object into a JSON string.
//                     }
//                 );
        
//                 if (!response.ok) {
//                     throw new Error("Failed to add expense");
//                 }
        
//                 const data = await response.json(); // Convert server response back to JavaScript
//             //     AddExpense
//             //     ↓
//             // handleAddExpense()
//             //     ↓
//             // fetch(POST)
//             //     ↓
//             // Express
//             //     ↓
//             // req.body
//             //     ↓
//             // create newExpense + ID
//             //     ↓
//             // expenses.push()
//             //     ↓
//             // res.json(newExpense)
//             //     ↓
//             // response.json()
//             //     ↓
//             // data
//             //     ↓
//             // setExpenseList()
//             //     ↓
//             // React re-renders
//                 setExpenseList((previousExpenses) => {
//                     return [...previousExpenses, data];
//                 });
        
//             } catch (error) {
//                 console.error(error);
//             }
//             finally{
//                 setIsAdding(false);
//             }
//         }, []);

//     const [editingId, setEditingId] = useState(null);


//     const handleEdit = useCallback((id) => {
//         setEditingId(id);
//     } , []);

//     const handleCancelEdit = useCallback(() => {
//         setEditingId(null);
//     },[]);

//     // const handleSave = useCallback((updatedExpense) => {
//     //     setExpenseList(
//     //         expenseList.map((item) =>
//     //             item.id === editingId ? updatedExpense : item
//     //         )
//     //     )

//     //     setEditingId(null);
//     // },[editingId , expenseList]); // or youcan use functional state updater to avoid directly reading the current state
//     const handleSave = useCallback(async (updatedExpense) => {
//         isEditing(true);
//         try {
//             const response = await fetch(
//                 `http://localhost:3001/api/expenses/${updatedExpense.id}`,
//                 {
//                     method: "PUT",
//                     headers: {
//                         "Content-Type": "application/json"
//                     },
//                     body: JSON.stringify(updatedExpense)
//                 }
//             );
    
//             if (!response.ok) {
//                 throw new Error("Failed to update expense");
//             }
    
//             const data = await response.json();
    
//             setExpenseList((previousExpenses) => {
//                 return previousExpenses.map((item) =>
//                     item.id === updatedExpense.id ? data : item
//                 );
//             });
    
//             setEditingId(null);
    
//         } catch (error) {
//             console.error(error);
//         }
//         finally{
//             setIsEditing(false);
//         }
//     }, []); // It reads editingId, so editingId must be a dependency.
// // Dependencies are determined by what the callback uses from its surrounding scope.

   
//     const [filterType, setFilterType] = useState("all");
//     const [filterCategory, setFilterCategory] = useState("all");
//     const [sortOption, setSortOption] = useState("default");
   

//     const handleFilterTypeChange = useCallback((value) => {
//         setFilterType(value);
//     },[]);

//     const handleFilterCategoryChange = useCallback((value) => {
//         setFilterCategory(value);
//     },[]);

//     const handleSortOptionChange = useCallback((value) => {
//         setSortOption(value);
//     }, []);

//     const handleSearchChange = useCallback((value) => {
//         setSearchTerm(value);
//     }, []);

//     const filteredExpenses = data.filter((item) => {
//         const typeMatches =
//             filterType === "all" || item.type === filterType;

//         const categoryMatches =
//             filterCategory === "all" ||
//             item.category === filterCategory;

       

//         return typeMatches && categoryMatches ;
//     });


//     const sortedExpenses = [...filteredExpenses]; // make a copy // because it will be modified by sort

//     if (sortOption === "highest") {
//         sortedExpenses.sort((a, b) => b.amount - a.amount);
//     }

//     if (sortOption === "lowest") {
//         sortedExpenses.sort((a, b) => a.amount - b.amount);
//     }

//     if (sortOption === "oldest") {
//         sortedExpenses.sort(
//             (a, b) => new Date(a.date) - new Date(b.date)
//         );
//     }

//     if (sortOption === "newest") {
//         sortedExpenses.sort(
//             (a, b) => new Date(b.date) - new Date(a.date)
//         );
//     }

//     const totalIncome = useMemo(() => { 
//         return expenseList
//         .filter((item) => item.type === "income")
//         .reduce((total, item) => total + item.amount, 0);
//     }, [expenseList]);

//         const totalExpense = useMemo(() => {
//             return expenseList
//                 .filter((item) => item.type === "expense")
//                 .reduce((total, item) => total + item.amount, 0);
//         }, [expenseList]); //  totalExpense depend on expenseList so it is dependency of useMemo


//     const totalBalance =useMemo(() => {
//         return   totalIncome - totalExpense;
//     }, [totalIncome, totalExpense]);// because totalBalance depend on totalIncome and totalExpense
  


//     const numberOfExpenses = useMemo(() => {
//         return expenseList
//             .filter((item) => item.type === "expense")
//             .length;
//     },[expenseList]);
  

//     const averageOfExpenses = useMemo(() =>{
//        return numberOfExpenses === 0
//     ? 0
//     :  expenseList
//         .filter((item) => item.type === "expense")
//         .reduce(
//             (total, item) => total + item.amount,
//             0
//         ) / numberOfExpenses;
// }, [numberOfExpenses, expenseList]);
     

//     const highestExpense = useMemo(() => {
//         return expenseList
//             .filter((item) => item.type === "expense")
//             .reduce(
//                 (max, item) => Math.max(max, item.amount),
//                 0
//             );
//     } , [expenseList]);
// //    This is exactly how you should think about useMemo: identify what the calculation actually reads, then put those values in the dependency array. 

 

// const totalByCategory = useMemo(() => {
//     const expensesByCategory = expenseList
//         .filter((item) => item.type === "expense")
//         .reduce((acc, item) => {
//             if (!acc[item.category]) {
//                 acc[item.category] = 0;
//             }

//             acc[item.category] += item.amount;

//             return acc;
//         }, {});
          
// //         This produces:

// // {
// //     Food: 2500,
// //     Travel: 250,
// //     Home: 7500
// // }

//     return Object.keys(expensesByCategory).map((category) => ({
//         category,
//         total: expensesByCategory[category]
//     }));
// }, [expenseList]);
//     // Convert it into an array
//     // Which produces:

//     // [
//     //     { category: "Food", total: 2500 },
//     //     { category: "Travel", total: 250 },
//     //     { category: "Home", total: 7500 }
//     // ]

// //     expenseList
// //     ↓
// // filter
// //     ↓
// // reduce → object
// //     ↓
// // Object.keys
// //     ↓
// // map
// //     ↓
// // final array
  

// return {

//         // ou don't need to return setExpenseList anymore. That's an internal implementation detail of the hook.
//         // state
//         expenseList, // this is also a type of destructuring
//         editingId,
//         isAdding,
//         // CRUD
//         handleAddExpense,
//         handleDelete,
//         handleEdit,
//         handleCancelEdit,
//         handleSave,
//         loading,
//         error,
//         // filters
//         searchTerm,
//         filterType,
//         filterCategory,
//         sortOption,
//         handleSearchChange,
//         handleFilterTypeChange,
//         handleFilterCategoryChange,
//         handleSortOptionChange,

//         // data
//         sortedExpenses,

//         // analytics
//         totalIncome,
//         totalExpense,
//         totalBalance,
//         numberOfExpenses,
//         averageOfExpenses,
//         highestExpense,
//         totalByCategory
//     };
//     // your entire CRUD state logic will be inside the custom hook
// }

// export default useExpenses

import { useCallback, useEffect, useMemo, useState } from "react";
import { getExpenses , addExpense , deleteExpense , updateExpense} from "../api/expenseApi";
import toast from "react-hot-toast";

const useExpenses = () => {
    // -------------------------
    // Expense state
    // -------------------------

    const [expenseList, setExpenseList] = useState([]);
    const [editingId, setEditingId] = useState(null);

    // -------------------------
    // API states
    // -------------------------

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [updatingId , setUpdatingId] = useState(null);
    // -------------------------
    // Filter / search / sort
    // -------------------------

    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [filterCategory, setFilterCategory] = useState("all");
    const [sortOption, setSortOption] = useState("default");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    // -------------------------
    // Pages
    //-------------------------

    const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);


    //-------------------------
    //Debouncing search 
    //------------------------
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            
        }, 500);
    
        return () => {
            clearTimeout(timer);
        };
    }, [searchTerm , filterType , filterCategory]);

    useEffect(() => {
        setPage(1);
    },[searchTerm])
    // -------------------------
    // Fetch expenses
    // -------------------------

    useEffect(() => {

      
            // do something after waiting
            const fetchExpenses = async () => {
                setLoading(true);
                setError(null);
        
                try {
                    const query = {}; 
                    // Whenever the search/filter state changes, fetch expenses again from the backend with the new query parameters.
        // We're going to add only the filters that the user has actually selected.
        // example of query
        // {
        //     search: "food",
        //     type: "expense",
        //     category: "Food"
        // }
        if (debouncedSearch) {
            query.search = debouncedSearch; 
        }
        
                    if (filterType !== "all") {
                        query.type = filterType;
                    }
        
                    if (filterCategory !== "all") {
                        query.category = filterCategory;
                    }
        
                    const data = await getExpenses(query);
    
    // React filters
    // ↓
    // query parameters
    // ↓
    // Express
    // ↓
    // MongoDB
    // ↓
    // filtered expenses
    // ↓
    // React
    // ↓
    // UI
    // This is server-side filtering/search.
                    setExpenseList(data.data);
                    setTotalPages(data.totalPages);
                } catch (error) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            };
        
            fetchExpenses();
        },[debouncedSearch, filterType, filterCategory , page]);

    // -------------------------
    // Fetch analytics
    // -------------------------


    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };
    
    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };
    // -------------------------
    // Add expense
    // -------------------------

 
    const handleAddExpense = useCallback(async (newExpense) => {
        setIsAdding(true);
        setError(null);
    
        try {
            const data = await addExpense(newExpense);
    
            setExpenseList((previousExpenses) => [
                ...previousExpenses,
                data,
            ]);
    
            toast.success("Expense added successfully");
    
            return true;
        } catch (error) {
            console.error(error);
            setError(error.message);
            toast.error(error.message || "Failed to add expense");
    
            throw error;
        } finally {
            setIsAdding(false);
        }
    }, []);
    // -------------------------
    // Delete expense
    // -------------------------
    const handleDelete = useCallback(async (id) => {
        setError(null);
        setDeletingId(id);
    
        try {
            await deleteExpense(id);
    
            setExpenseList((previousExpenses) =>
                previousExpenses.filter((item) => item._id !== id)
            );
    
            toast.success("Expense deleted successfully");
        } catch (error) {
            console.error(error);
            setError(error.message);
            toast.error(error.message || "Failed to delete expense");
        } finally {
            setDeletingId(null);
        }
    }, []);

    // -------------------------
    // Edit
    // -------------------------

    const handleEdit = useCallback((id) => {
        setEditingId(id);
    }, []);

    const handleCancelEdit = useCallback(() => {
        setEditingId(null);
    }, []);

    // -------------------------
    // Save updated expense
    // -------------------------
    const handleSave = useCallback(async (updatedExpense) => {
        setError(null);
        setUpdatingId(updatedExpense._id);
    
        try {
            const data = await updateExpense(updatedExpense);
    
            setExpenseList((previousExpenses) =>
                previousExpenses.map((item) =>
                    item._id === updatedExpense._id
                        ? data
                        : item
                )
            );
    
            setEditingId(null);
    
            toast.success("Expense updated successfully");
    
            return true;
        } catch (error) {
            console.error(error);
            setError(error.message);
            toast.error(error.message || "Failed to update expense");
    
            throw error;
        } finally {
            setUpdatingId(null);
        }
    }, []);

    // -------------------------
    // Filtering
    // -------------------------

    const filteredExpenses = useMemo(() => {
        return expenseList.filter((item) => {
            const typeMatches =
                filterType === "all" || item.type === filterType;

            const categoryMatches =
                filterCategory === "all" ||
                item.category === filterCategory;

            return typeMatches && categoryMatches;
        });
    }, [expenseList, filterType, filterCategory]);

    // -------------------------
    // Sorting
    // -------------------------

    const sortedExpenses = useMemo(() => {
        const result = [...filteredExpenses];

        if (sortOption === "highest") {
            result.sort((a, b) => b.amount - a.amount);
        }

        if (sortOption === "lowest") {
            result.sort((a, b) => a.amount - b.amount);
        }

        if (sortOption === "oldest") {
            result.sort(
                (a, b) => new Date(a.date) - new Date(b.date)
            );
        }

        if (sortOption === "newest") {
            result.sort(
                (a, b) => new Date(b.date) - new Date(a.date)
            );
        }

        return result;
    }, [filteredExpenses, sortOption]);

    // -------------------------
    // Analytics
    // -------------------------

    const totalExpense = useMemo(() => {
        return expenseList
            .filter((item) => item.type === "expense")
            .reduce((total, item) => total + item.amount, 0);
    }, [expenseList]);

    const totalIncome = useMemo(() => {
        return expenseList
            .filter((item) => item.type === "income")
            .reduce((total, item) => total + item.amount, 0);
    }, [expenseList]);

    const totalBalance = useMemo(() => {
        return totalIncome - totalExpense;
    }, [totalIncome, totalExpense]);
    

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

    // -------------------------
    // Return
    // -------------------------

    return {
        expenseList,
        sortedExpenses,

        loading,
        error,
        isAdding,
        deletingId,
        updatingId,

        editingId,
        page,
        totalPages,
        handlePreviousPage,
        handleNextPage,

        searchTerm,
        filterType,
        filterCategory,
        sortOption,

        handleAddExpense,
        handleDelete,
        handleEdit,
        handleSave,
        handleCancelEdit,

        setSearchTerm,
        setFilterType,
        setFilterCategory,
        setSortOption,

        totalIncome,
        totalExpense,
        totalBalance,

        numberOfExpenses,
        averageOfExpenses,
        highestExpense,
        totalByCategory
    };
};

export default useExpenses;
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