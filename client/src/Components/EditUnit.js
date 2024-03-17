import React, { useState, useEffect ,useContext} from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import '../App.css';
import { UnitContext } from './UnitContext';
import NavBar from '../Components/NavBar';

function EditUnit() {
   
    const [apartments, setApartments] = useState([]);
    const [unittypes, setUnitTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const { id } = useParams();
    const navigate = useNavigate();
    const unitContext =useContext(UnitContext)
    const unit=unitContext.units.find(unit=>unit.id===parseInt(id))
    const [formData, setFormData] = useState({

        unitName: '',
        apartment_id: '',
        unitType_id: '',
        rentAmount: '',

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

   function findUnit(){
    
    setFormData({
        unitName: unit?.unitName,
        apartment_id: unit?.apartment_id,
        unitType_id: unit?.unitType_id,
        rentAmount: unit?.rentAmount
       
      });
   }

    useEffect(() => {
        findUnit()  
    },[id])
   

    // UseEffect logic here
    useEffect(() => {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem('jwtToken'); // Replace 'yourBearerToken' with your actual Bearer token
    
          const response = await fetch('https://acumen-management-system.onrender.com/apartments', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json', // You can add other headers if needed
            },
          });
    
          const result = await response.json();
          setApartments(result.Apartments);
          console.log(result);
    
          const responseO = await fetch('https://acumen-management-system.onrender.com/unittypes', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json', // You can add other headers if needed
            },
          });
    
          const resultO = await responseO.json();
          setUnitTypes(resultO.UnitTypes);
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

        // Retrieve token from localStorage
        const token = localStorage.getItem('jwtToken');

        // Add your form submission logic here
        fetch(`https://acumen-management-system.onrender.com/unit/${id}`, {
           
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
            
            unitContext.UpdateUnit(data)
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
            <h2 className="text-2xl font-semibold mb-4">Update unit</h2>
    
            <div className="mb-4">
              <label htmlFor="unitName" className="block text-gray-600 text-sm font-medium mb-2">
                Unit name
              </label>
              <input
                type="text"
                id="unitName"
                name="unitName"
                value={formData.unitName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
                required
              />
            </div>
    
            <div className="mb-4">
              <label htmlFor="apartment_id" className="block text-gray-600 text-sm font-medium mb-2">
                Apartment
              </label>
              <select id="example-select" name="apartment_id"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
                onChange={handleChange}
                required
                >
                <option disabled selected value=""></option>  
                {apartments.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.apartmentName}
                  </option>
                ))}
                
              </select>
            </div>
    
            <div className="mb-4">
              <label htmlFor="unitType_id" className="block text-gray-600 text-sm font-medium mb-2">
                Unit type
              </label>
              <select id="example-select" name="unitType_id"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
                onChange={handleChange}
                required
                >
              <option disabled selected value=""></option>  
                {unittypes.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.unitTypeName}
                  </option>
                ))}
                
              </select>
            </div>
    
            <div className="mb-4">
              <label htmlFor="rentAmount" className="block text-gray-600 text-sm font-medium mb-2">
                Rent amount
              </label>
              <input
                type="text"
                id="rentAmount"
                name="rentAmount"
                value={formData.rentAmount}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
                required
              />
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
    
    
    export default EditUnit;