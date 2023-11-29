import React from 'react';
import './App.css';
import NavBar from './Components/NavBar';
import Owner from './Components/Owner';
import Footer from './Components/Footer';

function App() {
  return (
    <div>
    <NavBar />

    <Owner />
    <Footer />
    {/* Add the rest of your content here */}
  </div>
  );
}

export default App;
