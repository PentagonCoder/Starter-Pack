import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Layout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1">
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;