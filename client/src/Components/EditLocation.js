import React, { useState, useEffect ,useContext} from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import { LocationContext } from './LocationContext';

function EditLocation() {
    const { id } = useParams();
    const locationContext =useContext(LocationContext)
    const location=locationContext.locations.find(location=>location.id===parseInt(id))
    const [formData, setFormData] = useState({

        locationName: ''

    });

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
        // Add your form submission logic here
        fetch(`http://127.0.0.1:5556/location/${id}`, {
           
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers as needed
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
            
            locationContext.UpdateLocation(data)
                // Handle the response from the API
                console.log('Success:', data);
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });
    };


    return (
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
        </div>
    );
}

export default EditLocation;