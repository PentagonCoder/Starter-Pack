import { useState, useEffect } from "react";
import api from "../api/axios";


function Dashboard() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data.users);
        console.log("Dashboard: API response =", response.data);
      } catch (error) {
        console.error("Dashboard: Error fetching data =", error);
      }
    };

    fetchData();
  }, []);

  
  return (
    <>
      <h1>Dashboard Page</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.firstName} {user.lastName}</li>
        ))}
      </ul>
    </>
  );
}

export default Dashboard;