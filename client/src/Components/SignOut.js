import React from 'react';
import { useNavigate } from 'react-router-dom';

function SignOut() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear the token from localStorage
    localStorage.removeItem('jwtToken');
    // Redirect to the login page after signing out
    navigate('/login');
  };

  return (
    <button
      onClick={handleSignOut}
      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
    >
      Sign Out
    </button>
  );
}

export default SignOut;