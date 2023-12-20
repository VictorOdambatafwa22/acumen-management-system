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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5556/unittypes');
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
    <UnitTypeContext.Provider value={{ unittypes,loading,error,UpdateUnitType}}>
      {children}
    </UnitTypeContext.Provider>
  );
};

export { UnitTypeProvider, UnitTypeContext };