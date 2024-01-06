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

  const handleDelete = (itemId) => {
    // Implement the delete logic
    const updatedData = apartments.filter((item) => item.id !== itemId);
    setApartments(updatedData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('jwtToken'); // Replace with your actual token retrieval logic
       
        const response = await fetch('http://127.0.0.1:5556/apartments', {
          headers: {
            'Authorization': `Bearer ${token}`,
            // Add any other headers as needed
          },
        });
  
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
    <ApartmentContext.Provider value={{ apartments,loading,error,UpdateApartment,handleDelete}}>
      {children}
    </ApartmentContext.Provider>
  );
};

export { ApartmentProvider, ApartmentContext };