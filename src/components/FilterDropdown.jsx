import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function FilterDropdown({ value, onChange }) {
  const cities = ['All', 'Boston', 'Cambridge'];
  return (
    <FormControl sx={{ mb: 2, minWidth: 120 }}>
      <InputLabel>City</InputLabel>
      <Select value={value} onChange={(e) => onChange(e.target.value)} label="City">
        {cities.map((city) => (
          <MenuItem key={city} value={city}>{city}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
export default FilterDropdown;