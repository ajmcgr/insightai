import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface TrendDataPoint {
  date: string;
  value: number;
  keyword?: string;
}

interface TrendChartProps {
  data: TrendDataPoint[];
}

const COLORS = ['#2563eb', '#dc2626', '#16a34a', '#9333ea', '#ea580c'];

const TrendChart = ({ data }: TrendChartProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
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
          <YAxis tickFormatter={formatValue} />
          <Tooltip
            labelFormatter={formatDate}
            formatter={(value: number) => [formatValue(value), 'Interest']}
          />
          <Legend />
          {data.map((series, index) => (
            <Line
              key={series.keyword || `trend-${index}`}
              type="monotone"
              dataKey="value"
              name={series.keyword || `Trend ${index + 1}`}
              stroke={COLORS[index % COLORS.length]}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;