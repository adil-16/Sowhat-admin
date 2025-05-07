import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import api from "../../utils/ApiService";

const UsersBreakdownFilter = ({ close, onApply }) => {
  const [filters, setFilters] = useState({
    regions: [],
    roles: [],
  });
  const [gender, setGender] = useState("");
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFilters = async () => {
      setIsLoading(true);
      try {
        const res = await api.get("/admin-dashboard/getFilters");
        console.log(res.data);

        if (res.data.success) {
          setFilters(res.data.filters);
        }
      } catch (error) {
        console.error("Failed to fetch recent signups:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilters();
  }, []);

  const toggleSelect = (value, list, setList) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  const handleReset = () => {
    setGender("");
    setSelectedRegions([]);
    setSelectedRoles([]);
  };

  const handleApply = () => {
    onApply({ gender, selectedRegions, selectedRoles });
    close();
  };

  return (
    <div className="absolute top-full right-0 z-10 bg-white w-[320px] max-h-[400px] overflow-y-auto p-4 shadow-lg rounded-lg">
      <button
        onClick={close}
        className="absolute top-2 right-2 text-gray-500 hover:text-black"
      >
        <IoMdClose size={20} />
      </button>
      <h3 className="text-lg font-semibold mb-5">Filter</h3>
      <h4 className="text-sm font-medium mb-1">Region</h4>
      {isLoading ? (
        <p className="text-sm text-gray-500 mb-4">Loading regions...</p>
      ) : (
        <div className="flex flex-wrap gap-2 mb-4">
          {filters?.regions?.map((region) => (
            <div
              key={region}
              className={`flex items-center text-sm px-2 py-1 rounded-full border cursor-pointer ${
                selectedRegions.includes(region)
                  ? "bg-green-200 border-green-500"
                  : "bg-gray-100"
              }`}
              onClick={() =>
                toggleSelect(region, selectedRegions, setSelectedRegions)
              }
            >
              {region}
              {selectedRegions.includes(region) && (
                <IoMdClose
                  size={14}
                  className="ml-1 text-gray-600 hover:text-black"
                />
              )}
            </div>
          ))}
        </div>
      )}
      <h4 className="text-sm font-medium mb-1">Role</h4>
      {isLoading ? (
        <p className="text-sm text-gray-500 mb-4">Loading roles...</p>
      ) : (
        <div className="flex flex-wrap gap-2 mb-4">
          {filters?.roles?.map((role) => (
            <div
              key={role}
              className={`flex items-center text-sm px-2 py-1 rounded-full border cursor-pointer ${
                selectedRoles.includes(role)
                  ? "bg-green-200 border-green-500"
                  : "bg-gray-100"
              }`}
              onClick={() =>
                toggleSelect(role, selectedRoles, setSelectedRoles)
              }
            >
              {role}
              {selectedRoles.includes(role) && (
                <IoMdClose
                  size={14}
                  className="ml-1 text-gray-600 hover:text-black"
                />
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center">
        <button
          className="text-gray-600 text-sm border border-gray-300 rounded px-4 py-1 hover:bg-gray-100"
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          className="bg-primary text-white text-sm px-4 py-1 rounded hover:bg-cyan-500"
          onClick={handleApply}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default UsersBreakdownFilter;
