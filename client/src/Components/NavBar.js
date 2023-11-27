// Navigation.js
import React, { useState } from 'react';


const NavBar = () => {

const [ishidden,setIshidden]=useState(true)

  function toggleMenu(){
    setIshidden(!ishidden)
  
}
 
return (
 
  <nav className="bg-red-100">
    <div className="lg:flex items-center container mx-auto px-5 py-2">

      <div className='flex justify-between'>
         <div className="text-black text-2xl font-bold">Rental management system</div>
      
          <button onClick={toggleMenu} className='px-4 py-2 rounded-md bg-red-600 text-white lg:hidden'>
            Menu
          </button>
       
      </div>

     <div id='menu' className={`ml-auto mt-5 lg:mt-0 lg:block ${ishidden ? 'hidden':null}`}> 
     
      <ul className="lg:flex">

        <li className="hover:bg-red-300 mx-1 px-6 py-2 bg-red-600 text-white">
          <a href="m">Home</a>
        </li>

        <li className="hover:bg-red-300 mx-1 px-6 py-2 relative group">
          <a href="m">Setups</a>
          <ul className='lg:absolute bg-red-300 top-10 left-0  lg:hidden group-hover:block lg:w-56'>
            <li className='my-1 hover:bg-red-400 px-6 py-2'>
              <a href='m'>Add new Owner</a>
            </li>
            <li className='my-1 hover:bg-red-400 px-6 py-2'>
              <a href='m'>Add new Location</a>
            </li>
            <li className='my-1 hover:bg-red-400 px-6 py-2'>
              <a href='m'>Add new Apartment</a>
            </li>
            <li className='my-1 hover:bg-red-400 px-6 py-2'>
              <a href='m'>Add new Unit type</a>
            </li>
            <li className='my-1 hover:bg-red-400 px-6 py-2'>
              <a href='m'>Add new Unit</a>
            </li>
            <li className='my-1 hover:bg-red-400 px-6 py-2'>
              <a href='m'>Add new Tenant</a>
            </li>
          </ul>
        </li>

        <li className="hover:bg-red-300 mx-1 px-6 py-2 relative group">
          <a href="m">Transactions</a>
          <ul className='lg:absolute bg-red-300 top-10 left-0  lg:hidden group-hover:block lg:w-56'>
            <li className='my-1 hover:bg-red-400 px-6 py-2'>
              <a href='m'>Occupy unit</a>
            </li>
            <li className='my-1 hover:bg-red-400 px-6 py-2'>
              <a href='m'>Pay rent</a>
            </li>
            <li className='my-1 hover:bg-red-400 px-6 py-2'>
              <a href='m'>Vacate unit</a>
            </li>
          </ul>
        </li>

        <li className="hover:bg-red-300 mx-1 px-6 py-2">
          <a href="/">Reports</a>
        </li>

        <li className="hover:bg-red-300 mx-1 px-6 py-2">
          <a href="/">Sign out</a>
        </li>
       
      </ul>
     </div>

      </div>
  </nav>
  


  
);

};

export default NavBar;