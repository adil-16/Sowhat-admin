import { useEffect, useState } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const getFormattedDate = () => {
  const today = new Date();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayName = days[today.getDay()];
  const monthName = months[today.getMonth()];
  const date = today.getDate();

  const getOrdinalSuffix = (n) => {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${dayName}, ${monthName} ${date}${getOrdinalSuffix(date)}`;
};

const AppLayout = () => {
  const [loading, isLoading] = useState(false);
  const navigation = useNavigation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const todayDate = getFormattedDate();

  useEffect(() => {
    if (navigation.state === "loading") {
      isLoading(true);
    } else {
      isLoading(false);
    }
  }, [navigation.state]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <div className="lg:ml-64 flex-1 p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-sm font-medium">{todayDate}</h1>
            <h1 className="text-2xl sm:text-3xl sm:text-center font-semibold">
              Good Morning, Admin
            </h1>
          </div>
          <div className="hidden md:flex bg-white px-4 py-2 rounded-lg items-center gap-3 border border-dashed border-gray-300 shadow-md">
            <img
              src="/me.jpg"
              alt="User"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="leading-4">
              <span className="font-medium text-gray-800">Adil Masood</span>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            <button
              onClick={handleLogout}
              className="ml-2 text-gray-500 hover:text-red-600"
            >
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
