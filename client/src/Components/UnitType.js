import React, { useState } from 'react';
import '../App.css';

function UnitType() {
  const [formData, setFormData] = useState({
    unitTypeName: '',

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    fetch('http://127.0.0.1:5556/unittypes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers as needed
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
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
        <h2 className="text-2xl font-semibold mb-4">Add new unit type</h2>
        <div className="mb-4">
          <label htmlFor="unitTypeName" className="block text-gray-600 text-sm font-medium mb-2">
            Unit type
          </label>
          <input
            type="text"
            id="unitTypeName"
            name="unitTypeName"
            value={formData.unitTypeName}
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
    </div>
  );
}

export default UnitType;