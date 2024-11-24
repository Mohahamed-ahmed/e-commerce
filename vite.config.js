// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv';

dotenv.config()

dotenv.config();

// Access the environment variable from process.env
const apiUrl = process.env.VITE_API_URL;

console.log('API URL:', apiUrl);



export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: apiUrl, // your backend API
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // removes the /api prefix
      },
    },
  },
})

