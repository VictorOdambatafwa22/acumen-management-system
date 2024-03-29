// Navigation.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const NavBar = () => {

  const [ishidden, setIshidden] = useState(true)
  const navigate = useNavigate(); // Initialize the useNavigate hook

  function toggleMenu() {
    setIshidden(!ishidden)

  }

  const handleSignOut = () => {
    // Clear the token from localStorage
    localStorage.removeItem('jwtToken');
    // Redirect to the login page after signing out
    navigate('/login');
  };

  return (

    <nav className="bg-red-100">
      <div className="lg:flex items-center container mx-auto px-5 py-2">

        <div className='flex justify-between'>
          <div className="text-black text-2xl font-bold">Rental management system</div>

          <button onClick={toggleMenu} className='px-4 py-2 rounded-md bg-red-600 text-white lg:hidden'>
            Menu
          </button>

        </div>

        <div id='menu' className={`ml-auto mt-5 lg:mt-0 lg:block ${ishidden ? 'hidden' : null}`}>

          <ul className="lg:flex">

            <li className="hover:bg-red-300 mx-1 px-6 py-2 bg-red-600 text-white">
              <a href="/">Home</a>
            </li>

            <li className="hover:bg-red-300 mx-1 px-6 py-2 relative group">
              <a href="m">Setups</a>
              <ul className='lg:absolute bg-red-300 top-10 left-0  lg:hidden group-hover:block lg:w-56'>
                <li className='my-1 hover:bg-red-400 px-6 py-2'>
                  <a href='/owner'>Add new owner</a>
                </li>
                <li className='my-1 hover:bg-red-400 px-6 py-2'>
                  <a href='/location'>Add new location</a>
                </li>
                <li className='my-1 hover:bg-red-400 px-6 py-2'>
                  <a href='/apartment'>Add new apartment</a>
                </li>
                <li className='my-1 hover:bg-red-400 px-6 py-2'>
                  <a href='/unit-Type'>Add new unit type</a>
                </li>
                <li className='my-1 hover:bg-red-400 px-6 py-2'>
                  <a href='/unit'>Add new unit</a>
                </li>
                <li className='my-1 hover:bg-red-400 px-6 py-2'>
                  <a href='/day'>Add rent payment day</a>
                </li>
                <li className='my-1 hover:bg-red-400 px-6 py-2'>
                  <a href='/utility'>Add new utility</a>
                </li>
              </ul>
            </li>

            <li className="hover:bg-red-300 mx-1 px-6 py-2 relative group">
              <a href="m">Transactions</a>
              <ul className='lg:absolute bg-red-300 top-10 left-0  lg:hidden group-hover:block lg:w-56'>
                <li className='my-1 hover:bg-red-400 px-6 py-2'>
                  <a href='/occupy-Unit'>Occupy unit</a>
                </li>
                <li className='my-1 hover:bg-red-400 px-6 py-2'>
                  <a href='/search-Edit-Delete-Renting'>Pay rent</a>
                </li>
                <li className='my-1 hover:bg-red-400 px-6 py-2'>
                  <a href='/edit-Cancel-Rent'>Cancel rent payment</a>
                </li>
                <li className='my-1 hover:bg-red-400 px-6 py-2'>
                  <a href='/vacate-Unit'>Vacate unit</a>
                </li>
              </ul>
            </li>

            <li className="hover:bg-red-300 mx-1 px-6 py-2 relative group">
              <a href="m">Edit</a>
              <ul className='lg:absolute bg-red-300 top-10 left-0  lg:hidden group-hover:block lg:w-56'>
                <li className='my-1 hover:bg-red-400 px-6 py-2'>
                  <a href='/search-Edit-Delete-Owner'>Edit owner</a>
                </li>
                <li className='my-1 hover:bg-red-400 px-6 py-2'>
                  <a href='/search-Edit-Delete-Location'>Edit location</a>
                </li>
                <li className='my-1 hover:bg-red-400 px-6 py-2'>
                  <a href='/search-Edit-Delete-Apartment'>Edit apartment</a>
                </li>
                <li className='my-1 hover:bg-red-400 px-6 py-2'>
                  <a href='/search-Edit-Delete-UnitType'>Edit unit type</a>
                </li>
                <li className='my-1 hover:bg-red-400 px-6 py-2'>
                  <a href='/search-Edit-Delete-Unit'>Edit unit</a>
                </li>
                <li className='my-1 hover:bg-red-400 px-6 py-2'>
                  <a href='/search-Edit-Delete-Tenant'>Edit tenant</a>
                </li>
                <li className='my-1 hover:bg-red-400 px-6 py-2'>
                  <a href='/search-Edit-Delete-Rent'>Edit rent</a>
                </li>
                <li className='my-1 hover:bg-red-400 px-6 py-2'>
                  <a href='/search-Edit-Delete-Day'>Edit rent payment day</a>
                </li>
                <li className='my-1 hover:bg-red-400 px-6 py-2'>
                  <a href='/search-Edit-Delete-Utility'>Edit utility</a>
                </li>
              </ul>
            </li>


            <li className="hover:bg-red-300 mx-1 px-6 py-2 relative group">
              <a href="m">Administration</a>
              <ul className='lg:absolute bg-red-300 top-10 left-0  lg:hidden group-hover:block lg:w-56'>
                <li className='my-1 hover:bg-red-400 px-6 py-2'>
                  <a href='/adjust-Monthly-Rent'>Update monthly rent</a>
                </li>
              </ul>
            </li>


            <li className="hover:bg-red-300 mx-1 px-6 py-2 relative group">
              <a href="m">Reports</a>
              <ul className='lg:absolute bg-red-300 top-10 left-0  lg:hidden group-hover:block lg:w-56'>
                <li className='my-1 hover:bg-red-400 px-6 py-2'>
                  <a href='/adjust-Monthly-Rent'>Rent payment history</a>
                </li>
                <li className='my-1 hover:bg-red-400 px-6 py-2'>
                  <a href='/adjust-Monthly-Rent'>Total rent arrears</a>
                </li>
              </ul>
            </li>

            <li className="hover:bg-red-300 mx-1 px-6 py-2">
            <a href="/login" onClick={handleSignOut}>Sign Out</a>
            </li>

          </ul>
        </div>

      </div>
    </nav>




  );

};

export default NavBar;