import React, { useState, useEffect ,useContext} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import Home from '../Components/Home';
import { UserContext } from './UserContext';

const ResetPassword = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const userContext = useContext(UserContext)
    const user = userContext.users.find(user => user.id === parseInt(id))
    const [formData, setFormData] = useState({

        email: '',
        newPassword: '',
        confirmPassword: '',

    });
    const [successMessage, setSuccessMessage] = useState(null);

    function findUser() {

        setFormData({ email: user?.email })
    }

    useEffect(() => {
        findUser()
    }, [id])


    // UseEffect logic here


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if password and confirmPassword match
        if (formData.newPassword !== formData.confirmPassword) {
            console.log('Passwords do not match');
            setSuccessMessage('Passwords do not match!');
            // You can display an error message or take any appropriate action
            return;
        }
        // Add your form submission logic here

        fetch(`http://127.0.0.1:5556/user/${id}`, {

            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers as needed
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {

                userContext.UpdateUser(data)
                // Handle the response from the API
                console.log('Success:', data);
                setSuccessMessage('Data updated successfully!');
                navigate('/login');
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
                setSuccessMessage('Error updating data. Please try again.');
            });
    };



    return (
        <>
        {<Home />}
        <div className="container mx-auto mt-8">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 shadow-md">
                {/* Email or Username */}
                <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
                {/* <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
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
                </div> */}
                <div className="mb-4">
                    <label htmlFor="newPassword" className="block text-gray-700 text-sm font-medium mb-2">
                        New Password
                    </label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-2">
                        Confirm password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
                        required
                    />
                </div>
                <button
                    // type="submit"
                    className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-500 focus:outline-none"
                >
                    Reset password
                </button>
            </form>
            {successMessage && <p>{successMessage}</p>}

        </div>
        </>
    );
}

export default ResetPassword;