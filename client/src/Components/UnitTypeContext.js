// StudentContext.js
import { createContext, useState ,useEffect} from 'react';

const UnitTypeContext = createContext();

const UnitTypeProvider = ({ children }) => {
  const [unittypes, setUnitTypes] = useState([]);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  function UpdateUnitType(updatedUnitType){
  const newUnitTypes=unittypes.map(unittype=>unittype.id===updatedUnitType.id?updatedUnitType:unittype)
   setUnitTypes(newUnitTypes)
  }

  const handleDelete = (itemId) => {
    // Implement the delete logic
    const updatedData = unittypes.filter((item) => item.id !== itemId);
    setUnitTypes(updatedData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('jwtToken'); // Replace with your actual token retrieval logic
       
        const response = await fetch('https://acumen-management-system.onrender.com/unittypes', {
          headers: {
            'Authorization': `Bearer ${token}`,
            // Add any other headers as needed
          },
        });
    
        const result = await response.json();
        setUnitTypes(result.UnitTypes);
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
    <UnitTypeContext.Provider value={{ unittypes,loading,error,UpdateUnitType,handleDelete}}>
      {children}
    </UnitTypeContext.Provider>
  );
};

export { UnitTypeProvider, UnitTypeContext };