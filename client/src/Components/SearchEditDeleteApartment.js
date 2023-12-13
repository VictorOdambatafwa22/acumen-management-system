import React, { useState, useEffect } from 'react';

const SearchEditDeleteApartment = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5556/apartments');
        const result = await response.json();
        setStudents(result.Apartments);
        console.log(result)
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }


  const handleDelete = (id) => {
    setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
  };

  const filteredStudents = students.filter((student) =>
    student.apartmentName.toLowerCase().includes(searchTerm.toLowerCase())
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
            <th className="px-4 py-2">Apartment</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Owner</th>

          </tr>
        </thead>



        <tbody>

          {filteredStudents.map((item) => (
            <tr key={item.id}>

              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.apartmentName}</td>
              <td className="border px-4 py-2">{item.location_id}</td>
              <td className="border px-4 py-2">{item.owner_id}</td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 text-white px-2 py-1 mr-2">
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>

  );
};

export default SearchEditDeleteApartment;