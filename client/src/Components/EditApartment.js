import React, { useState, useEffect ,useContext} from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import '../App.css';
import { ApartmentContext } from './ApartmentContext';
import NavBar from '../Components/NavBar';

function EditApartment() {
   
    const [students, setStudents] = useState([]);
    const [owners, setOwners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const { id } = useParams();
    const navigate = useNavigate();
    const apartmentContext =useContext(ApartmentContext)
    const apartment=apartmentContext.apartments.find(apartment=>apartment.id===parseInt(id))
    const [formData, setFormData] = useState({

        apartmentName: '',
        location_id: '',
        owner_id: '',
       

    });
    const [successMessage, setSuccessMessage] = useState(null);

useEffect(() => {
  // Check if the user is logged in
  const token = localStorage.getItem('jwtToken');
  if (!token) {
    // Redirect to the login page if not logged in
    navigate('/login'); // Adjust the route according to your application
  }
}, [navigate]);


   function findApartment(){
    
    setFormData({
        apartmentName: apartment?.apartmentName,
        location_id: apartment?.location_id,
        owner_id: apartment?.owner_id
        // Add more fields as needed
      });
   }

    useEffect(() => {
        findApartment()  
    },[id])
   

    // UseEffect logic here
    useEffect(() => {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem('jwtToken'); // Replace 'yourBearerToken' with your actual Bearer token
    
          const response = await fetch('http://127.0.0.1:5556/locations', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json', // You can add other headers if needed
            },
          });
    
          const result = await response.json();
          setStudents(result.Locations);
          console.log(result);
    
          const responseO = await fetch('http://127.0.0.1:5556/owners', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json', // You can add other headers if needed
            },
          });
    
          const resultO = await responseO.json();
          setOwners(resultO.Owners);
          console.log(resultO);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
    
      fetchData();
    }, []);
    
      if (loading) {
        return <p>Loading...</p>;
      }
    
      if (error) {
        return <p>Error: {error.message}</p>;
      }
   


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

  // Check if the user is logged in
  const token = localStorage.getItem('jwtToken');

        // Add your form submission logic here
        fetch(`http://127.0.0.1:5556/apartment/${id}`, {
           
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                // Add any other headers as needed
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
            
            apartmentContext.UpdateApartment(data)
                // Handle the response from the API
                console.log('Success:', data);
                setSuccessMessage('Data updated successfully!');
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
                setSuccessMessage('Error updating data. Please try again.');
            });
    };


    return (
      <>
      {<NavBar />}
        <div className="container mx-auto mt-8">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Update apartment</h2>
    
            <div className="mb-4">
              <label htmlFor="apartmentName" className="block text-gray-600 text-sm font-medium mb-2">
                Apartment
              </label>
              <input
                type="text"
                id="apartmentName"
                name="apartmentName"
                value={formData.apartmentName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
                required
              />
            </div>
    
            <div className="mb-4">
              <label htmlFor="location_id" className="block text-gray-600 text-sm font-medium mb-2">
                Location
              </label>
              <select id="example-select" name="location_id"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
                onChange={handleChange}
                required
                >
                <option disabled selected value=""></option>  
                {students.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.locationName}
                  </option>
                ))}
                required
              </select>
            </div>
    
            <div className="mb-4">
              <label htmlFor="owner_id" className="block text-gray-600 text-sm font-medium mb-2">
                Owner
              </label>
              <select id="example-select" name="owner_id"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
                onChange={handleChange}
                required
                >
               <option disabled selected value=""></option>  
                {owners.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.firstName}
                  </option>
                ))}
                
              </select>
            </div>
    
    
    
            <button
              // type="submit"
              className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-500 focus:outline-none"
            >
              Update
            </button>
          </form>
          {successMessage && <p>{successMessage}</p>}
        </div>
        </>
      );
    }
    
    export default EditApartment;