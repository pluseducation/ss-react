import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ResetTvRounded } from '@mui/icons-material'
import { replace } from 'formik'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: "/ss-react/",
  server: {
    proxy: {
      '/api': {
        // target: 'http://27.254.123.203:8444',
        // target: 'http://27.254.123.203:8442',
        target: 'http://8.213.210.28:8442',
        secure : false,
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/images': {
        // target: 'http://27.254.123.203:8444',
        // target: 'http://27.254.123.203:8443',
        target: 'http://8.213.210.28:8443',
        secure : false,
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  esbuild: {
    loader: 'jsx',
  }, 
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
        '.ts': 'tsx',
      },
    },
  },
})
