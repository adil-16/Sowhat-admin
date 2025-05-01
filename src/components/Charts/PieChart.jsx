import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const PieCharts = ({ data }) => {
  const COLORS = ["#8B0000", "#800080", "#ADD8E6", "#FFA07A"];

  return (
    <div className="flex flex-col md:flex-row items-start w-full">
      <div className="w-full md:w-1/2 h-[300px] md:h-[350px] lg:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="80%"
              labelLine={false}
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                percent,
              }) => {
                const RADIAN = Math.PI / 180;
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                return (
                  <text
                    x={x}
                    y={y}
                    fill="white"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={12}
                  >
                    {(percent * 100).toFixed(0)}%
                  </text>
                );
              }}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="md:ml-10 mt-6 md:mt-16 flex-1">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center mb-4">
            <div
              className="w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></div>
            <span className="text-sm text-gray-700">
              {entry.name}: {entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieCharts;
