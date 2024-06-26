import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/server': {
        target: "http://connect-alumni-backend.vercel.app",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
