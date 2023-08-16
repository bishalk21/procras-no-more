/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// const env = require("dotenv").config().parsed;
import "dotenv/config";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  eslintConfig: {
    rules: {
      "no-unused-vars": "off",
      "react/prop-types": "off",
    },
  },
  env: {
    REACT_APP_API_ENDPOINT: "https://procras-no-more-api.vercel.app",
  },
});
