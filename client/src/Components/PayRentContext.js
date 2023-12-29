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
        const response = await fetch('http://127.0.0.1:5556/payrents');
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