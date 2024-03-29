// StudentContext.js
import { createContext, useState ,useEffect} from 'react';

const LocationContext = createContext();

const LocationProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  function UpdateLocation(updatedLocation){
  const newLocations=locations.map(location=>location.id===updatedLocation.id?updatedLocation:location)
   setLocations(newLocations)
  }

  const handleDelete = (itemId) => {
    // Implement the delete logic
    const updatedData = locations.filter((item) => item.id !== itemId);
    setLocations(updatedData);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('jwtToken'); // Replace with your actual token retrieval logic
  
        const response = await fetch('https://acumen-management-system.onrender.com/locations', {
          headers: {
            'Authorization': `Bearer ${token}`,
            // Add any other headers as needed
          },
        });
  
        const result = await response.json();
        setLocations(result.Locations);
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
    <LocationContext.Provider value={{ locations,loading,error,UpdateLocation,handleDelete}}>
      {children}
    </LocationContext.Provider>
  );
};

export { LocationProvider, LocationContext };