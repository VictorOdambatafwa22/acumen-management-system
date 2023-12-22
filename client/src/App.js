import React from 'react';
import './App.css';
import {Route, Routes} from 'react-router-dom'
import { LocationProvider } from './Components/LocationContext';
import { OwnerProvider } from './Components/OwnerContext';
import { ApartmentProvider } from './Components/ApartmentContext';
import { UnitTypeProvider } from './Components/UnitTypeContext';
import { UnitProvider } from './Components/UnitContext';
import { TenantProvider } from './Components/TenantContext';

import SearchEditDeleteLocation from './Components/SearchEditDeleteLocation';//table component
import EditLocation from './Components/EditLocation'; //form component

import NavBar from './Components/NavBar';
import SearchEditDeleteTenant from './Components/SearchEditDeleteTenant';
import EditTenant from './Components/EditTenant'; //form component

import SearchEditDeleteOwner from './Components/SearchEditDeleteOwner';
import EditOwner from './Components/EditOwner'; //form component

import SearchEditDeleteApartment from './Components/SearchEditDeleteApartment';
import SearchEditDeleteUnitType from './Components/SearchEditDeleteUnitType';
import SearchEditDeleteUnit from './Components/SearchEditDeleteUnit';
import EditUnit from './Components/EditUnit';

import Tenant from './Components/Tenant';
import Footer from './Components/Footer';
import Apartment from './Components/Apartment';
import EditApartment from './Components/EditApartment'; //form component

import Location from './Components/Location';
import Login from './Components/Login';
import OccupyUnit from './Components/OccupyUnit';
import VacateUnit from './Components/VacateUnit';

import Owner from './Components/Owner';
// import PayRent from './Components/PayRent';
import SignUp from './Components/SignUp';
import Unit from './Components/Unit';
import UnitType from './Components/UnitType';
import EditUnitType from './Components/EditUnitType'; //form component

// import VacateUnit from './Components/VacateUnit';



const App = () => {

  return (
 
    <LocationProvider>
      <OwnerProvider>
      <ApartmentProvider>
      <UnitTypeProvider>
      <UnitProvider>
      <TenantProvider>
    <div>
     

     
      <NavBar />
    <Routes>
      {/* <Route path='/' element={ <Home /> } /> */}
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<SignUp />} />
      
     
      <Route path='/owner' element={<Owner />} />
      <Route path='/location' element={<Location />} />
      <Route path='/apartment' element={<Apartment />} />
      <Route path='/unit-Type' element={<UnitType />} />
      <Route path='/unit' element={<Unit />} />
      <Route path='/tenant/:id' element={<Tenant />} />
      <Route path='/occupy-Unit' element={<OccupyUnit />} />
      <Route path='/vacate-Unit' element={<VacateUnit />} />
      <Route path='/search-Edit-Delete-Tenant' element={<SearchEditDeleteTenant />} />
      <Route path='/search-Edit-Delete-Owner' element={<SearchEditDeleteOwner />} />
      <Route path='/search-Edit-Delete-Location' element={<SearchEditDeleteLocation />} />
      <Route path='/search-Edit-Delete-Apartment' element={<SearchEditDeleteApartment />} />
      <Route path='/search-Edit-Delete-UnitType' element={<SearchEditDeleteUnitType />} />
      <Route path='/search-Edit-Delete-Unit' element={<SearchEditDeleteUnit />} />
      <Route path='/edit-Location/:id' element={<EditLocation />} />
      <Route path='/edit-Owner/:id' element={<EditOwner />} />
      <Route path='/edit-Apartment/:id' element={<EditApartment />} />
      <Route path='/edit-UnitType/:id' element={<EditUnitType />} />
      <Route path='/edit-Unit/:id' element={<EditUnit />} />
      <Route path='/edit-Tenant/:id' element={<EditTenant />} />

    </Routes>
    <Footer />
  </div>
  </TenantProvider>
  </UnitProvider>
  </UnitTypeProvider>
  </ApartmentProvider>
  </OwnerProvider>
  </LocationProvider>
 
  );
}

export default App;
