import React, { useState } from 'react';
import '../App.css';

function Apartment() {
  const [formData, setFormData] = useState({
    apartmentName: '',
    locationName: '',
    ownerName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="container mx-auto mt-8">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Add new apartment</h2>
       
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
          <label htmlFor="locationName" className="block text-gray-600 text-sm font-medium mb-2">
            Location
          </label>
          <select id="example-select" name="example-select" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500">
            <option disabled selected value></option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
            required
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="ownerName" className="block text-gray-600 text-sm font-medium mb-2">
            Owner
          </label>
          <select id="example-select" name="example-select" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500" required>
            <option disabled selected value></option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
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

export default Apartment;