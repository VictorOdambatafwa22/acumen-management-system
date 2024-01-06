import React, { useState, useEffect ,useContext} from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import { UtilityContext } from './UtilityContext';
import NavBar from '../Components/NavBar';

function EditUtility() {
    const { id } = useParams();
    const utilityContext =useContext(UtilityContext)
    const utility=utilityContext.utilities.find(utility=>utility.id===parseInt(id))
    const [formData, setFormData] = useState({

        utilityName: '',
        costPerUnit: ''

    });
    const [successMessage, setSuccessMessage] = useState(null);
    // Retrieve token from localStorage
    const token = localStorage.getItem('jwtToken');

   function findUtility(){
    
    setFormData({
        utilityName: utility?.utilityName,
        costPerUnit: utility?.costPerUnit
    })
   }

    useEffect(() => {
        findUtility()  
    },[id])
   

    // UseEffect logic here

   


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        fetch(`http://127.0.0.1:5556/utility/${id}`, {
           
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
            
            utilityContext.UpdateUtility(data)
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
                <h2 className="text-2xl font-semibold mb-4">Update utility</h2>
                <div className="mb-4">
                    <label htmlFor="utilityName" className="block text-gray-600 text-sm font-medium mb-2">
                        Utility
                    </label>
                    <input
                        type="text"
                        id="utilityName"
                        name="utilityName"
                        value={formData.utilityName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="costPerUnit" className="block text-gray-600 text-sm font-medium mb-2">
                        Cost per unit
                    </label>
                    <input
                        type="text"
                        id="costPerUnit"
                        name="costPerUnit"
                        value={formData.costPerUnit}
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

export default EditUtility;