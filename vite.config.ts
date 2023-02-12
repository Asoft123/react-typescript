import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      "@/assets": path.resolve(__dirname, './src/assets'),
      "@/ascomponentssets": path.resolve(__dirname, './src/components'),
      "@/mobx": path.resolve(__dirname, './src/mobx'),
      "@/interfaces": path.resolve(__dirname, './src/interfaces'),
      "@/pages": path.resolve(__dirname, './src/pages'),
      "@/utils": path.resolve(__dirname, './src/utils')
    },
  },
  plugins: [react(), tsconfigPaths()],
  // resolve:{
  //       alias:{
  //       "@/assets": path.resolve(__dirname, './assets'),
  //       "@/ascomponentssets": path.resolve(__dirname, './components'),
  //       "@/mobx": path.resolve(__dirname, './mobx'),
  //       "@/interfaces": path.resolve(__dirname, './interfaces'),
  //       "@/pages": path.resolve(__dirname, './pages'),
  //       "@/utils": path.resolve(__dirname, './utils'),
  //       }
  // },

})
