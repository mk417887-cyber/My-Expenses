import { API_BASE_URL } from "./apiConfig";

let refreshPromise = null;

export const refreshAccessToken = async () => {
    let response;

    try {
        response = await fetch(
            `${API_BASE_URL}/api/auth/refresh`,
            {
                method: "POST",
                credentials: "include",
            }
        );
    } catch {
        const error = new Error(
            "Unable to connect to the server. Please check your internet connection."
        );

        error.isNetworkError = true;

        throw error;
    }

    let data = null;

    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (!response.ok) {
        const error = new Error(
            data?.message ||
            data?.error ||
            "Unable to refresh access token"
        );

        error.status = response.status;

        throw error;
    }

    if (!data?.token) {
        const error = new Error(
            "The server did not return a valid access token."
        );

        error.status = 500;

        throw error;
    }

    return data.token;
};

const handleAuthFailure = () => {
    window.dispatchEvent(new Event("unauthorized"));
};

const createNetworkError = () => { // network error -> means frontens -> fetch() but fetching fails
    const error = new Error( // Frontend → request → backend unavailable → network error → UI error
        "Unable to connect to the server. Please check your internet connection."
    );

    error.isNetworkError = true;

    return error;
};

const requestWithAuth = async (url, options = {}) => { // Because requestWithAuth() is the central place through which all protected expense requests pass.
    const token = localStorage.getItem("token");

    let response;

    try {
        response = await fetch(url, {
            ...options, // ...options already forwards signal automatically. // signal is also forwarded to the retry.
            headers: {
                ...options.headers,
                Authorization: `Bearer ${token}`,
            },
        });
    } catch {
        throw createNetworkError();
    }

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

        if (error.status === 401) { // refresh token expired
            handleAuthFailure();
        }

        throw error;
    }
};


const handleResponse = async (response) => {
    let data = null;

    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (response.ok) { // valid json success 
        return data;
    }

    const message = // valid json error 
        data?.error ||
        data?.message ||
        "Something went wrong";

    const apiError = new Error(message); // HTTP Error : Frontend → Backend → 500 response → fetch succeeds → response.ok = false  // fetching ke baad response aaya hai prr handle response me error aaya 

    apiError.status = response.status;// Network Error : Frontend → ❌ Backend → fetch() itself throws → no response exists // failed to fetch

    throw apiError;
};

export const getExpenses = async (query , signal) => {
    try {
        const params = new URLSearchParams(query);


        const response = await requestWithAuth(  // requestWithAuth() handles authentication/retry,
            `${API_BASE_URL}/api/expenses?${params.toString()}`,
            {
                signal, // signal is the communication channel between our AbortController and fetch()
            }
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
        const response = await requestWithAuth(
            `${API_BASE_URL}/api/expenses/${id}`
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

export const logoutUser = async () => {
    let response;

    try {
        response = await fetch(
            `${API_BASE_URL}/api/auth/logout`,
            {
                method: "POST",
                credentials: "include",
            }
        );
    } catch {
        const error = new Error(
            "Unable to connect to the server. Please check your internet connection."
        );

        error.isNetworkError = true;

        throw error;
    }

    return await handleResponse(response);
};


// Current API layer → Finish Expenses CRUD/frontend → Dashboard → Profile → UI/UX polish → Forgot Password → Google Auth → Final security/testing → Deployment