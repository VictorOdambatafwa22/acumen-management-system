import React, { useState, useEffect, useContext } from 'react';
import { Link,useNavigate } from 'react-router-dom'
import { UnitContext } from './UnitContext';
import NavBar from '../Components/NavBar';

const OccupyUnit = () => {
  // const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const unitContext =useContext(UnitContext)
//   const { handleDelete } = useContext(UnitContext);
console.log(unitContext.units)
const navigate = useNavigate();
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);


  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      // Redirect to the login page if not logged in
      navigate('/login'); // Adjust the route according to your application
    }
  }, [navigate]);
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://127.0.0.1:5556/locations');
  //       const result = await response.json();
  //       setStudents(result.Locations);
  //       console.log(result)
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  if ( unitContext.loading) {
    return <p>Loading...</p>;
  }

  if ( unitContext.error) {
    return <p>Error: {unitContext.error.message}</p>;
  }


//   const onDeleteClick = (itemId) => {
//     // Call the handleDelete function from the context
//     handleDelete(itemId);
//   };

//   const filteredUnits = unitContext.units.filter((unit) =>
//     unit.location_id.toLowerCase().includes(searchTerm.toLowerCase())
//   );

  const filteredUnits = unitContext.units.filter((unit) =>
  unit.unitName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  unit.apartment_id.toLowerCase().includes(searchTerm.toLowerCase())||
  unit.location_id.toLowerCase().includes(searchTerm.toLowerCase())||
  unit.unitType_id.toLowerCase().includes(searchTerm.toLowerCase())||
  unit.unitStatus.toLowerCase().includes(searchTerm.toLowerCase())||
  unit.rentAmount.toString().includes(searchTerm)
);



  return (
    <>
    {<NavBar />}
    <div className="container mx-auto p-4">
      <input
        type="text"
        placeholder="Search by any field ..."
        className="mb-4 p-2 border border-gray-300 rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Unit name</th>
            <th className="px-4 py-2">Unit type</th>
            <th className="px-4 py-2">Rent amount</th>
            <th className="px-4 py-2">Apartment</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Status</th>    
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>



        <tbody>

          {filteredUnits.map((item) => (
            <tr key={item.id}>

              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.unitName}</td>
              <td className="border px-4 py-2">{item.unitType_id}</td>
              <td className="border px-4 py-2">{item.rentAmount}</td>
              <td className="border px-4 py-2">{item.apartment_id}</td>
              <td className="border px-4 py-2">{item.location_id}</td>          
              <td className="border px-4 py-2">{item.unitStatus}</td>          
              <td className="border px-4 py-2">

              <Link
                  className="bg-blue-500 text-white px-2 py-1 mr-2"
                  to={`/tenant/${item.id}`}
                >
                  Take
                </Link>

                {/* <button
                  className="bg-red-500 text-white px-2 py-1"
                  onClick={() => onDeleteClick(item.id)}
                >
                  Delete
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
    </>

  );
};

export default OccupyUnit;