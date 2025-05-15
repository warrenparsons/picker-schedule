import { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import FilterDropdown from '../components/FilterDropdown';
import ScheduleCard from '../components/ScheduleCard';
import schedules from '../data/schedules.json';

function Home() {
  const [data, setData] = useState([]);
  const [city, setCity] = useState('All');

  useEffect(() => {
    setData(schedules); // Mock API
  }, []);

  const filteredData = city === 'All' ? data : data.filter((item) => item.city === city);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Trash Pickup Schedules</Typography>
      <FilterDropdown value={city} onChange={setCity} />
      {filteredData.map((item) => (
        <ScheduleCard key={item.id} {...item} />
      ))}
    </Container>
  );
}
export default Home;