// StudentContext.js
import { createContext, useState ,useEffect} from 'react';

const UtilityContext = createContext();

const UtilityProvider = ({ children }) => {
  const [utilities, setUtilities] = useState([]);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  function UpdateUtility(updatedUtility){
  const newUtilities=utilities.map(utility=>utility.id===updatedUtility.id?updatedUtility:utility)
   setUtilities(newUtilities)
  }

  const handleDelete = (itemId) => {
    // Implement the delete logic
    const updatedData = utilities.filter((item) => item.id !== itemId);
    setUtilities(updatedData);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5556/utilities');
        const result = await response.json();
        setUtilities(result.Utilities);
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
    <UtilityContext.Provider value={{ utilities,loading,error,UpdateUtility,handleDelete}}>
      {children}
    </UtilityContext.Provider>
  );
};

export { UtilityProvider, UtilityContext };