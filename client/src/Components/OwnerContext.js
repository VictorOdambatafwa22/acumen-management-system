// StudentContext.js
import { createContext, useState ,useEffect} from 'react';

const OwnerContext = createContext();

const OwnerProvider = ({ children }) => {
  const [owners, setOwners] = useState([]);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  function UpdateOwner(updatedOwner){
  const newOwners=owners.map(owner=>owner.id===updatedOwner.id?updatedOwner:owner)
  setOwners(newOwners)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5556/owners');
        const result = await response.json();
        setOwners(result.Owners);
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
    <OwnerContext.Provider value={{ owners,loading,error,UpdateOwner}}>
      {children}
    </OwnerContext.Provider>
  );
};

export { OwnerProvider, OwnerContext };