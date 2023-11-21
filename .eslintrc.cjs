const path = require("path");

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: {
    react: { version: "18.2" },
    "import/resolver": {
      alias: {
        map: [
          ["@components", path.resolve(__dirname, "./src/components")],
          ["@pages", path.resolve(__dirname, "./src/pages")],
          ["@containers", path.resolve(__dirname, "./src/containers")],
          ["@context", path.resolve(__dirname, "./src/context")],
          ["@hooks", path.resolve(__dirname, "./src/hooks")],
        ],
        extensions: [".ts", ".js", ".jsx", ".json"],
      },
    },
  },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
