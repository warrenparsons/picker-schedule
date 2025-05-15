/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    "../src/stories/**/*.mdx",
    "../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-essentials",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};
export default config;