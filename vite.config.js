import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true, // Карты исходного кода для отладки
  },
  server: {
    hmr: {
      overlay: false, // Отключает overlay для ошибок
    },
  },
});




