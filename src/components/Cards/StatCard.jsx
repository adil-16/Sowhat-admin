const StatCard = ({ bg, value, label }) => {
  return (
    <div className={`${bg} shadow-md rounded-lg p-6 w-full text-center`}>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      <div className="text-sm text-gray-500 mt-2">{label}</div>
    </div>
  );
};

export default StatCard;
