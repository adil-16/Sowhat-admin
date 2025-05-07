import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import api from "../../utils/ApiService";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const RevenueChart = () => {
  const [view, setView] = useState("Monthly");
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `/admin-dashboard/revenueChart?filter=${view}`
        );
        if (response.data.success) {
          const labels = response.data.userBreakdown.map(
            (entry) => entry.startDate
          );
          const data = response.data.userBreakdown.map((entry) => entry.count);
          setChartData({
            labels,
            datasets: [
              {
                label: "Revenue (£)",
                data,
                backgroundColor: "#01D3F9",
                borderRadius: 6,
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    };

    fetchData();
  }, [view]);

  const options = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          callback: (value) => `£${value}`,
        },
      },
    },
  };

  const getTextClasses = (type) =>
    type === view
      ? "text-black underline cursor-pointer"
      : "text-gray-500 hover:text-black cursor-pointer";

  return (
    <div className="bg-white rounded-lg p-6 w-full md:w-full shadow-md h-full border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Revenue Chart</h2>
        <div className="flex gap-4 text-sm font-medium">
          <span
            className={getTextClasses("Weekly")}
            onClick={() => setView("Weekly")}
          >
            Weekly
          </span>
          <span
            className={getTextClasses("Monthly")}
            onClick={() => setView("Monthly")}
          >
            Monthly
          </span>
          <span
            className={getTextClasses("Yearly")}
            onClick={() => setView("Yearly")}
          >
            Yearly
          </span>
        </div>
      </div>

      {chartData ? (
        <Bar data={chartData} options={options} />
      ) : (
        <div className="text-center text-gray-500 py-8">Loading chart...</div>
      )}
    </div>
  );
};

export default RevenueChart;
