import { render, screen } from '@testing-library/react';
import ScheduleCard from '../ScheduleCard';

test('renders schedule data', () => {
  render(<ScheduleCard city="Boston" date="2025-05-21" type="Trash" />);
  expect(screen.getByText('Boston')).toBeInTheDocument();
  expect(screen.getByText(/Trash on 2025-05-21/i)).toBeInTheDocument();
});