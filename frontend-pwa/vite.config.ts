import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()]
});

// export default defineConfig(({ command, mode }) => {
//   const env = loadEnv(mode, process.cwd(), "");
//   return {
//     plugins: [react()],
//     define: {
//       process: import.meta,
//       "process.env.NODE_ENV": "development"
//       // If you want to exposes all env variables, which is not recommended
//       // 'process.env': env
//     }
//   };
// });
