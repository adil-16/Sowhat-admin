import { useState, useEffect, useCallback } from "react";
import { GiSevenPointedStar } from "react-icons/gi";
import { FiFilter, FiDownload } from "react-icons/fi";
import SearchBar from "../SearchBar/Searchbar";
import UserFilter from "../Filters/UserFilter";
import * as XLSX from "xlsx";
import api from "../../utils/ApiService";
import debounce from "lodash/debounce";
import Pagination from "../Pagination/Pagination";

const RecentSignupTable = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [debouncedFilter, setDebouncedFilter] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const fetchUsers = useCallback(async (search, filterVal, page = 1) => {
    setIsLoading(true);
    setNoResults(false);
    try {
      const res = await api.get("/admin-dashboard/recentSignUps", {
        params: {
          page,
          limit: 10,
          plan: filterVal || undefined,
          search: search || undefined,
          sort: true,
        },
      });

      if (res.data.success) {
        const formatted = res.data.recentSignups.map((user) => ({
          name: `${user.name.firstName} ${user.name.lastName}`,
          email: user.email,
          phone:
            user?.contact?.code && user?.contact?.number
              ? `${user.contact.code} ${user.contact.number}`
              : "+44 0000000000",
          plan: user.plan || "Free",
          dateJoined: new Date(user.date).toLocaleDateString(),
        }));
        setUsers(formatted);
        setTotalPages(res.data.totalPages || 1);
        if (formatted.length === 0) setNoResults(true);
      }
    } catch (error) {
      console.error("Failed to fetch recent signups:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const debouncedFetch = useCallback(
    debounce((search, filterVal, page) => {
      fetchUsers(search, filterVal, page);
    }, 500),
    [fetchUsers]
  );

  useEffect(() => {
    debouncedFetch(searchTerm, filter, currentPage);
    setDebouncedSearch(searchTerm);
    setDebouncedFilter(filter);
  }, [searchTerm, filter, currentPage, debouncedFetch]);

  const handleDownload = () => {
    const dataToExport = users.map((user) => ({
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 px-1 gap-4">
        <h3 className="text-md md:text-2xl font-semibold">Recent Sign-ups</h3>
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
                filter={filter}
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
            {isLoading ? (
              <tr>
                <td colSpan="5" className="py-8 text-center">
                  <div className="flex justify-center">
                    <div className="w-6 h-6 border-4 border-primary border-dashed rounded-full animate-spin"></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Loading users...</p>
                </td>
              </tr>
            ) : noResults ? (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-500">
                  🔍 No results found for "<strong>{searchTerm}</strong>"
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2 flex items-center gap-3 whitespace-nowrap">
                    {user.name}
                  </td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{user.phone}</td>
                  <td className="px-4 py-2">
                    {user.plan.toLowerCase() === "enhanced" ? (
                      <span className="bg-primary px-2 py-1 rounded text-sm inline-flex items-center gap-1">
                        <GiSevenPointedStar />
                        <span>{user.plan}</span>
                      </span>
                    ) : (
                      user.plan
                    )}
                  </td>
                  <td className="px-4 py-2">{user.dateJoined}</td>
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

export default RecentSignupTable;
