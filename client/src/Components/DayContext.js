// StudentContext.js
import { createContext, useState ,useEffect} from 'react';

const DayContext = createContext();

const DayProvider = ({ children }) => {
  const [paymentdays, setPaymentDays] = useState([]);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  function UpdatePaymentDay(updatedPaymentDay){
  const newPaymentDays=paymentdays.map(paymentday=>paymentday.id===updatedPaymentDay.id?updatedPaymentDay:paymentday)
  setPaymentDays(newPaymentDays)
  }

  const handleDelete = (itemId) => {
    // Implement the delete logic
    const updatedData = paymentdays.filter((item) => item.id !== itemId);
    setPaymentDays(updatedData);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5556/paymentdays');
        const result = await response.json();
        setPaymentDays(result.PaymentDays);
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
    <DayContext.Provider value={{ paymentdays,loading,error,UpdatePaymentDay,handleDelete}}>
      {children}
    </DayContext.Provider>
  );
};

export { DayProvider, DayContext };