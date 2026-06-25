import { useUsers } from "../hooks/useUsers";
import { useState, useMemo } from "react";

const Members = () => {
  const { users, loading, error } = useUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();

      const matchesSearch = fullName.includes(searchTerm.toLowerCase());

      const matchesGender =
        genderFilter === "" || user.gender?.toLowerCase() === genderFilter;

      return matchesSearch && matchesGender;
    });
  }, [users, searchTerm, genderFilter]);

  const handleSearchChange = (event) => {
    const { name, value } = event.target;

    if (name === "gender") {
      setGenderFilter(value);
    }
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;

  return (
    <div>
      <h1>Members Page</h1>
      <p>This is the members page.</p>

      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <label htmlFor="gender">Select gender:</label>
      <select
        id="gender"
        name="gender"
        value={genderFilter}
        onChange={handleSearchChange}
      >
        <option value="">choose gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Members;