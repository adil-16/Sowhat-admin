const UserFilter = ({ setFilter, close }) => {
  return (
    <div className="absolute right-0 mt-2 bg-white border rounded shadow-md z-10">
      <button
        onClick={() => {
          setFilter("");
          close();
        }}
        className="px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
      >
        All
      </button>
      <button
        onClick={() => {
          setFilter("Basic");
          close();
        }}
        className="px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
      >
        Basic
      </button>
      <button
        onClick={() => {
          setFilter("Enhanced");
          close();
        }}
        className="px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
      >
        Enhanced
      </button>
    </div>
  );
};

export default UserFilter;
