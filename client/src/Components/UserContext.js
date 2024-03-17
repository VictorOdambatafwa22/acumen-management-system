// StudentContext.js
import { createContext, useState ,useEffect} from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  function UpdateUser(updatedUser){
  const newUsers=users.map(user=>user.id===updatedUser.id?updatedUser:user)
  setUsers(newUsers)
  }

  const handleDelete = (itemId) => {
    // Implement the delete logic
    const updatedData = users.filter((item) => item.id !== itemId);
    setUsers(updatedData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://acumen-management-system.onrender.com/users');
        const result = await response.json();
        setUsers(result.Users);
        console.log(result)
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <UserContext.Provider value={{ users,loading,error,UpdateUser,handleDelete}}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };