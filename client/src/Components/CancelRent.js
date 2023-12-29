import React, { useState, useContext } from 'react';
// import { Link } from 'react-router-dom'
import { PayRentContext } from './PayRentContext';

const CancelRent = () => {
  // const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const payrentContext =useContext(PayRentContext)
//   const { handleDelete } = useContext(TenantContext);
console.log(payrentContext.payrents)

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

  if ( payrentContext.loading) {
    return <p>Loading...</p>;
  }

  if ( payrentContext.error) {
    return <p>Error: {payrentContext.error.message}</p>;
  }


  const onDeleteClick = (itemId) => {

    // Add your form submission logic here
    fetch(`http://127.0.0.1:5556/payrent/${itemId}`, {
       
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            // Add any other headers as needed
        },
        //  body: JSON.stringify(formData),
    })
        .then(response => response.json())
        .then(data => {
        
            payrentContext.handleDelete(data)
            // Handle the response from the API
            console.log('Success:', data);
        })
        .catch(error => {
            // Handle errors
            console.error('Error:', error);
        });
};


//   const onDeleteClick = (itemId) => {
//     // Call the handleDelete function from the context
//     handleDelete(itemId);
//   };

  const filteredPayRents = payrentContext.payrents.filter((payrent) =>
  payrent.mpesaCode.toLowerCase().includes(searchTerm.toLowerCase())

  );

  return (
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
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">totalDue</th>
            <th className="px-4 py-2">amountPaid</th>
            <th className="px-4 py-2">balance</th>
            <th className="px-4 py-2">mpesaCode</th> 
            <th className="px-4 py-2">entryDate</th> 
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>



        <tbody>

          {filteredPayRents.map((item) => (
            <tr key={item.id}>

              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.tenant_id}</td>
              <td className="border px-4 py-2">{item.totalDue}</td>
              <td className="border px-4 py-2">{item.amountPaid}</td>
              <td className="border px-4 py-2">{item.balance}</td>
              <td className="border px-4 py-2">{item.mpesaCode}</td>
              <td className="border px-4 py-2">{item.entryDate}</td>
              <td className="border px-4 py-2">

                {/* <Link
                  className="bg-blue-500 text-white px-2 py-1 mr-2"
                  to={`/edit-Tenant/${item.id}`}
                >
                  Edit
                </Link> */}

                <button
                  className="bg-red-500 text-white px-2 py-1"
                  onClick={() => onDeleteClick(item.id)}
                >
                  Cancel rent
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>

  );
};

export default CancelRent;