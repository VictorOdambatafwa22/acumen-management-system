import React, { useState, useEffect ,useContext} from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import '../App.css';
import { TenantContext } from './TenantContext';
import NavBar from '../Components/NavBar';

function EditTenant() {
    const { id } = useParams();
    const navigate = useNavigate();
    const tenantContext =useContext(TenantContext)
    const tenant=tenantContext.tenants.find(tenant=>tenant.id===parseInt(id))
    const [formData, setFormData] = useState({

        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',

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


   function findTenant(){
    
    setFormData({
        firstName: tenant?.firstName,
        lastName: tenant?.lastName,
        email: tenant?.email,
        phoneNumber: tenant?.phoneNumber
        // Add more fields as needed
      });
   }

    useEffect(() => {
        findTenant()  
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
        fetch(`https://acumen-management-system.onrender.com/tenant/${id}`, {
           
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
            
            tenantContext.UpdateTenant(data)
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
            <h2 className="text-2xl font-semibold mb-4">Update tenant</h2>
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-gray-600 text-sm font-medium mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-gray-600 text-sm font-medium mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-gray-600 text-sm font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
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
    
    export default EditTenant;