import { useUsers } from "../hooks/useUsers";


function Dashboard() {

  const { users, loading, error } = useUsers();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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