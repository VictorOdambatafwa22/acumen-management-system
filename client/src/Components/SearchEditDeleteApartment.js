import React, { useState, useEffect, useContext } from 'react';
import { Link,useNavigate } from 'react-router-dom'
import { ApartmentContext } from './ApartmentContext';
import NavBar from '../Components/NavBar';

const SearchEditDeleteApartment = () => {
  // const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const apartmentContext =useContext(ApartmentContext)
  // const { handleDelete } = useContext(ApartmentContext);
console.log(apartmentContext.apartments)
const navigate = useNavigate();


useEffect(() => {
  // Check if the user is logged in
  const token = localStorage.getItem('jwtToken');
  if (!token) {
    // Redirect to the login page if not logged in
    navigate('/login'); // Adjust the route according to your application
  }
}, [navigate]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

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

  if ( apartmentContext.loading) {
    return <p>Loading...</p>;
  }

  if ( apartmentContext.error) {
    return <p>Error: {apartmentContext.error.message}</p>;
  }



  const onDeleteClick = (itemId) => {

  // Check if the user is logged in
  const token = localStorage.getItem('jwtToken');

    // Add your form submission logic here
    fetch(`https://acumen-management-system.onrender.com/apartment/${itemId}`, {
       
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            // Add any other headers as needed
        },
        //  body: JSON.stringify(formData),
    })
        .then(response => response.json())
        .then(data => {
        
          apartmentContext.handleDelete(data)
            // Handle the response from the API
            console.log('Success:', data);
        })
        .catch(error => {
            // Handle errors
            console.error('Error:', error);
        });
};

  const filteredApartments = apartmentContext.apartments.filter((apartment) =>
    apartment.apartmentName.toLowerCase().includes(searchTerm.toLowerCase())||
    apartment.location_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apartment.owner_id.toLowerCase().includes(searchTerm.toLowerCase())
  
  );

  return (
    <>
    {<NavBar />}
    <div className="container mx-auto p-4">
      <input
        type="text"
        placeholder="Search by name"
        className="mb-4 p-2 border border-gray-300 rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Apartment</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Owner</th>

          </tr>
        </thead>



        <tbody>

          {filteredApartments.map((item) => (
            <tr key={item.id}>

              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.apartmentName}</td>
              <td className="border px-4 py-2">{item.location_id}</td>
              <td className="border px-4 py-2">{item.owner_id}</td>
              <td className="border px-4 py-2">

              <Link
                  className="bg-blue-500 text-white px-2 py-1 mr-2"
                  to={`/edit-apartment/${item.id}`}
                >
                  Edit
                </Link>

                <button
                  className="bg-red-500 text-white px-2 py-1"
                  onClick={() => onDeleteClick(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
    </>

  );
};

export default SearchEditDeleteApartment;