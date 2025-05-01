import { useEffect, useState } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AppLayout = () => {
  const [loading, isLoading] = useState(false);
  const navigation = useNavigation();
  const navigate = useNavigate();

  useEffect(() => {
    if (navigation.state === "loading") {
      isLoading(true);
    } else {
      isLoading(false);
    }
  }, [navigation.state]);

  return (
    <div className="min-h-screen flex font-sans">
      <Sidebar />
      <div className="ml-64 flex-1 bg-gray-50 p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-sm font-medium">Tuesday, April 29th</h1>
            <h1 className="text-2xl sm:text-3xl font-semibold">
              Good Morning, Admin
            </h1>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg flex items-center gap-3 shadow">
            <img
              src="/profile.jpg"
              alt="User"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="leading-4">
              <span className="font-medium text-gray-800">Adil Masood</span>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            <button onClick={() => navigate("/login")} className="ml-2 text-gray-500 hover:text-red-600">
              <FaSignOutAlt size={18} />
            </button>
          </div>
        </div>
        {loading ? <p>Loading....</p> : <Outlet />}
      </div>
    </div>
  );
};

export default AppLayout;
