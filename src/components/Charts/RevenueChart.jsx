import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const RevenueChart = () => {
  const [view, setView] = useState("monthly");

  const revenueData = {
    weekly: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      data: [200, 300, 400, 500, 600],
    },
    monthly: {
      labels: ["December", "January", "February", "March", "April"],
      data: [3000, 4200, 3900, 4500, 4890],
    },
    yearly: {
      labels: ["2020", "2021", "2022", "2023", "2024"],
      data: [18000, 22000, 25000, 30000, 45890],
    },
  };

  const chartData = {
    labels: revenueData[view].labels,
    datasets: [
      {
        label: "Revenue (£)",
        data: revenueData[view].data,
        backgroundColor: "#0f172a",
        borderRadius: 6,
      },
    ],
  };

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
    <div className="bg-white rounded-lg p-6 w-full md:w-full shadow-md h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Revenue Chart</h2>
        <div className="flex gap-4 text-sm font-medium">
          <span
            className={getTextClasses("weekly")}
            onClick={() => setView("weekly")}
          >
            Weekly
          </span>
          <span
            className={getTextClasses("monthly")}
            onClick={() => setView("monthly")}
          >
            Monthly
          </span>
          <span
            className={getTextClasses("yearly")}
            onClick={() => setView("yearly")}
          >
            Yearly
          </span>
        </div>
      </div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default RevenueChart;
