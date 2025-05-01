import { useState } from "react";
import { FaHome, FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("dashboard");

  return (
    <div className="fixed h-full bg-neutral-100 text-white w-64 p-4 space-y-6">
      <div className="flex items-center justify-center">
        <img
          src="/logo.svg"
          alt="User"
          className=" h-auto w-44 object-contain"
        />
      </div>

      <div className="space-y-4">
        <div
          className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer ${
            activeLink === "dashboard"
              ? "bg-black text-white"
              : "hover:bg-cyan-400 text-black font-semibold"
          }`}
          onClick={() => {
            setActiveLink("dashboard");
            navigate("/");
          }}
        >
          <FaHome
            className={`text-xl ${
              activeLink === "dashboard" ? "text-white" : "text-black"
            }`}
          />
          <span>Dashboard</span>
        </div>
        <div
          className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer ${
            activeLink === "users"
              ? "bg-black text-white"
              : "hover:bg-cyan-400 text-black font-semibold"
          }`}
          onClick={() => {
            setActiveLink("users");
            navigate("/users");
          }}
        >
          <FaUserAlt
            className={`text-xl ${
              activeLink === "users" ? "text-white" : "text-black"
            }`}
          />
          <span>Users</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
