import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VitePluginVueSetupExtend from 'vite-plugin-vue-setup-extend'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    VitePluginVueSetupExtend()
  ],
  server: {
    port: 8001
  }
})
