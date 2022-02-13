import vue from '@vitejs/plugin-vue'
import ssr from 'vite-plugin-ssr/plugin'
import telefunc from 'telefunc/vite'

export default {
  plugins: [vue(), ssr(), telefunc()],
}
