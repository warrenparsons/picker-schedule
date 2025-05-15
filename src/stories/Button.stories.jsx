import Button from '../components/Button';

export default {
  title: 'Components/Button',
  component: Button,
};

export const Primary = {
  args: { variant: 'contained', children: 'Click Me' },
};

export const Secondary = {
  args: { variant: 'outlined', children: 'Click Me' },
};