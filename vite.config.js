import { defineConfig } from 'vite'
import * as path from 'path'
import * as fs from 'fs'
import proxy from "./config/proxy"
import reactRefresh from '@vitejs/plugin-react-refresh'
import vitePluginImp from 'vite-plugin-imp'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'

process.env.BABEL_ENV = 'development';

// https://cn.vitejs.dev/config/
export default defineConfig({
  base: './', // index.html文件所在位置
  root: './', // js导入的资源路径，src
  // serve: 'production', // 环境，默认serve 时默认 'development'，build 时默认 'production'，遵循声明大于约定规范
  resolve: {
    alias: { // 别名
      "configs": path.resolve(__dirname, 'src/configs'),
      "components": path.resolve(__dirname, 'src/components'),
      "services": path.resolve(__dirname, 'src/services'),
      "pages": path.resolve(__dirname, 'src/pages'),
      "types": path.resolve(__dirname, 'src/types'),
      "utils": path.resolve(__dirname, 'src/utils'),
    },
  },
  server: {
    proxy: proxy, // 代理
  },
  build: {
    minify: false, // 是否进行压缩,boolean | 'terser' | 'esbuild',默认使用terser
    manifest: false, // 是否产出maifest.json
    sourcemap: false, // 是否产出soucemap.json
    outDir: 'build', // 产出目录
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

