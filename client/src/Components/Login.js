import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import Home from '../Components/Home';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://acumen-management-system.onrender.com/logins', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
      return response.json();
    })
    .then(data => {
        console.log('Success:', data);
         // Store the token in localStorage
         localStorage.setItem('jwtToken', data.token);
        setSuccessMessage('User submitted successfully!');
        // Redirect to navbar page after successful login
        navigate('/navbar');
      })
      .catch(error => {
        console.error('Error:', error.message);
        setSuccessMessage('Invalid credentials.');
      });
  };



  return (
    <>
    {<Home />}
    <div className="container mx-auto mt-8">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-2">
           Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
            required
          />
        </div>
        <div className="mt-4">
        <Link to="/signup" className="text-blue-500 hover:underline">
          Don't have an account? Sign up
        </Link>
      </div>
      <div className="mt-2">
        <Link to="/reset-pass" className="text-blue-500 hover:underline">
          Forgot password? Reset it
        </Link>
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

export default Login;