import React, { useState } from 'react';
import '../App.css';
import NavBar from '../Components/NavBar';

function Utility() {
  const [formData, setFormData] = useState({
    utilityName: '',
    costPerUnit: '',

  });
  const [successMessage, setSuccessMessage] = useState(null);
       // Retrieve token from localStorage
       const token = localStorage.getItem('jwtToken');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    fetch('http://127.0.0.1:5556/utilities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        // Add any other headers as needed
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the API
        console.log('Success:', data);
        setSuccessMessage('Data submitted successfully!');
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
        setSuccessMessage('Error submitting data. Please try again.');
      });
  };
    

  return (
    <>
    {<NavBar />}
    <div className="container mx-auto mt-8">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Add new utility</h2>
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
          Submit
        </button>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div>
    </>
  );
}

export default Utility;