import React, { useState, useEffect ,useContext} from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import '../App.css';
import { LocationContext } from './LocationContext';
import NavBar from '../Components/NavBar';

function EditLocation() {
    const { id } = useParams();
    const navigate = useNavigate();
    const locationContext =useContext(LocationContext)
    const location=locationContext.locations.find(location=>location.id===parseInt(id))
    const [formData, setFormData] = useState({

        locationName: ''

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

   function findLocation(){
    
    setFormData({locationName:location?.locationName})
   }

    useEffect(() => {
        findLocation()  
    },[id])
   

    // UseEffect logic here

   


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

         // Retrieve token from localStorage
  const token = localStorage.getItem('jwtToken');

        // Add your form submission logic here
        fetch(`https://acumen-management-system.onrender.com/location/${id}`, {
           
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
            
            locationContext.UpdateLocation(data)
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
                <h2 className="text-2xl font-semibold mb-4">Update location</h2>
                <div className="mb-4">
                    <label htmlFor="locationName" className="block text-gray-600 text-sm font-medium mb-2">
                        Location
                    </label>
                    <input
                        type="text"
                        id="locationName"
                        name="locationName"
                        value={formData.locationName}
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

export default EditLocation;