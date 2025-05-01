import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiCalendar } from "react-icons/fi";

const UserSignupChart = ({ totalSignups = 1000 }) => {
  const [startDate, setStartDate] = useState(new Date("2023-02-02"));
  const [endDate, setEndDate] = useState(new Date("2024-02-10"));
  const [showDatePicker, setShowDatePicker] = useState(false);

  const chartData = [
    { time: "9 AM", basic: 20, enhanced: 30 },
    { time: "10 AM", basic: 35, enhanced: 45 },
    { time: "10:30 AM", basic: 35, enhanced: 50 },
    { time: "11 AM", basic: 25, enhanced: 40 },
    { time: "11:30 AM", basic: 25, enhanced: 38 },
    { time: "12 PM", basic: 40, enhanced: 55 },
    { time: "12:30 PM", basic: 40, enhanced: 57 },
    { time: "1 PM", basic: 30, enhanced: 48 },
  ];

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">User Signups</h2>
          <p className="text-gray-500 text-sm">
            {totalSignups.toLocaleString()} total signups
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            {formatDate(startDate)} - {formatDate(endDate)}
          </span>
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="text-gray-500 hover:text-blue-600"
          >
            <FiCalendar size={18} />
          </button>
        </div>
      </div>

      {showDatePicker && (
        <div className="flex gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1">From</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="border rounded p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">To</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              className="border rounded p-2 text-sm"
            />
          </div>
        </div>
      )}

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 20,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              padding={{ left: 20, right: 20 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              domain={[0, "dataMax + 10"]}
              padding={{ top: 20, bottom: 5 }}
            />
            <Tooltip />
            <Line
              type="linear"
              dataKey="basic"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              activeDot={false}
            />
            <Line
              type="linear"
              dataKey="enhanced"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
              activeDot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Ensure this stays inside the container and doesn't overflow */}
      <div className="flex justify-center mt-4 space-x-6">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-blue-500 inline-block"></span>
          <span className="text-sm text-gray-700">Basic Signups</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-green-500 inline-block"></span>
          <span className="text-sm text-gray-700">Enhanced Signups</span>
        </div>
      </div>
    </div>
  );
};

export default UserSignupChart;
