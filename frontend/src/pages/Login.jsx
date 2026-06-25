import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { loginUser } from "../services/authService";


const Login = () => {

const login = useAuthStore((state) => state.login);
const navigate = useNavigate();

const handleLogin = async () => {
  try {
    const data = await loginUser({
      username: "emilys",
      password: "emilyspass",
    });

    login({
      user: data,
      token: data.accessToken,
    });

    navigate("/");
  } catch (error) {
    console.error(error);
  }
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

