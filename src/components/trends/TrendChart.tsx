import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TrendDataPoint {
  date: string;
  value: number;
}

interface TrendChartProps {
  data: TrendDataPoint[];
}

const TrendChart = ({ data }: TrendChartProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  console.log("Rendering chart with data:", data);

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            angle={-45}
            textAnchor="end"
            height={70}
          />
          <YAxis />
          <Tooltip
            labelFormatter={formatDate}
            formatter={(value: number) => [`${value}`, 'Interest']}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;