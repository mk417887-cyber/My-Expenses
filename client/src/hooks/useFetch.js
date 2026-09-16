import { useState, useEffect } from "react";
// making a fetch hook so whenere we want to make a fetch request we can use this hook
// So the component focuses on UI, while the hook focuses on data-fetching logic.
const useFetch = (url) => {
// If multiple requests are allowed to modify the same state, you have to make sure an old request doesn't interfere with the current request.  That's the essence of handling race conditions.


    
        const [data, setData] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState("");

        useEffect(() => {

            const controller = new AbortController(); // We can cancel the request when the component unmounts.
            setLoading(true); // agr 1 se 2 fetch prr jaye to loading true hoga fetching se phle  || When a new request starts, you should also clear an old error:
            setError(""); // When a new request starts, you should also clear an old error:
            const getData = async () => {  // useEffect expects its callback to either: return nothing, or return a cleanup function . but direct async with useEffect gives promise  so we we make a async function async 
                try {
               
                    const response = await fetch(url, {
                        signal: controller.signal
                    });
    
                    if (!response.ok) {
                        throw new Error("Failed");
                    }
        
                    const data = await response.json(); // convert response to JSON
        
                    setData(data); // updating the hook state
                    setLoading(false);
                } catch (error) { 
                    if (error.name === "AbortError") { // AbortError → ignore it because we intentionally cancelled.
                        return; // agr tumne old request abort kri hai to lloading true rhega taki dusri request load ho ske
                    }
                    setError("Something went wrong");
                    setLoading(false); // Notice that loading becomes false only for the request that actually completes normally or fails with a genuine error.
                   
                }
                // finally{  /// finally runs whether the operation succeeds or fails.
                //     setLoading(false);
                // }
            };
        
            getData(); // call async function
    
            return () => {
                controller.abort(); // clean up
            };
        }, [url]); // run useEffect when url changes
    
  return (
    // <div>useFetch</div> // . A custom hook doesn't return JSX // Custom Hook → returns values/logic
    {
        data,
        loading,
        error
    }
  )
}

export default useFetch