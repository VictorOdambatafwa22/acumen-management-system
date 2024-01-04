import React, { useState, useEffect ,useContext} from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import { TenantContext } from './TenantContext';

function EditRent() {
    const { id } = useParams();
    const tenantContext =useContext(TenantContext)
    const tenant=tenantContext.tenants.find(tenant=>tenant.id===parseInt(id))
    const [formData, setFormData] = useState({

        firstName: '',
        lastName: '',
        arrears: '',

    });
    const [successMessage, setSuccessMessage] = useState(null);

   function findTenant(){
    
    setFormData({
        firstName: tenant?.firstName,
        lastName: tenant?.lastName,
        arrears: tenant?.arrears
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
        // Add your form submission logic here
        fetch(`http://127.0.0.1:5556/tenant/${id}`, {
           
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
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
        <div className="container mx-auto mt-8">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Update rent</h2>
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
              <label htmlFor="arrears" className="block text-gray-600 text-sm font-medium mb-2">
                Arrears
              </label>
              <input
                type="arrears"
                id="arrears"
                name="arrears"
                value={formData.arrears}
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
      );
    }
    
    export default EditRent;