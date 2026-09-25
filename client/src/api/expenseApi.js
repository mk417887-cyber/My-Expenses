import { API_BASE_URL } from "./apiConfig";

let refreshPromise = null;

export const refreshAccessToken = async () => { //Ask the backend for a new access token and return it.
    const response = await fetch(
        `${API_BASE_URL}/api/auth/refresh`,
        {
            method: "POST",
            credentials: "include", // Include the HttpOnly refreshToken cookie with this request.
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Unable to refresh access token"
        );
    }

    return data.token; // the caller receives the new access token.
};

const handleAuthFailure = () => {
    window.dispatchEvent(new Event("unauthorized"));
};

const requestWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem("token");

    const response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status !== 401) {
        return response;
    }

    try {

        if (!refreshPromise) { // in case of multiple requests at the same time
            refreshPromise = refreshAccessToken().finally(() => { // is important because after the refresh finishes, we reset the variable so a future token expiry can start another refresh.
                refreshPromise = null;
            });
        }

        const newToken = await refreshPromise;

        localStorage.setItem("token", newToken);

        const retryResponse = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${newToken}`,
            },
        });

        if (retryResponse.status === 401) {
            handleAuthFailure();
        }

        return retryResponse;
    } catch (error) {
        handleAuthFailure();
        throw error;
    }
};

const handleResponse = async (response) => { // e your API layer now has one place responsible for interpreting HTTP responses instead of duplicating that logic four times.
    // 1. If response is successful,
    //    return the parsed JSON data.
    if (response.ok) {
        return await response.json(); // Response ke body mein jo JSON data aaya hai, usko JavaScript object mein convert karo.
    }
    const error = await response.json();


    if (response.status === 401) {
        const authError = new Error(
            error.error || error.message || "Unauthorized"
        );

        authError.status = 401;
        throw authError;
    }

    throw new Error(
        error.error || error.message || "Something went wrong"
    );

};

export const getExpenses = async (query) => {
    try {
        const params = new URLSearchParams(query);


        const response = await requestWithAuth(  // requestWithAuth() handles authentication/retry,
            `${API_BASE_URL}/api/expenses?${params.toString()}`
        );

        return await handleResponse(response);  // handleResponse() handles interpreting the API response/error.
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const addExpense = async (newExpense) => {
    try {

        const response = await requestWithAuth(
            `${API_BASE_URL}/api/expenses`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newExpense),
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
        const response = await requestWithAuth(
            `${API_BASE_URL}/api/expenses/${id}`,
            {
                method: "DELETE",
            }
        );

        return await handleResponse(response);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateExpense = async (updatedExpense) => {
    try {
        const response = await requestWithAuth(
            `${API_BASE_URL}/api/expenses/${updatedExpense._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedExpense),
            }
        );

        return await handleResponse(response);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

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
        const response = await requestWithAuth(
            `${API_BASE_URL}/api/expenses/summary`
        );

        return await handleResponse(response);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getRecentExpenses = async () => {
    try {
        const response = await requestWithAuth(
            `${API_BASE_URL}/api/expenses/recent`
        );

        return await handleResponse(response);
    } catch (error) {
        console.error(error);
        throw error;
    }
};