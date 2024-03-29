import React from 'react';
import './App.css';
import {Route, Routes} from 'react-router-dom'
import { LocationProvider } from './Components/LocationContext';
import { OwnerProvider } from './Components/OwnerContext';
import { ApartmentProvider } from './Components/ApartmentContext';
import { UnitTypeProvider } from './Components/UnitTypeContext';
import { UnitProvider } from './Components/UnitContext';
import { TenantProvider } from './Components/TenantContext';
import { DayProvider } from './Components/DayContext';
import { UtilityProvider } from './Components/UtilityContext';
import { PayRentProvider } from './Components/PayRentContext';
import { UserProvider } from './Components/UserContext';

import SearchEditDeleteLocation from './Components/SearchEditDeleteLocation';//table component
import EditLocation from './Components/EditLocation'; //form component

import SearchEditDeleteDay from './Components/SearchEditDeleteDay';//table component
import EditDay from './Components/EditDay'; //form component

import SearchEditDeleteUtility from './Components/SearchEditDeleteUtility';//table component
import EditUtility from './Components/EditUtility'; //form component

import NavBar from './Components/NavBar';
import SearchEditDeleteTenant from './Components/SearchEditDeleteTenant';
import EditTenant from './Components/EditTenant'; //form component

import SearchEditDeleteRent from './Components/SearchEditDeleteRent';
import EditRent from './Components/EditRent'; //form component

import SearchEditDeleteRenting from './Components/SearchEditDeleteRenting';
import PayRent from './Components/PayRent'; //form component
import CancelRent from './Components/CancelRent'; //form component
import AdjustMonthlyRent from './Components/AdjustMonthlyRent'; //form component

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
import OccupyUnit from './Components/OccupyUnit';
import VacateUnit from './Components/VacateUnit';

import Owner from './Components/Owner';
import Home from './Components/Home';
import SignUpForm from './Components/SignUpForm';
import Login from './Components/Login';
import ResetPassword from './Components/ResetPassword';
import ResetPass from './Components/ResetPass';
import SignOut from './Components/SignOut';

import Unit from './Components/Unit';
import UnitType from './Components/UnitType';
import EditUnitType from './Components/EditUnitType'; //form component
import PaymentDay from './Components/PaymentDay';
import Utility from './Components/Utility';

// import VacateUnit from './Components/VacateUnit';



const App = () => {

  return (
 
    <LocationProvider>
      <OwnerProvider>
      <ApartmentProvider>
      <UnitTypeProvider>
      <UnitProvider>
      <TenantProvider>
      <DayProvider>
      <UtilityProvider> 
      <PayRentProvider> 
      <UserProvider> 
    <div>


      {/* <NavBar /> */}

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/navbar' element={<NavBar />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUpForm />} />
      <Route path='/reset-password/:id' element={<ResetPassword />} />
      <Route path='/reset-pass' element={<ResetPass />} />
      <Route path='/signout' element={<SignOut />} />
     
      <Route path='/owner' element={<Owner />} />
      <Route path='/location' element={<Location />} />
      <Route path='/apartment' element={<Apartment />} />
      <Route path='/unit-Type' element={<UnitType />} />
      <Route path='/unit' element={<Unit />} />
      <Route path='/day' element={<PaymentDay />} />
      <Route path='/utility' element={<Utility />} />
      <Route path='/tenant/:id' element={<Tenant />} />
      <Route path='/occupy-Unit' element={<OccupyUnit />} />
      <Route path='/vacate-Unit' element={<VacateUnit />} />
      <Route path='/search-Edit-Delete-Tenant' element={<SearchEditDeleteTenant />} />
      <Route path='/search-Edit-Delete-Rent' element={<SearchEditDeleteRent />} />
      <Route path='/search-Edit-Delete-Renting' element={<SearchEditDeleteRenting />} /> 
      <Route path='/search-Edit-Delete-Owner' element={<SearchEditDeleteOwner />} />
      <Route path='/search-Edit-Delete-Location' element={<SearchEditDeleteLocation />} />
      <Route path='/search-Edit-Delete-Apartment' element={<SearchEditDeleteApartment />} />
      <Route path='/search-Edit-Delete-UnitType' element={<SearchEditDeleteUnitType />} />
      <Route path='/search-Edit-Delete-Unit' element={<SearchEditDeleteUnit />} />
      <Route path='/search-Edit-Delete-Day' element={<SearchEditDeleteDay />} />
      <Route path='/search-Edit-Delete-Utility' element={<SearchEditDeleteUtility />} />
      <Route path='/edit-Cancel-Rent' element={<CancelRent />} /> 
      <Route path='/adjust-Monthly-Rent' element={<AdjustMonthlyRent />} /> 

      <Route path='/edit-Location/:id' element={<EditLocation />} />
      <Route path='/edit-Owner/:id' element={<EditOwner />} />
      <Route path='/edit-Apartment/:id' element={<EditApartment />} />
      <Route path='/edit-UnitType/:id' element={<EditUnitType />} />
      <Route path='/edit-Unit/:id' element={<EditUnit />} />
      <Route path='/edit-Tenant/:id' element={<EditTenant />} />
      <Route path='/edit-Rent/:id' element={<EditRent />} /> 
      <Route path='/edit-Renting/:id' element={<PayRent />} /> 
      <Route path='/edit-paymentday/:id' element={<EditDay />} />
      <Route path='/edit-utility/:id' element={<EditUtility />} />

    </Routes>
    <Footer />
  </div>
  </UserProvider>
  </PayRentProvider>
  </UtilityProvider>
  </DayProvider>
  </TenantProvider>
  </UnitProvider>
  </UnitTypeProvider>
  </ApartmentProvider>
  </OwnerProvider>
  </LocationProvider>
 
  );
}

export default App;
