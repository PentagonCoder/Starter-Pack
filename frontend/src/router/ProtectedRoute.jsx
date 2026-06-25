import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";

function ProtectedRoute() {
  const user = useAuthStore((state) => state.user);
  console.log("ProtectedRoute: user =", user);

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;