import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";

const schema = z
  .object({
    name: z.string().min(2, "Name is required"),
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
    confirmPassword: z.string().min(6, "Passwords do not match"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Dummy users data [TODO]: replace with real data
const dummyUsers = [
  { email: "test1@example.com", name: "Test One", password: "password1" },
  { email: "test2@example.com", name: "Test Two", password: "password2" },
];

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      // Check if email already exists
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/users`,
        { params: { email: data.email } }
      );
      if (res.data.length > 0) {
        setError("email", { type: "manual", message: "Email already exists" });
        return;
      }

      // Register user
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/register`, {
        name: data.name,
        email: data.email,
        password: data.password,
        avatar: "src/assets/images/default-avatar.jfif",
        createdAt: new Date()
      });

      toast.success("Registered Successfully!", {
        position: "bottom-right",
      });
      navigate("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration failed",
        { position: "bottom-right" }
      );
    }
  };

  return (
    <div className="flex flex-col items-center mt-5">
      <h1 className="text-3xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-80">
        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input
            className="input input-bordered w-full"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            className="input input-bordered w-full"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="input input-bordered w-full"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Confirm Password</label>
          <input
            type="password"
            className="input input-bordered w-full"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Register
        </button>
      </form>
    </div>
  );
}
