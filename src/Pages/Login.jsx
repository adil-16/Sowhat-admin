import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/Loader/Loader";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const loginData = {
      email,
      password,
    };
    setLoading(true);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}auth/admin-login`,
        loginData
      );

      if (response.status === 200) {
        console.log(response.data.result.token);
        localStorage.setItem("token", response.data.result.token);
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
    }
    finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E5FAFF] relative">
      <div className="absolute top-10 right-12 text-lime-400 text-7xl">✸</div>
      <div className="absolute bottom-0 left-0 transform translate-x-1/2 -translate-y-1/2 text-lime-400 text-7xl z-10">
        ✸
      </div>

      <div className="bg-white rounded-xl px-8 py-10 w-full max-w-sm text-center shadow-md relative z-20">
        <div className="flex items-center justify-center mb-2">
          <img
            src="/logo.svg"
            alt="Logo"
            className="h-auto w-44 object-contain"
          />
        </div>

        <div className="rounded-md py-2 px-3 mb-4">
          <p className="text-sm text-black font-semibold">
            Login to Admin Panel
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Enter your credentials to login.
          </p>
        </div>
        <div className="text-left mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Andri@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-100 focus:outline-none"
          />
        </div>

        <div className="text-left mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="***********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-100 focus:outline-none"
          />
        </div>
        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-primary hover:bg-[#00aede] text-black font-semibold py-2 w-full rounded-md flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading ? <Loader /> : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
