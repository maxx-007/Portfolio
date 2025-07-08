import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          'three-bundle': ['three', '@react-three/fiber', '@react-three/drei'],
          'react-bundle': ['react', 'react-dom'],
          'effects-bundle': ['@react-three/postprocessing', 'postprocessing'],
          'animation-bundle': ['framer-motion']
        }
      }
    },
    target: ['es2015'],
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei'],
    esbuildOptions: {
      target: 'es2015'
    }
  }
})