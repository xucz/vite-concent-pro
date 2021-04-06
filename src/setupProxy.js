/* eslint-disable */

/**
 *  配置 proxy, 代理到本地启动的mocker服务
 *  这份文件是CRA读取的，不属于项目打包后会包含的代码，所以非ts后缀
*/
const { createProxyMiddleware: proxy }  = require('http-proxy-middleware');

// 来自于webpack-api-mocker提供的服务
const mockerHost = 'http://localhost:3721/';
const localServerHost = 'http://localhost:7777/';

/** demo options
{
  target: 'http://127.0.0.1:7001',
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  pathRewrite: {
    '^/custom': ''
}
 */

// 根据实际情况代理请求到不同的api域名下
module.exports = function (app) {
  // 以下走mock 或者 local
  app.use(proxy('/api/product/*', { target: localServerHost, changeOrigin: true, }));
  app.use(proxy('/api/stock/*', { target: localServerHost, changeOrigin: true, }));
  // 其他的走后端
  app.use(proxy('/api/*', { target: 'http://localhost:3001/' }));
  // 如有需要，可继续定义其他匹配规则
};
