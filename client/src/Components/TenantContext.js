// StudentContext.js
import { createContext, useState ,useEffect} from 'react';

const TenantContext = createContext();

const TenantProvider = ({ children }) => {
  const [tenants, setTenants] = useState([]);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  function UpdateTenant(updatedTenant){
  const newTenants=tenants.map(tenant=>tenant.id===updatedTenant.id?updatedTenant:tenant)
  setTenants(newTenants)
  }

  const handleDelete = (itemId) => {
    // Implement the delete logic
    const updatedData = tenants.filter((item) => item.id !== itemId);
    setTenants(updatedData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('jwtToken'); // Replace with your actual token retrieval logic
       
        const response = await fetch('https://acumen-management-system.onrender.com/tenants', {
          headers: {
            'Authorization': `Bearer ${token}`,
            // Add any other headers as needed
          },
        });
  
        const result = await response.json();
        setTenants(result.Tenants);
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
    <TenantContext.Provider value={{ tenants,loading,error,UpdateTenant,handleDelete}}>
      {children}
    </TenantContext.Provider>
  );
};

export { TenantProvider, TenantContext };