import { useState, useEffect } from "react";
// making a fetch hook so whenere we want to make a fetch request we can use this hook
// So the component focuses on UI, while the hook focuses on data-fetching logic.

const cache = {}; // agr hme ek url se 2 request krna hai to 2nd request se 1st request se data nahi le rha hai to usko cache me store krna hai // also it is an object
const CACHE_TIME = 60 * 1000;// 1 minute

const useFetch = (url) => {
    // If multiple requests are allowed to modify the same state, you have to make sure an old request doesn't interfere with the current request.  That's the essence of handling race conditions.

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [refreshing, setRefreshing] = useState(false); // "I already have data, but I'm checking for newer data."


    useEffect(() => {
        const controller = new AbortController(); // We can cancel the request when the component unmounts.
        setLoading(true); // agr 1 se 2 fetch prr jaye to loading true hoga fetching se phle  || When a new request starts, you should also clear an old error:
        setError(""); // When a new request starts, you should also clear an old error:
        setRefreshing(false);

        if (cache[url]) { // kya cache me same url hai
            if (cache[url].timestamp + CACHE_TIME > Date.now()) { // TTL = Time To Live logic
                setData(cache[url].data);
                setLoading(false);
                setRefreshing(true);
                // return;          and  stop executing that particular getData() function      // return so that useEffect doesn't run again //it means that Don't continue to the fetch logic. We already have the data.
            }


        }


        const getData = async () => {  // useEffect expects its callback to either: return nothing, or return a cleanup function . but direct async with useEffect gives promise  so we we make a async function async 
            try {

                const response = await fetch(url, {
                    signal: controller.signal
                });

                if (!response.ok) {
                    throw new Error("Failed");
                }

                const data = await response.json(); // convert response to JSON

                cache[url] = {
                    data: data,
                    timestamp: Date.now()
                };

                setData(data); // updating the hook state //setData(data) → gives it to React so the UI updates
                setLoading(false);
                setRefreshing(false);
            } catch (error) {
                if (error.name === "AbortError") { // AbortError → ignore it because we intentionally cancelled.
                    return; // agr tumne old request abort kri hai to lloading true rhega taki dusri request load ho ske
                }
                setError("Something went wrong");
                setLoading(false); // Notice that loading becomes false only for the request that actually completes normally or fails with a genuine error.
                setRefreshing(false);
            }
            // finally{  /// finally runs whether the operation succeeds or fails.
            //     setLoading(false);
            // }
        };

        getData(); // call async function

        return () => {
            controller.abort(); // clean up
        };
    }, [url]); // run useEffect when url changes //.

    return {
        // <div>useFetch</div> // . A custom hook doesn't return JSX // Custom Hook → returns values/logic

        data,
        loading,
        error,
        refreshing
    }

}

export default useFetch