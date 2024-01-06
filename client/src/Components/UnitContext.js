// StudentContext.js
import { createContext, useState ,useEffect} from 'react';

const UnitContext = createContext();

const UnitProvider = ({ children }) => {
  const [units, setUnits] = useState([]);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  function UpdateUnit(updatedUnit){
  const newUnits=units.map(unit=>unit.id===updatedUnit.id?updatedUnit:unit)
  setUnits(newUnits)
  }

  const handleDelete = (itemId) => {
    // Implement the delete logic
    const updatedData = units.filter((item) => item.id !== itemId);
    setUnits(updatedData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('jwtToken'); // Replace with your actual token retrieval logic
       
        const response = await fetch('http://127.0.0.1:5556/units', {
          headers: {
            'Authorization': `Bearer ${token}`,
            // Add any other headers as needed
          },
        });
     
        const result = await response.json();
        setUnits(result.Units);
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
    <UnitContext.Provider value={{ units,loading,error,UpdateUnit,handleDelete}}>
      {children}
    </UnitContext.Provider>
  );
};

export { UnitProvider, UnitContext };