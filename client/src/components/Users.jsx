import useFetch from "../hooks/useFetch.js";

const Users = () => {

    // useEffect(() => {
    //     fetch("https://jsonplaceholder.typicode.com/users")
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error("Failed to fetch users");
    //             }
    //             return response.json()// Convert the response to JSON.
    //         })
    //         .then((data) => {
    //             setUsers(data); // Put the result into users using setUsers
    //             setLoading(false);
    //         })
    //         .catch((error) => { // .then()  → Something went successfully  // .catch() → Something went wrong
    //             setError("Something went wrong");
    //             setLoading(false);
    //             console.log(error);
    //         });
    // }, []);

    //This works, but with multiple .then() calls, things can become harder to read.

    const { data, loading, error } = useFetch(
        "https://jsonplaceholder.typicode.com/users"  // Users.jsx
    );                                                                            //     |  calls 
    //      V                                  
    return (                                                                // useFetch()
        <div>
            {/* // if loading is true then loading... */}
            {loading && <p>Loading...</p>} 
            {error && <p>{error}</p>}
            {data.map((user) => {//users ko map krkr data me bhr do // data -> array of users  
                return (// This pattern is closely related to stale-while-revalidate: // Show data you already have immediately, while checking for newer data in the background.
                    <div key={user.id}>
                        <p >{user.email}</p>
                        {/* < p key ={user.id}>{user.name}</p> */}
                    </div>
                )
            })}

        </div>
    )
}

export default Users
// Making the request

// Inside useEffect:

// useEffect(() => {
//     fetch("https://jsonplaceholder.typicode.com/users")
//         .then((response) => response.json())
//         .then((data) => {
//             setUsers(data);
//         });
// }, []);

// Let's understand this slowly.

// First:
// fetch("https://jsonplaceholder.typicode.com/users")

// fetch() sends a request to the API.

// The server responds.

// Then:
// .then((response) => response.json())

// The response isn't immediately the JavaScript data we want.

// response.json() converts the response into usable JavaScript data.

// Then:
// .then((data) => {
//     setUsers(data);
// });

// Now we have the actual users.

// We put them into React state.

// API data
//    ↓
// setUsers(data)
//    ↓
// users changes
//    ↓
// React re-renders
//    ↓
// users appear on screen
// 4. Why []?

// We write:

// }, []);

// because we normally want:

// Component mounts
//       ↓
// API request
//       ↓
// Data received
//       ↓
// State updated
//       ↓
// Component re-renders
//       ↓
// ❌ Don't make another API request