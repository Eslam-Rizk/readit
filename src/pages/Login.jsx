import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useUser } from "../contexts/userContext";
const apiUrl = import.meta.env.VITE_API_URL;

// Define schema using zod
const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    )
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter"),
});

function Login() {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data) => {
    setError(null);
    let res;
    try {
      res = await axios.post(`${apiUrl}/login`, {
        email: data.email,
        password: data.password,
      });
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user)); //save in localstorage for persistance
      reset();
      navigate("/");
    } catch {
      console.error(res);
      setError("Invalid email or password");
    }
  };

  useEffect(() => {
    return () => {
      toast.dismiss();
    };
  }, []);

  return (
    <div className="flex flex-col items-center mt-5">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form className="w-80" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="input input-bordered w-full"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="input input-bordered w-full"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        {error && (
          <p className="text-center text-red-500 m-1">
            Invalid email or password
          </p>
        )}
        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
