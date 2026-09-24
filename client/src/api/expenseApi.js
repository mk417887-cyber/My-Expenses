import { API_BASE_URL } from "./apiConfig";


const handleResponse = async (response) => { // e your API layer now has one place responsible for interpreting HTTP responses instead of duplicating that logic four times.
    // 1. If response is successful,
    //    return the parsed JSON data.
    if (response.ok) {
        return await response.json(); // Response ke body mein jo JSON data aaya hai, usko JavaScript object mein convert karo.
    }
    const error = await response.json();

    if (response.status === 401) {
        window.dispatchEvent(new Event("unauthorized")); // Browser mein ek event announce karo: "unauthorized".
    
        const authError = new Error(
            error.error || error.message || "Unauthorized"
        );
    
        authError.status = 401;
    
        throw authError; // jis API ne request ki thi usko error milega
    }
    
    throw new Error(
        error.error || error.message || "Something went wrong"
    );

};

export const getExpenses = async (query) => {
    try {
        const params = new URLSearchParams(query);

        const token = localStorage.getItem("token");

        const response = await fetch(
            `${API_BASE_URL}/api/expenses?${params.toString()}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return await handleResponse(response);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const addExpense = async (newExpense) => {
    try {
        
        const token = localStorage.getItem("token");

        const response = await fetch(
            `${API_BASE_URL}/api/expenses`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                     Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newExpense)
            }
               
            
        );

        // if (!response.ok) {
        //     throw new Error("Failed to add expense");
        // }

        // const data = await response.json(); 

        // return data;

        return await handleResponse(response);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteExpense = async (id) => {
    try {

        const token = localStorage.getItem("token");

        const response = await fetch(
            `${API_BASE_URL}/api/expenses/${id}`,
            {
                method: "DELETE",        
            headers: {            
                 Authorization: `Bearer ${token}`
            },
        }
        );

        // if (!response.ok) {
        //     throw new Error("Failed to delete expense");
        // }

        // const data = await response.json();

        // return data;

        return await handleResponse(response);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateExpense = async (updatedExpense) => {
    try {

        const token = localStorage.getItem("token");

        const response = await fetch(
            `${API_BASE_URL}/api/expenses/${updatedExpense._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                     Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updatedExpense)
            }
        );

        //   if (!response.ok) {
        //       throw new Error("Failed to update expense");
        //   }

        //   const data = await response.json();

        //   return data;

        return await handleResponse(response);

    } catch (error) {
        console.error(error);
        throw error;
    }

}

export const getExpenseById = async (id) => {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(
            `${API_BASE_URL}/api/expenses/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return await handleResponse(response);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getExpenseSummary = async () => {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(
            `${API_BASE_URL}/api/expenses/summary`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return await handleResponse(response);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getRecentExpenses = async () => {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(
            `${API_BASE_URL}/api/expenses/recent`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return await handleResponse(response);
    } catch (error) {
        console.error(error);
        throw error;
    }
};