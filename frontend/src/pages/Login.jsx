import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";


const Login = () => {

const login = useAuthStore((state) => state.login);
const navigate = useNavigate();
const handleLogin = () => {

  console.log("Logging in...");
  
  login({
    id: 1,  
    name: "Harsh",
  });

  navigate("/");
};

return (
  <div>
    <h1>Login Page</h1>
    <p>Please click the button below to log in.</p>
    <button onClick={handleLogin}>
      Login
    </button>
  </div>
);
};

export default Login;

