import React from 'react';
import './App.css';
import {Route, Routes} from 'react-router-dom'
import NavBar from './Components/NavBar';
import SearchEditDeleteTenant from './Components/SearchEditDeleteTenant';
import Tenant from './Components/Tenant';
import Footer from './Components/Footer';
import Apartment from './Components/Apartment';
import Location from './Components/Location';
import Login from './Components/Login';
// import OccupyUnit from './Components/OccupyUnit';
import Owner from './Components/Owner';
// import PayRent from './Components/PayRent';
import SignUp from './Components/SignUp';
import Unit from './Components/Unit';
import UnitType from './Components/UnitType';
// import VacateUnit from './Components/VacateUnit';

const App = () => {

  return (
    <div>
      <NavBar />
    <Routes>
    {/* <Route path='/' element={ <NavBar /> } />  */}
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<SignUp />} />
      

      <Route path='owner' element={<Owner />} />
      <Route path='location' element={<Location />} />
      <Route path='apartment' element={<Apartment />} />
      <Route path='unit-Type' element={<UnitType />} />
      <Route path='unit' element={<Unit />} />
      <Route path='tenant' element={<Tenant />} />
      <Route path='search-Edit-Delete-Tenant' element={<SearchEditDeleteTenant />} />

    </Routes>
    <Footer />
  </div>
  );
}

export default App;
