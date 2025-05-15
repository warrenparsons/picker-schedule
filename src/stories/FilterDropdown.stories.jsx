import FilterDropdown from '../components/FilterDropdown';

export default {
  title: 'Components/FilterDropdown',
  component: FilterDropdown,
};

export const Default = {
  args: {
    value: 'All',
    onChange: (value) => console.log('City selected:', value),
  },
};