import { useState } from "react";
import StatCard from "../components/Cards/StatCard";
import RevenueChart from "../components/Charts/RevenueChart";
import UserSignupChart from "../components/Charts/UserSignupChart";
import PieChart from "../components/Charts/PieChart";
import Filters from "../components/Filters/PieChartFilter";
import { breakdownData } from "../utils/BreakdownData";
import RecentSignupTable from "../components/Tables/RecentSignupTable";

const Dashboard = () => {
  const [selectedFilter, setSelectedFilter] = useState("Region");
  const data = breakdownData[selectedFilter];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
        <StatCard bg="bg-cyan-50" value="12,141" label="Enhanced Users" />
        <StatCard bg="bg-white" value="2,580" label="Free Users" />
        <StatCard bg="bg-white" value="$45,890" label="Total Users" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/2">
          <RevenueChart />
        </div>
        <div className="w-full lg:w-1/2 bg-white rounded-lg p-6 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Users Breakdown</h2>
            <Filters onChange={setSelectedFilter} />
          </div>
          <PieChart data={data} />
        </div>
      </div>

      <div className="mt-6">
        <UserSignupChart totalSignups={1245} />
      </div>
      <div className="mt-6">
        <RecentSignupTable />
      </div>
    </>
  );
};

export default Dashboard;
