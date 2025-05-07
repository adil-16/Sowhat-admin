import { useState, useEffect } from "react";
import StatCard from "../components/Cards/StatCard";
import RevenueChart from "../components/Charts/RevenueChart";
import UserSignupChart from "../components/Charts/UserSignupChart";
import PieChart from "../components/Charts/PieChart";
import Filters from "../components/Filters/PieChartFilter";
import RecentSignupTable from "../components/Tables/RecentSignupTable";
import api from "../utils/ApiService";

const Dashboard = () => {
  const [selectedFilter, setSelectedFilter] = useState("region");
  const [pieChartData, setPieChartData] = useState([]);
  // const data = breakdownData[selectedFilter];
  const [cardsData, setCardsData] = useState({
    enhanceUsersCount: 0,
    totalUserCount: 0,
    freeUserCount: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/admin-dashboard/cards`);
        if (response.status === 200) {
          setCardsData({
            enhanceUsersCount: response.data.cards.enhanceUsersCount,
            totalUserCount: response.data.cards.totalUserCount,
            freeUserCount: response.data.cards.freeUserCount,
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchPieData = async () => {
      try {
        const response = await api.get(
          `/admin-dashboard/userBreakDown?filter=${selectedFilter}`
        );
        if (response.data.success) {
          const rawData = response.data.userBreakdown;

          // Convert object to array
          const transformedData = Object.entries(rawData).map(
            ([name, value]) => ({
              name,
              value,
            })
          );

          setPieChartData(transformedData);
        }
      } catch (error) {
        console.error("Error fetching pie chart data:", error);
      }
    };

    fetchPieData();
  }, [selectedFilter]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
        <StatCard
          bg="bg-cyan-50"
          value={cardsData.enhanceUsersCount}
          label="Enhanced Users"
        />
        <StatCard
          bg="bg-white"
          value={cardsData.freeUserCount}
          label="Free Users"
        />
        <StatCard
          bg="bg-white"
          value={cardsData.totalUserCount}
          label="Total Users"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/2">
          <RevenueChart />
        </div>
        <div className="w-full lg:w-1/2 bg-white rounded-lg p-6 shadow-md border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Users Breakdown</h2>
            <Filters onChange={(val) => setSelectedFilter(val.toLowerCase())} />
          </div>
          <PieChart data={pieChartData} />
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
