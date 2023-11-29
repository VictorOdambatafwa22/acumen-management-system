import React from 'react';
import './App.css';
import NavBar from './Components/NavBar';
import Apartment from './Components/Apartment';
import Footer from './Components/Footer';

function App() {
  return (
    <div>
    <NavBar />

    <Apartment />
    <Footer />
    {/* Add the rest of your content here */}
  </div>
  );
}

export default App;
