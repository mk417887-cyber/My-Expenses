export const getExpenses = async () => {
    try {
        const response = await fetch(
            "http://localhost:3001/api/expenses"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch expenses");
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const addExpense = async (newExpense) => {
    try {
        const response = await fetch(
            "http://localhost:3001/api/expenses",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newExpense)
            }
        );

        if (!response.ok) {
            throw new Error("Failed to add expense");
        }

        const data = await response.json(); 

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteExpense = async(id) => {
       try {
                const response = await fetch(
                    `http://localhost:3001/api/expenses/${id}`,
                    {
                        method: "DELETE"
                    }
                );
    
                if (!response.ok) {
                    throw new Error("Failed to delete expense");
                }
    
                const data = await response.json();

                return data;
            } catch (error) {
                console.error(error);
            }
};

export const updateExpense = async (updatedExpense) => {
    try {
              const response = await fetch(
                  `http://localhost:3001/api/expenses/${updatedExpense.id}`,
                  {
                      method: "PUT",
                      headers: {
                          "Content-Type": "application/json"
                      },
                      body: JSON.stringify(updatedExpense)
                  }
              );
  
              if (!response.ok) {
                  throw new Error("Failed to update expense");
              }
  
              const data = await response.json();
  
              return data;
              
          } catch (error) {
              console.error(error);
          }
          
    }