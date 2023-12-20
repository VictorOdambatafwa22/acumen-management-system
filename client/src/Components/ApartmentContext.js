// StudentContext.js
import { createContext, useState ,useEffect} from 'react';

const ApartmentContext = createContext();

const ApartmentProvider = ({ children }) => {
  const [apartments, setApartments] = useState([]);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  function UpdateApartment(updatedApartment){
  const newApartments=apartments.map(apartment=>apartment.id===updatedApartment.id?updatedApartment:apartment)
  setApartments(newApartments)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5556/apartments');
        const result = await response.json();
        setApartments(result.Apartments);
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
    <ApartmentContext.Provider value={{ apartments,loading,error,UpdateApartment}}>
      {children}
    </ApartmentContext.Provider>
  );
};

export { ApartmentProvider, ApartmentContext };