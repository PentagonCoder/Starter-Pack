import { data, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { loginUser } from "../services/authService";
import { useForm } from "react-hook-form";

const Login = () => {

const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

const login = useAuthStore((state) => state.login);
const navigate = useNavigate();

const onSubmit = async (data) => {
  try {
    const res = await loginUser(data);

    login({
      user: res,
      token: res.accessToken,
    });

    navigate("/");
  } catch (error) {
    console.error(error);
  }
};

return (
  <div style={{ padding: "20px" }}>
    <h1>Login Page</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Username */}
        <div>
          <label htmlFor="username">Username:</label>
          <input
            placeholder="username"
            {...register("username", {
              required: "Username is required",
            })}
          />
          {errors.username && (
            <p style={{ color: "red" }}>
              {errors.username.message}
            </p>
          )}
        </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
            <p style={{ color: "red" }}>
              {errors.password.message}
            </p>
          )}
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  </div>
);
};

export default Login;

