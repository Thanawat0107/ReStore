import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
//   base: "/cs66/react/s07/restore/",
//   build: {
//     outDir: "../API_Restore/wwwroot"
// },

})
