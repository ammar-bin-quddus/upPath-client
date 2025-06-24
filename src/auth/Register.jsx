import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import UseAxiosPublic from "../hooks/useAxiosPublic";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isShow, setIsShow] = useState(false);

  const { handleRegister, handleGoogleLogin, setLoading, updateUser } =
    useAuth();
  const axiosPublic = UseAxiosPublic();
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setIsShow(!isShow);
  };

  const sendUserDataToDb = async (user) => {
    await axiosPublic.post("/auth/users", {
      name: user.name,
      email: user.email,
      password: user.password || "google",
    });
  };

  const onSubmit = async ({ name, email, password }) => {
    try {
      setLoading(true);

      // create user with firebase
      await handleRegister(email, password, name);

      // update user name
      await updateUser({ displayName: name });


      // save user to server
      await sendUserDataToDb({ name, email, password });
    } catch (error) {
      console.error("registration failed", error.message);
    } finally {
      setLoading(false);
      navigate("/");
    }
  };

  // register with google

  const handleGoogle = async () => {
    try {
      setLoading(true);

      // Sign in with Google
      const result = await handleGoogleLogin();
      const { displayName: name, email } = result.user;

      // Save user info in db
      await sendUserDataToDb({ name, email });
      navigate("/")
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
        <h1 className="text-center text-3xl font-bold mb-4">
          Registration Form
        </h1>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full border-b p-2 outline-none focus:border-b-2"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-4">
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
            {...register("password", {
              required: "Password is required",
              pattern: /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/,
            })}
            className="w-full border-b p-2 outline-none focus:border-b-2"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              Must have an Uppercase letter and Lowercase letter in the password
              also length must be at least 6 character
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
          Sign Up
        </button>
        <p className="font-semibold text-center mt-2">
          Already Have An Account ?{" "}
          <Link to="/login" className="text-red-500">
            Login
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

export default Register;
