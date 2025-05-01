const ColorIndicator = ({ filter }) => {
  const filterColors = {
    Region: "#0088FE",
    Gender: "#00C49F",
    Role: "#FFBB28",
    "Subscription Type": "#FF8042",
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className="w-4 h-4 rounded-full"
        style={{ backgroundColor: filterColors[filter] }}
      ></div>
      <span className="text-sm text-gray-700">{filter}</span>
    </div>
  );
};

export default ColorIndicator;
