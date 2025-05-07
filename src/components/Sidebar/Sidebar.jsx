import { FaHome, FaUserAlt, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";

const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        {!isMobileMenuOpen && (
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 bg-black text-white rounded-md"
          >
            <FaBars size={40} />
          </button>
        )}
      </div>
      <div className="hidden lg:block fixed h-full bg-neutral-100 text-white w-64 p-4 space-y-6">
        <div className="flex items-center justify-center">
          <img
            src="/logo.svg"
            alt="User"
            className="h-auto w-44 object-contain"
          />
        </div>
        <div className="space-y-4">
          <div
            className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer ${
              currentPath === "/"
                ? "bg-black text-white"
                : "hover:bg-cyan-400 text-black font-semibold"
            }`}
            onClick={() => {
              navigate("/");
              setIsMobileMenuOpen(false);
            }}
          >
            <FaHome
              className={`text-xl ${
                currentPath === "/" ? "text-white" : "text-black"
              }`}
            />
            <span>Dashboard</span>
          </div>
          <div
            className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer ${
              currentPath.startsWith("/users")
                ? "bg-black text-white"
                : "hover:bg-primary text-black font-semibold"
            }`}
            onClick={() => {
              navigate("/users");
              setIsMobileMenuOpen(false);
            }}
          >
            <FaUserAlt
              className={`text-xl ${
                currentPath.startsWith("/users") ? "text-white" : "text-black"
              }`}
            />
            <span>Users</span>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <div className="absolute left-0 top-0 h-full bg-neutral-100 text-white w-64 p-4 space-y-6 z-50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <img
                  src="/logo.svg"
                  alt="User"
                  className="h-auto w-44 object-contain"
                />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-black"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div
                  className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer ${
                    currentPath === "/"
                      ? "bg-black text-white"
                      : "hover:bg-cyan-400 text-black font-semibold"
                  }`}
                  onClick={() => {
                    navigate("/");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <FaHome
                    className={`text-xl ${
                      currentPath === "/" ? "text-white" : "text-black"
                    }`}
                  />
                  <span>Dashboard</span>
                </div>
                <div
                  className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer ${
                    currentPath.startsWith("/users")
                      ? "bg-black text-white"
                      : "hover:bg-primary text-black font-semibold"
                  }`}
                  onClick={() => {
                    navigate("/users");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <FaUserAlt
                    className={`text-xl ${
                      currentPath.startsWith("/users")
                        ? "text-white"
                        : "text-black"
                    }`}
                  />
                  <span>Users</span>
                </div>
              </div>
            </div>

            {/* Footer Section */}
            <div className="flex items-center gap-3 border-t border-gray-300 pt-4 mt-4">
              <img
                src="/me.jpg"
                alt="User"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex flex-col leading-4 text-black">
                <span className="font-medium">Adil Masood</span>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
              <button
                onClick={handleLogout}
                className="ml-auto text-gray-500 hover:text-red-600"
              >
                <FaSignOutAlt size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
