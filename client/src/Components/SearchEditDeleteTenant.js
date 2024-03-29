import React, { useState, useEffect, useContext } from 'react';
import { Link,useNavigate } from 'react-router-dom'
import { TenantContext } from './TenantContext';
import NavBar from '../Components/NavBar';

const SearchEditDeleteTenant = () => {
  // const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const tenantContext =useContext(TenantContext)
  // const { handleDelete } = useContext(TenantContext);
console.log(tenantContext.tenants)
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

  if ( tenantContext.loading) {
    return <p>Loading...</p>;
  }

  if ( tenantContext.error) {
    return <p>Error: {tenantContext.error.message}</p>;
  }



  // const onDeleteClick = (itemId) => {
  //   // Call the handleDelete function from the context
  //   handleDelete(itemId);
  // };

  const filteredTenants = tenantContext.tenants.filter((tenant) =>
  tenant.firstName.toLowerCase().includes(searchTerm.toLowerCase())||
  tenant.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  tenant.email.toLowerCase().includes(searchTerm.toLowerCase())||
  tenant.phoneNumber.toString().includes(searchTerm)
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

          {filteredTenants.map((item) => (
            <tr key={item.id}>

              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.firstName}</td>
              <td className="border px-4 py-2">{item.lastName}</td>
              <td className="border px-4 py-2">{item.email}</td>
              <td className="border px-4 py-2">{item.phoneNumber}</td>
              <td className="border px-4 py-2">

                <Link
                  className="bg-blue-500 text-white px-2 py-1 mr-2"
                  to={`/edit-Tenant/${item.id}`}
                >
                  Edit
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

export default SearchEditDeleteTenant;