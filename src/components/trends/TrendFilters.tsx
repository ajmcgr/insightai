import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const COUNTRIES = [
  { value: "us", label: "United States" },
  { value: "gb", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "fr", label: "France" },
  { value: "de", label: "Germany" },
  { value: "jp", label: "Japan" },
];

const TIME_RANGES = [
  { value: "past_hour", label: "Past hour" },
  { value: "past_day", label: "Past 24 hours" },
  { value: "past_week", label: "Past 7 days" },
  { value: "past_month", label: "Past 30 days" },
  { value: "past_90_days", label: "Past 90 days" },
  { value: "past_12_months", label: "Past 12 months" },
  { value: "5_years", label: "5 years" },
];

const DEVICES = [
  { value: "all", label: "All devices" },
  { value: "web", label: "Web" },
  { value: "mobile", label: "Mobile" },
  { value: "desktop", label: "Desktop" },
  { value: "tablet", label: "Tablet" },
];

interface TrendFiltersProps {
  country: string;
  timeRange: string;
  category: string;
  device: string;
  onCountryChange: (value: string) => void;
  onTimeRangeChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onDeviceChange: (value: string) => void;
}

const TrendFilters = ({
  country,
  timeRange,
  category,
  device,
  onCountryChange,
  onTimeRangeChange,
  onCategoryChange,
  onDeviceChange,
}: TrendFiltersProps) => {
  console.log("Rendering trend filters with values:", { country, timeRange, category, device });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Country</label>
        <Select value={country} onValueChange={onCountryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            {COUNTRIES.map((country) => (
              <SelectItem key={country.value} value={country.value}>
                {country.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Time Range</label>
        <Select value={timeRange} onValueChange={onTimeRangeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            {TIME_RANGES.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Category</label>
        <Select value={category} onValueChange={onCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {/* Using existing categories from CategoriesSelect component */}
            <SelectItem value="all">All categories</SelectItem>
            <SelectItem value="business">Business</SelectItem>
            <SelectItem value="entertainment">Entertainment</SelectItem>
            <SelectItem value="health">Health</SelectItem>
            <SelectItem value="science">Science</SelectItem>
            <SelectItem value="sports">Sports</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Device</label>
        <Select value={device} onValueChange={onDeviceChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select device" />
          </SelectTrigger>
          <SelectContent>
            {DEVICES.map((device) => (
              <SelectItem key={device.value} value={device.value}>
                {device.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TrendFilters;