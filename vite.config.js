import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    base: '/alma-reveillon-lp/',
    plugins: [react()],
});
