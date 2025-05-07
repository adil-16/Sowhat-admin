import React from "react";
import UserBreakdownTable from "../components/Tables/UsersBreakdownTable";

const UsersBreakdown = () => {
  return (
    <div className="bg-white rounded-lg p-4 overflow-x-auto">
      <UserBreakdownTable />
    </div>
  );
};

export default UsersBreakdown;
