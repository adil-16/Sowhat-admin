import { FaHome, FaUserAlt } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

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
          className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer ${currentPath === "/"
            ? "bg-black text-white"
            : "hover:bg-cyan-400 text-black font-semibold"
            }`}
          onClick={() => {
            navigate("/");
          }}
        >
          <FaHome
            className={`text-xl ${currentPath === "/" ? "text-white" : "text-black"
              }`}
          />
          <span>Dashboard</span>
        </div>
        <div
          className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer ${currentPath.startsWith("/users")
            ? "bg-black text-white"
            : "hover:bg-primary text-black font-semibold"
            }`}
          onClick={() => navigate("/users")}
        >
          <FaUserAlt
            className={`text-xl ${currentPath.startsWith("/users") ? "text-white" : "text-black"
              }`}
          />
          <span>Users</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
