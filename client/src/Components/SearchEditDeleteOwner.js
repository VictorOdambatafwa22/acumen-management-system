import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom'
import { OwnerContext } from './OwnerContext';
import NavBar from '../Components/NavBar';

const SearchEditDeleteOwner = () => {
  // const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const ownerContext =useContext(OwnerContext)
  // const { handleDelete } = useContext(OwnerContext);
console.log(ownerContext.owners)
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

  if ( ownerContext.loading) {
    return <p>Loading...</p>;
  }

  if ( ownerContext.error) {
    return <p>Error: {ownerContext.error.message}</p>;
  }



  const onDeleteClick = (itemId) => {

    // Add your form submission logic here
    fetch(`http://127.0.0.1:5556/owner/${itemId}`, {
       
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            // Add any other headers as needed
        },
        //  body: JSON.stringify(formData),
    })
        .then(response => response.json())
        .then(data => {
        
        ownerContext.handleDelete(data)
            // Handle the response from the API
            console.log('Success:', data);
        })
        .catch(error => {
            // Handle errors
            console.error('Error:', error);
        });
};

  const filteredOwners = ownerContext.owners.filter((owner) =>
    owner.firstName.toLowerCase().includes(searchTerm.toLowerCase())||
    owner.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    owner.email.toLowerCase().includes(searchTerm.toLowerCase())||
    owner.phoneNumber.toString().includes(searchTerm)
  );

  return (
    <>
    {<NavBar />}
    <div className="container mx-auto p-4">
      <input
        type="text"
        placeholder="Search by any field..."
        className="mb-4 p-2 border border-gray-300 rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Firstname</th>
            <th className="px-4 py-2">Lastname</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>



        <tbody>

          {filteredOwners.map((item) => (
            <tr key={item.id}>

              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.firstName}</td>
              <td className="border px-4 py-2">{item.lastName}</td>
              <td className="border px-4 py-2">{item.email}</td>
              <td className="border px-4 py-2">{item.phoneNumber}</td>
              <td className="border px-4 py-2">

                <Link
                  className="bg-blue-500 text-white px-2 py-1 mr-2"
                  to={`/edit-owner/${item.id}`}
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

export default SearchEditDeleteOwner;