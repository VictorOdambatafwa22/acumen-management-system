import React, { useState } from 'react';

const studentsData = [
    { id: 1, firstName: 'Victor', lastName: 'Odambatafwa', email: 'omondivictor120@gmail.com', phoneNumber: +25471305358 },
    { id: 2, firstName: 'John', lastName: 'Maluki', email: 'johnmaluki21@gmail.com', phoneNumber: +25471252544 },
    { id: 3, firstName: 'Arshavine', lastName: 'Waema', email: 'arshavinewaema10@gmail.com', phoneNumber: +25479874777 },
    { id: 4, firstName: 'Michelle', lastName: 'Mwangi', email: 'michellemwangi12@gmail.com', phoneNumber: +25471145542 },
    // Add more students as needed
  ];

const SearchEditDeleteTenant = () => {
   const [students, setStudents] = useState(studentsData);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = (id) => {
    setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
  };

  const filteredStudents = students.filter((student) =>
    student.firstName.toLowerCase().includes(searchTerm.toLowerCase())
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
          <th className="px-4 py-2">Firstname</th>
          <th className="px-4 py-2">Lastname</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Phone</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredStudents.map((student) => (
          <tr key={student.id}>
            <td className="border px-4 py-2">{student.id}</td>
            <td className="border px-4 py-2">{student.firstName}</td>
            <td className="border px-4 py-2">{student.lastName}</td>
            <td className="border px-4 py-2">{student.email}</td>
            <td className="border px-4 py-2">{student.phoneNumber}</td>
            <td className="border px-4 py-2">
              <button className="bg-blue-500 text-white px-2 py-1 mr-2">
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1"
                onClick={() => handleDelete(student.id)}
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

export default SearchEditDeleteTenant;