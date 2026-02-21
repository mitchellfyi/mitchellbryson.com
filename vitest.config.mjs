import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./src/test/setup.js'],
    exclude: ['node_modules', 'e2e'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData.js',
        'src/app/**/*.jsx', // Exclude Next.js pages/layouts
      ],
      include: ['src/**/*.{js,jsx}'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), './src'),
      '@/components': path.resolve(process.cwd(), './src/components'),
      '@/lib': path.resolve(process.cwd(), './src/lib'),
      '@/app': path.resolve(process.cwd(), './src/app'),
    },
  },
})
