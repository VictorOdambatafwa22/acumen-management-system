import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import { UnitContext } from './UnitContext';

function Tenant() {
  const { id } = useParams();
  const unitContext = useContext(UnitContext)
  const unit = unitContext.units.find(unit => unit.id === parseInt(id))

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    unit_id: unit?.id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here

    fetch('http://127.0.0.1:5556/tenants', {
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
        <h2 className="text-2xl font-semibold mb-4">Add new tenant</h2>
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
          Submit
        </button>
      </form>
    </div>
  );
}

export default Tenant;