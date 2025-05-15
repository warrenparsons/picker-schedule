import { memo } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function ScheduleCard({ city, date, type }) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{city}</Typography>
        <Typography>{type} on {date}</Typography>
      </CardContent>
    </Card>
  );
}
export default memo(ScheduleCard);