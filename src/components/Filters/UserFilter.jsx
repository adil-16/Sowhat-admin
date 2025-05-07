const UserFilter = ({ setFilter, close, filter }) => {
  return (
    <div className="absolute right-0 mt-2 bg-white border rounded shadow-md z-10">
      <button
        onClick={() => {
          setFilter("");
          close();
        }}
        className={`px-4 py-2 text-sm  ${
          filter == "" ? "bg-primary text-white" : "bg-white hover:bg-gray-100"
        }  w-full text-left`}
      >
        All
      </button>
      <button
        onClick={() => {
          setFilter("Free");
          close();
        }}
        className={`px-4 py-2 text-sm  ${
          filter == "Free"
            ? "bg-primary text-white"
            : "bg-white hover:bg-gray-100"
        }  w-full text-left`}
      >
        Free
      </button>
      <button
        onClick={() => {
          setFilter("Enhanced");
          close();
        }}
        className={`px-4 py-2 text-sm  ${
          filter == "Enhanced"
            ? "bg-primary text-white"
            : "bg-white hover:bg-gray-100"
        }  w-full text-left`}
      >
        Enhanced
      </button>
    </div>
  );
};

export default UserFilter;
