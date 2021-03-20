import { defineConfig } from 'vite'
import * as path from 'path'
import * as fs from 'fs'
import proxy from "./config/proxy"
import reactRefresh from '@vitejs/plugin-react-refresh'
import vitePluginImp from 'vite-plugin-imp'

// https://cn.vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "configs": path.resolve(__dirname, 'src/configs'),
      "components": path.resolve(__dirname, 'src/components'),
      "services": path.resolve(__dirname, 'src/services'),
      "pages": path.resolve(__dirname, 'src/pages'),
      "types": path.resolve(__dirname, 'src/types'),
      "utils": path.resolve(__dirname, 'src/utils'),
    },
  },
  server: {
    proxy: proxy,
  },
  build: {
    minify: true,
    outDir: 'build',
  },
  plugins: [
    // react-refresh插件
    reactRefresh(),
    // 按需引用的插件
    vitePluginImp({
      libList: [
        {
          libName: "antd",
          style: (name) => {
            const less = fs.existsSync(path.resolve(__dirname, `node_modules/antd/es/${name}/style/index.less`))
            if (less) {
              return `antd/es/${name}/style/index.less`;
            } else {
              const css = fs.existsSync(path.resolve(__dirname, `node_modules/antd/es/${name}/style/css.js`))
              if (css) {
                return `antd/es/${name}/style/css.js`;
              } else {
                return false;
              }
            }
          },
          libDirectory: 'es',
        },
      ],
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
      }
    }
  },
})

