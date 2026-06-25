import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 border-r">
      <Link to="/">Dashboard</Link>
      <Link to="/members">Members</Link>
      <Link to="/settings">Settings</Link>
    </div>
  );
}

export default Sidebar;
