import React, { useState } from 'react';
import '../App.css';
import NavBar from '../Components/NavBar';

function PaymentDay() {
    const [formData, setFormData] = useState({
        rentDay: '',

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
        fetch('http://127.0.0.1:5556/paymentdays', {
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
                <h2 className="text-2xl font-semibold mb-4">Add new payment day</h2>

                <div className="mb-4">
                    <label htmlFor="apartment_id" className="block text-gray-600 text-sm font-medium mb-2">
                        Day of the month
                    </label>
                    <select id="example-select" name="rentDay"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
                        onChange={handleChange}
                        required
                    >
                        <option disabled selected value=""></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>'
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>'
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>'

                    </select>
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

export default PaymentDay;