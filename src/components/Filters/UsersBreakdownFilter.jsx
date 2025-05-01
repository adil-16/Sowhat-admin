import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

const regions = ["Europe", "Asia", "Africa", "North America", "South America"];
const roles = [
  "UI/UX Designer",
  "Politician",
  "Manager",
  "Businessman",
  "Founder",
];

const UsersBreakdownFilter = ({ close, onApply }) => {
  const [gender, setGender] = useState("");
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);

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
      {/* Close Icon */}
      <button
        onClick={close}
        className="absolute top-2 right-2 text-gray-500 hover:text-black"
      >
        <IoMdClose size={20} />
      </button>

      <h3 className="text-lg font-semibold mb-5">Filter</h3>

      {/* Gender Dropdown */}
      <label className="block text-sm mb-1">Gender</label>
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="w-full border border-gray-300 rounded px-2 py-1 mb-4 text-sm"
      >
        <option value="">Select</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      {/* Region */}
      <h4 className="text-sm font-medium mb-1">Region</h4>
      <div className="flex flex-wrap gap-2 mb-4">
        {regions.map((region) => (
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

      {/* Role */}
      <h4 className="text-sm font-medium mb-1">Role</h4>
      <div className="flex flex-wrap gap-2 mb-4">
        {roles.map((role) => (
          <div
            key={role}
            className={`flex items-center text-sm px-2 py-1 rounded-full border cursor-pointer ${
              selectedRoles.includes(role)
                ? "bg-green-200 border-green-500"
                : "bg-gray-100"
            }`}
            onClick={() => toggleSelect(role, selectedRoles, setSelectedRoles)}
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

      {/* Buttons */}
      <div className="flex justify-between items-center">
        <button
          className="text-gray-600 text-sm border border-gray-300 rounded px-4 py-1 hover:bg-gray-100"
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          className="bg-cyan-400 text-white text-sm px-4 py-1 rounded hover:bg-cyan-500"
          onClick={handleApply}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default UsersBreakdownFilter;
