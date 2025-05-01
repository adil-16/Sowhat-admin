/* eslint-disable react/prop-types */
import { useState } from "react";

const FilterDropdown = ({ onChange }) => {
  const [selectedFilter, setSelectedFilter] = useState("Region");

  const handleChange = (event) => {
    setSelectedFilter(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="filter" className="text-sm text-gray-600">
        Filter By:
      </label>
      <select
        id="filter"
        value={selectedFilter}
        onChange={handleChange}
        className="border rounded p-2 text-sm"
      >
        <option value="Region">Region</option>
        <option value="Gender">Gender</option>
        <option value="Role">Role</option>
        <option value="Subscription Type">Subscription Type</option>
      </select>
    </div>
  );
};

export default FilterDropdown;
