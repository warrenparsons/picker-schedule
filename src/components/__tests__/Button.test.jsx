import { render, screen } from '@testing-library/react';
import Button from '../Button';

test('renders button with text', () => {
  render(<Button>Click Me</Button>);
  expect(screen.getByText('Click Me')).toBeInTheDocument();
});

test('is disabled when disabled prop is true', () => {
  render(<Button disabled>Click Me</Button>);
  expect(screen.getByText('Click Me')).toBeDisabled();
});