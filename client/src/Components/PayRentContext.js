// StudentContext.js
import { createContext, useState ,useEffect} from 'react';

const PayRentContext = createContext();

const PayRentProvider = ({ children }) => {
  const [payrents, setPayRents] = useState([]);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  function UpdatePayRent(updatedPayRent){
  const newPayRents=payrents.map(payrent=>payrent.id===updatedPayRent.id?updatedPayRent:payrent)
  setPayRents(newPayRents)
  }

  const handleDelete = (itemId) => {
    // Implement the delete logic
    const updatedData = payrents.filter((item) => item.id !== itemId);
    setPayRents(updatedData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('jwtToken'); // Replace with your actual token retrieval logic
       
        const response = await fetch('https://acumen-management-system.onrender.com/payrents', {
          headers: {
            'Authorization': `Bearer ${token}`,
            // Add any other headers as needed
          },
        });
  
        const result = await response.json();
        setPayRents(result.PayRents);
        console.log(result)
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <PayRentContext.Provider value={{ payrents,loading,error,UpdatePayRent,handleDelete}}>
      {children}
    </PayRentContext.Provider>
  );
};

export { PayRentProvider, PayRentContext };