import React from 'react';
import './App.css';
import NavBar from './Components/NavBar';
import UnitType from './Components/UnitType';
import Footer from './Components/Footer';

function App() {
  return (
    <div>
    <NavBar />

    <UnitType />
    <Footer />
    {/* Add the rest of your content here */}
  </div>
  );
}

export default App;
