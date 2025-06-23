import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { handleLogin, setLoading, handleGoogleLogin } = useAuth();

  const [isShow, setIsShow] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleShowPassword = () => {
    setIsShow(!isShow);
  };
  const onSubmit = async ({ email, password }) => {
    try {
      setLoading(true);

      // Attempt login with provided credentials
      await handleLogin(email, password);

      // Redirect to the original destination or home
      const redirectPath = location?.state?.from?.pathname || "/";
      navigate(redirectPath);
    } catch (err) {
      console.error("Login failed:", err.message || err.code);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setLoading(true);

      // Sign in with Google
      const result = await handleGoogleLogin();

      // Redirect to the original destination or home
      const redirectPath = location?.state?.from?.pathname || "/";
      navigate(redirectPath);
    } catch (err) {
      console.error("Google login failed:", err.message || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-white p-5 rounded-md shadow-xl"
      >
        <h1 className="text-center text-3xl font-bold">Login Form</h1>
        <div className="my-4">
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full border-b p-2 outline-none focus:border-b-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4 relative">
          <label className="block mb-1 font-semibold">Password</label>
          <input
            type={isShow ? "text" : "password"}
            {...register("password", { required: "Password is required" })}
            className="w-full border-b p-2 outline-none focus:border-b-2"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
          <div
            onClick={handleShowPassword}
            className="absolute text-xl right-3 top-[42px]"
          >
            {isShow ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
        <p className="font-semibold text-center mt-2">
          Already Have An Account ?{" "}
          <Link to="/signup" className="text-red-500">
            Sign Up
          </Link>
        </p>
        <div className="mt-2 flex items-center gap-3 justify-center">
          <span className="text-xl">Sign Up with</span>{" "}
          <button
            onClick={handleGoogle}
            className="bg-gray-100 p-2 active:scale-105 transition-transform text-2xl rounded-full hover:bg-gray-300"
          >
            <FcGoogle />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
