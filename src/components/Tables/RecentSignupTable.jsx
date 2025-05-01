import { useState } from "react";
import { users } from "../../utils/user";
import { GiSevenPointedStar } from "react-icons/gi";
import { FiFilter, FiDownload } from "react-icons/fi";
import SearchBar from "../SearchBar/Searchbar";
import UserFilter from "../Filters/UserFilter";
import * as XLSX from "xlsx";

const RecentSignupTable = () => {
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredUsers = users.filter((user) => {
    const matchesFilter = filter
      ? user.plan.toLowerCase() === filter.toLowerCase()
      : true;
    const matchesSearch = searchTerm
      ? user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesFilter && matchesSearch;
  });

  const handleDownload = () => {
    const dataToExport = filteredUsers.map((user) => ({
      Name: user.name,
      Email: user.email,
      Phone: user.phone,
      Plan: user.plan,
      "Date Joined": user.dateJoined,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    XLSX.writeFile(workbook, "Recent_Signups.xlsx");
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4 px-1">
        <h3 className="text-xl font-semibold">Recent Sign-ups</h3>
        <div className="flex items-center gap-4">
          <SearchBar onSearch={setSearchTerm} />
          <div className="relative">
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className="text-gray-600 hover:text-black"
            >
              <FiFilter size={20} />
            </button>
            {showDropdown && (
              <UserFilter
                setFilter={setFilter}
                close={() => setShowDropdown(false)}
              />
            )}
          </div>
          <button
            onClick={handleDownload}
            className="text-gray-600 hover:text-black"
          >
            <FiDownload size={20} />
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg p-6 shadow-md overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="border-b">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone Number</th>
              <th className="px-4 py-2 text-left">Plan</th>
              <th className="px-4 py-2 text-left">Date Joined</th>
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
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.phone}</td>
                <td className="px-4 py-2">
                  {user.plan.toLowerCase() === "enhanced" ? (
                    <span className=" bg-cyan-400 px-2 py-1 rounded text-sm inline-flex items-center gap-1">
                      <GiSevenPointedStar />
                      <span>{user.plan}</span>
                    </span>
                  ) : (
                    user.plan
                  )}
                </td>
                <td className="px-4 py-2">{user.dateJoined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentSignupTable;
