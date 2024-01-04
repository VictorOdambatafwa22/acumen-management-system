import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom'
import { LocationContext } from './LocationContext';
import NavBar from '../Components/NavBar';

const SearchEditDeleteLocation = () => {
  // const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const locationContext =useContext(LocationContext)
  // const { handleDelete } = useContext(LocationContext);
console.log(locationContext.locations)
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

  if ( locationContext.loading) {
    return <p>Loading...</p>;
  }

  if ( locationContext.error) {
    return <p>Error: {locationContext.error.message}</p>;
  }

  const onDeleteClick = (itemId) => {

    // Add your form submission logic here
    fetch(`http://127.0.0.1:5556/location/${itemId}`, {
       
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            // Add any other headers as needed
        },
        //  body: JSON.stringify(formData),
    })
        .then(response => response.json())
        .then(data => {
        
        locationContext.handleDelete(data)
            // Handle the response from the API
            console.log('Success:', data);
        })
        .catch(error => {
            // Handle errors
            console.error('Error:', error);
        });
};


  const filteredLocations = locationContext.locations.filter((location) =>
    location.locationName.toLowerCase().includes(searchTerm.toLowerCase())
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
            <th className="px-4 py-2">Location</th>
          </tr>
        </thead>



        <tbody>

          {filteredLocations.map((item, i) => (
            <tr key={i}>

              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.locationName}</td>

              <td className="border px-4 py-2">



                <Link
                  className="bg-blue-500 text-white px-2 py-1 mr-2"
                  to={`/edit-location/${item.id}`}
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

export default SearchEditDeleteLocation;