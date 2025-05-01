import { useState } from "react";
import { usersbreakdown } from "../../utils/usersbreakdown";
import { GiSevenPointedStar } from "react-icons/gi";
import { FiFilter, FiArrowLeft } from "react-icons/fi";
import UsersBreakdownFilter from "../Filters/UsersBreakdownFilter";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

const UserBreakdownTable = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [filters, setFilters] = useState({
    gender: "",
    selectedRegions: [],
    selectedRoles: [],
  });

  const filteredUsers = usersbreakdown.filter((user) => {
    const genderMatch = filters.gender ? user.gender === filters.gender : true;
    const regionMatch =
      filters.selectedRegions.length > 0
        ? filters.selectedRegions.includes(user.region)
        : true;
    const roleMatch =
      filters.selectedRoles.length > 0
        ? filters.selectedRoles.includes(user.role)
        : true;

    return genderMatch && regionMatch && roleMatch;
  });

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
            <span className="font-bold text-black">{filteredUsers.length}</span>{" "}
            Results Found
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
              <th className="px-4 py-2 text-left">Gender</th>
              <th className="px-4 py-2 text-left">Industry</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Region</th>
              <th className="px-4 py-2 text-left">Revenue Gained</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2 flex items-center gap-3">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  {user.name}
                </td>
                <td className="px-4 py-2">{user.gender}</td>
                <td className="px-4 py-2">{user.industry}</td>
                <td className="px-4 py-2">
                  {user.role.toLowerCase() === "enhanced" ? (
                    <span className="bg-cyan-400 px-2 py-1 rounded text-sm inline-flex items-center gap-1">
                      <GiSevenPointedStar />
                      <span>{user.role}</span>
                    </span>
                  ) : (
                    user.role
                  )}
                </td>
                <td className="px-4 py-2">{user.region}</td>
                <td className="px-4 py-2">${user.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserBreakdownTable;
