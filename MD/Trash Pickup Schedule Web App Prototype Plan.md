# Municipal Trash Pickup Schedule Web App Prototype Plan

## Overview
- **Goal**: Build a simple React web app to display municipal trash pickup schedules, showcasing React skills, a component library, testing, and performance optimization for your Ensemble Health Partners interview on May 20, 2025.
- **Purpose**: Demonstrate proficiency in React, Material UI, Storybook, Jest, Playwright, and Vite, aligning with the job’s requirements (design systems, front-end standards, UX/UI collaboration, modernization).
- **Time**: ~10-12 hours, spread across May 16–19, 2025.
- **MVP Features**:
  - Home page: List of trash pickup schedules (date, type: trash/recycling).
  - Filter by location: Dropdown to filter by city (mock data).
  - Responsive UI: Accessible design with Material UI.
  - Component library: 2-3 reusable components in Storybook.
  - Testing: Unit tests (Jest) and one E2E test (Playwright).
- **Tech Stack**:
  - Frontend: React, Material UI (with Emotion), React Router.
  - Build Tool: Vite.
  - Component Library: Storybook.
  - Testing: Jest, Playwright.
  - Performance: Google Lighthouse.
  - Data: Mock JSON (`src/data/schedules.json`).

## Step-by-Step Plan

### Total Time: ~10-12 hours, May 16–19, 2025

### 1. Project Setup (1 hour, Friday, May 16)
- **Tasks**:
  - Initialize a React project with Vite:
    ```bash
    npm create vite@latest trash-schedule-app -- --template react
    cd trash-schedule-app
    npm install
    ```
  - Install dependencies:
    ```bash
    npm install @mui/material @emotion/react @emotion/styled react-router-dom
    npx storybook@latest init
    npm install --save-dev @testing-library/react @testing-library/jest-dom @playwright/test
    ```
  - Create `src/data/schedules.json`:
    ```json
    [
      { "id": 1, "city": "Boston", "date": "2025-05-21", "type": "Trash" },
      { "id": 2, "city": "Boston", "date": "2025-05-22", "type": "Recycling" },
      { "id": 3, "city": "Cambridge", "date": "2025-05-21", "type": "Trash" }
    ]
    ```
  - Verify setup: Run `npm run dev` and check localhost.
- **Outcome**: Project scaffolded with Vite, dependencies installed, mock data ready.

### 2. Build Core Components (3 hours, Saturday, May 17)
- **Tasks**:
  - Create reusable components in `src/components/`:
    - `Button.jsx`: Customizable (primary/secondary, disabled), styled with Material UI.
      ```jsx
      import { styled } from '@emotion/styled';
      import MUIButton from '@mui/material/Button';

      const CustomButton = styled(MUIButton)(({ theme }) => ({
        textTransform: 'none',
        '&:disabled': { opacity: 0.6 },
      }));

      function Button({ children, variant = 'contained', ...props }) {
        return <CustomButton variant={variant} {...props}>{children}</CustomButton>;
      }
      export default Button;
      ```
    - `ScheduleCard.jsx`: Displays a schedule (city, date, type).
      ```jsx
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
      export default ScheduleCard;
      ```
    - `FilterDropdown.jsx`: Dropdown to select city.
      ```jsx
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
      ```
  - Ensure accessibility: Add ARIA labels (e.g., `aria-label="City filter"` on `Select`), test keyboard navigation.
  - Set up Storybook stories in `src/stories/`:
    - Example for `Button`:
      ```jsx
      import Button from '../components/Button';
      export default { title: 'Button', component: Button };
      export const Primary = { args: { variant: 'contained', children: 'Click Me' } };
      export const Secondary = { args: { variant: 'outlined', children: 'Click Me' } };
      ```
    - Create similar stories for `ScheduleCard` and `FilterDropdown`.
  - Run Storybook: `npm run storybook` and verify components display.
- **Outcome**: 2-3 reusable, accessible components with Storybook documentation.

### 3. Build App Structure (3 hours, Saturday, May 17)
- **Tasks**:
  - Set up React Router in `src/App.jsx`:
    ```jsx
    import { BrowserRouter, Routes, Route } from 'react-router-dom';
    import Home from './pages/Home';

    function App() {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      );
    }
    export default App;
    ```
  - Create `src/pages/Home.jsx` to display schedules and filter:
    ```jsx
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
    ```
  - Style with Material UI’s `sx` prop for responsive layout (e.g., `Grid` or `Box`).
  - Test responsiveness: Check on desktop and mobile views (`npm run dev`).
- **Outcome**: Functional app with routing, data display, and filtering.

### 4. Testing (2 hours, Sunday, May 18)
- **Tasks**:
  - **Jest**: Write unit tests in `src/components/__tests__/`:
    - For `Button`:
      ```jsx
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
      ```
    - For `ScheduleCard`:
      ```jsx
      import { render, screen } from '@testing-library/react';
      import ScheduleCard from '../ScheduleCard';

      test('renders schedule data', () => {
        render(<ScheduleCard city="Boston" date="2025-05-21" type="Trash" />);
        expect(screen.getByText('Boston')).toBeInTheDocument();
        expect(screen.getByText(/Trash on 2025-05-21/i)).toBeInTheDocument();
      });
      ```
  - **Playwright**: Write an E2E test in `tests/e2e.spec.js`:
    ```js
    const { test, expect } = require('@playwright/test');

    test('filters schedules by city', async ({ page }) => {
      await page.goto('http://localhost:3000');
      await page.selectOption('select', 'Boston');
      await expect(page.locator('text=Trash')).toBeVisible();
      await expect(page.locator('text=Cambridge')).not.toBeVisible();
    });
    ```
    - Initialize Playwright: `npx playwright install`.
    - Run tests: `npx playwright test`.
  - Verify tests pass: `npm test` for Jest, `npx playwright test` for Playwright.
- **Outcome**: Unit tests for components, one E2E test for filtering.

### 5. Performance Optimization (1 hour, Sunday, May 18)
- **Tasks**:
  - Build the app: `npm run build`.
  - Run Lighthouse: `npx lighthouse http://localhost:3000 --output html --output-path lighthouse-report.html`.
  - Optimize based on Lighthouse feedback:
    - Use `React.memo` for `ScheduleCard`:
      ```jsx
      import { memo } from 'react';
      function ScheduleCard({ city, date, type }) { /* ... */ }
      export default memo(ScheduleCard);
      ```
    - Ensure images (if any) are lazy-loaded or optimized.
    - Minify assets via Vite’s default build.
  - Aim for Lighthouse scores >90 for performance and accessibility.
  - Document 1-2 optimizations (e.g., “Added `React.memo` to prevent re-renders”).
- **Outcome**: Optimized app with documented performance improvements.

### 6. Finalize and Review (1-2 hours, Monday, May 19)
- **Tasks**:
  - Run Storybook (`npm run storybook`) and verify component documentation.
  - Test app responsiveness and accessibility (e.g., screen reader, keyboard navigation).
  - Prepare a 1-2 minute interview explanation:
    - Tech stack: React, Material UI, Vite, Storybook, Jest, Playwright.
    - Why this design: Simple, accessible, reusable components.
    - Challenges overcome: E.g., setting up Playwright or optimizing Lighthouse score.
    - Job relevance: Demonstrates design systems, testing, and React expertise.
  - Optionally, host the app locally or on a free service (e.g., Netlify) to show in the interview.
- **Outcome**: Polished prototype ready to discuss in the interview.

## Project Structure
```
trash-schedule-app/
├── src/
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── FilterDropdown.jsx
│   │   ├── ScheduleCard.jsx
│   │   └── __tests__/
│   │       ├── Button.test.jsx
│   │       └── ScheduleCard.test.jsx
│   ├── data/
│   │   └── schedules.json
│   ├── pages/
│   │   └── Home.jsx
│   ├── stories/
│   │   ├── Button.stories.jsx
│   │   ├── FilterDropdown.stories.jsx
│   │   └── ScheduleCard.stories.jsx
│   ├── App.jsx
│   └── main.jsx
├── tests/
│   └── e2e.spec.js
├── public/
├── package.json
└── vite.config.js
```

## Interview Talking Points
- “I built a trash pickup schedule app to practice React and design systems, using Storybook to document reusable components like Button and ScheduleCard.”
- “I ensured accessibility with ARIA labels and tested with Jest and Playwright, aligning with your focus on quality.”
- “Using Lighthouse, I optimized to a 95+ performance score, which I’d apply to your component library.”
- “This project shows how I’d approach modernizing .NET MVC apps to React, starting with reusable components.”

## Notes
- **Scope**: Stick to MVP (home page, filter, 2-3 components). Avoid extras (e.g., auth, backend) to save time.
- **Data**: `src/data/schedules.json` simulates an API. Optionally, create a mock API function:
  ```jsx
  // src/utils/api.js
  import schedules from '../data/schedules.json';
  export const fetchSchedules = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return schedules;
  };
  ```
  Use in `Home.jsx`: `fetchSchedules().then(setData)`.
- **Accessibility**: Add ARIA labels, test keyboard navigation.
- **Time Management**: If short on time, prioritize components and Jest tests; Playwright can be simplified to one test.
- **Resources**:
  - React: https://react.dev/
  - Material UI: https://mui.com/
  - Storybook: https://storybook.js.org/
  - Jest: https://jestjs.io/
  - Playwright: https://playwright.dev/
  - Lighthouse: https://developers.google.com/web/tools/lighthouse

## Contingency Plan
- **If Time Runs Short**:
  - Build only the component library (Button, ScheduleCard) with Storybook and Jest tests (~6 hours).
  - Skip Playwright or full app routing.
  - Focus on explaining component reusability and testing in the interview.
- **If Stuck**:
  - Review Material UI’s styling guide for Emotion: https://mui.com/material-ui/guides/styling/
  - Check Storybook setup: https://storybook.js.org/docs/react/get-started/install
  - Ask for specific code snippets or debugging help.