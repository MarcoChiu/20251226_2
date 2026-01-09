import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  //不使用.env檔案，直接在此設定
  const basePath = isProduction ? '/20251226_2/' : '/';
  const apiBaseUrl = 'https://ec-course-api.hexschool.io/v2';
  const myPath = 'marcochiu';
  return {
    plugins: [react()],
    base: basePath,
    define: {
      'import.meta.env.BASE_PATH': JSON.stringify(basePath.replace(/\/$/, '')),
      'import.meta.env.API_BASE_URL': JSON.stringify(apiBaseUrl),
      'import.meta.env.MY_PATH': JSON.stringify(myPath),
    },
    server: {
      port: 5001
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin', 'color-functions', 'if-function'],
          quietDeps: true,
        },
      },
    }
  }
})
