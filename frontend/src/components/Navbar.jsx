import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  console.log("Navbar: user =", user);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex justify-between p-4 border-b">
      <h2>Starter Pack</h2>

      <div className="flex gap-4">
        <span>
          {user?.firstName}
        </span>

        <button onClick={handleLogout}>
          Logout
        </button> 
      </div>
    </div>
  );
}

export default Navbar;      