import { useState, useEffect } from "react";
import { usersbreakdown } from "../../utils/usersbreakdown";
import { GiSevenPointedStar } from "react-icons/gi";
import { FiFilter, FiArrowLeft } from "react-icons/fi";
import UsersBreakdownFilter from "../Filters/UsersBreakdownFilter";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import api from "../../utils/ApiService";
import Pagination from "../Pagination/Pagination";

const UserBreakdownTable = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filters, setFilters] = useState({
    gender: "",
    selectedRegions: [],
    selectedRoles: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const params = {
          page: currentPage,
          limit: 10,
          region: filters.selectedRegions,
          role: filters.selectedRoles,
        };
        const res = await api.get("/admin-dashboard/recentSignUps", {
          params,
        });
        if (res.data.success) {
          setUsers(res.data.recentSignups);
          setTotalPages(res.data.totalPages || 1);
          setTotalUsers(res.data.totalCount || 0);
        }
      } catch (error) {
        console.error("Failed to fetch recent signups:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage, filters]);

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4 px-1">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-black"
            >
              <FiArrowLeft size={20} />
            </button>
            <h3 className="text-xl font-semibold">Users Breakdown</h3>
          </div>
          <h2 className="text-md text-gray-500">
            <span className="font-bold text-black">{totalUsers}</span> Results
            Found
          </h2>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="relative">
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className="text-gray-600 hover:text-black"
            >
              <FiFilter size={20} />
            </button>
            {showDropdown && (
              <UsersBreakdownFilter
                close={() => setShowDropdown(false)}
                onApply={(filters) => {
                  setFilters(filters);
                  setShowDropdown(false);
                }}
              />
            )}
          </div>

          <div className="flex flex-wrap gap-2 justify-end">
            {filters.gender && (
              <div className="bg-gray-200 text-sm px-2 py-1 rounded-full flex items-center gap-1">
                {filters.gender}
                <IoMdClose
                  className="cursor-pointer"
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, gender: "" }))
                  }
                />
              </div>
            )}

            {filters.selectedRegions.map((region) => (
              <div
                key={region}
                className="bg-gray-200 text-sm px-2 py-1 rounded-full flex items-center gap-1"
              >
                {region}
                <IoMdClose
                  className="cursor-pointer"
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      selectedRegions: prev.selectedRegions.filter(
                        (r) => r !== region
                      ),
                    }))
                  }
                />
              </div>
            ))}

            {filters.selectedRoles.map((role) => (
              <div
                key={role}
                className="bg-gray-200 text-sm px-2 py-1 rounded-full flex items-center gap-1"
              >
                {role}
                <IoMdClose
                  className="cursor-pointer"
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      selectedRoles: prev.selectedRoles.filter(
                        (r) => r !== role
                      ),
                    }))
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg p-6 shadow-md overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="border-b">
            <tr>
              <th className="px-4 py-2 text-left">Full Name</th>
              <th className="px-4 py-2 text-left">Industry</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Region</th>
              <th className="px-4 py-2 text-left whitespace-nowrap">
                Revenue Gained
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="py-8 text-center">
                  <div className="flex justify-center">
                    <div className="w-6 h-6 border-4 border-primary border-dashed rounded-full animate-spin"></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Loading users...</p>
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-500">
                  No results found.
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2 flex items-center gap-3 whitespace-nowrap">
                    {user.name.firstName} {user.name.lastName}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {user.industry}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {user?.role?.toLowerCase() === "enhanced" ? (
                      <span className="bg-cyan-400 px-2 py-1 rounded text-sm inline-flex items-center gap-1">
                        <GiSevenPointedStar />
                        <span>{user.role}</span>
                      </span>
                    ) : (
                      user.role
                    )}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">{user.region}</td>
                  <td className="px-4 py-2">£{user.revenue}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default UserBreakdownTable;
