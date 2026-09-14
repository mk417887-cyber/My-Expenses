// A custom hook is simply a JavaScript function that lets us package reusable React logic.
// You can think of a custom hook as a function that returns a value or an object.

import { useState, useEffect } from "react";
import expenses from "../data.js";

const useExpenses = () => {
    const [expenseList, setExpenseList] = useState(() => {
        const storedExpenseList = localStorage.getItem("expenseList");
    
        if (storedExpenseList) {
            return JSON.parse(storedExpenseList);
        }
    
        return expenses;
    });
    
    
    useEffect(() => {
        localStorage.setItem(
            "expenseList",
            JSON.stringify(expenseList)
        );
    }, [expenseList]);
    
    return {
        expenseList,
        setExpenseList
    };
}

export default useExpenses
