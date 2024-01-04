// Navigation.js
import React, { useState } from 'react';


const Home = () => {

  const [ishidden, setIshidden] = useState(true)

  function toggleMenu() {
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

        <div id='menu' className={`ml-auto mt-5 lg:mt-0 lg:block ${ishidden ? 'hidden' : null}`}>

          <ul className="lg:flex">

            <li className="hover:bg-red-300 mx-1 px-6 py-2">
              <a href="/login">Login</a>
            </li>

          </ul>
        </div>

      </div>
    </nav>




  );

};

export default Home;