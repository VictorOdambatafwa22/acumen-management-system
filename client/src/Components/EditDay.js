import React, { useState, useEffect ,useContext} from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import '../App.css';
import { DayContext } from './DayContext';
import NavBar from '../Components/NavBar';

function EditDay() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dayContext =useContext(DayContext)
    const paymentday=dayContext.paymentdays.find(paymentday=>paymentday.id===parseInt(id))
    const [formData, setFormData] = useState({

        rentDay: ''

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

   function findDay(){
    
    setFormData({rentDay:paymentday?.rentDay})
   }

    useEffect(() => {
        findDay()  
    },[id])
   

    // UseEffect logic here

   


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

    // Check if the user is logged in
  const token = localStorage.getItem('jwtToken');

        // Add your form submission logic here
        fetch(`https://acumen-management-system.onrender.com/paymentday/${id}`, {
           
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
            
            dayContext.UpdatePaymentDay(data)
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
                <h2 className="text-2xl font-semibold mb-4">Update day</h2>
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
                    Update
                </button>
            </form>
            {successMessage && <p>{successMessage}</p>}
        </div>
        </>
    );
}

export default EditDay;