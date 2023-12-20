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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5556/locations');
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
    <LocationContext.Provider value={{ locations,loading,error,UpdateLocation}}>
      {children}
    </LocationContext.Provider>
  );
};

export { LocationProvider, LocationContext };