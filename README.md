<p align="center">
   <img width="460" src="https://raw.githubusercontent.com/fantasticsoul/assets/master/c2pro/c2pro-banner.png">
</p>

## 概述
vite-concent-pro是一个帮用户整合[vite](https://cn.vitejs.dev/) + [concent](https://github.com/concentjs/concent) + [react](https://github.com/facebook/react) 相关生态库并内置了最佳实践指导的项目，以便提供给用户开箱即用的体验，包括但不局限于以下功能：
- 常用concent api示范
- model目录组织示范
- ts整合示范
- 测试用例书写示范

> 本项目使用vite开发与构建，同时也提供了基于webpack的[concent-pro](https://github.com/tnfe/concent-pro)版本，两者src源码一样

## 预览
[在线示例](https://tnfe.github.io/vite-concent-pro)
<br/>
![](https://raw.githubusercontent.com/fantasticsoul/assets/master/c2pro/ccpro4.png)
<br/>
![](https://raw.githubusercontent.com/fantasticsoul/assets/master/c2pro/ccpro5.png)
<br/>
![](https://raw.githubusercontent.com/fantasticsoul/assets/master/c2pro/ccpro6.png)

## 安装与运行
- 拉取项目代码
```bash
git clone git@github.com:tnfe/vite-concent-pro.git
cd vite-concent-pro
```
- 设置为个人的仓库地址
```
git remote set-url origin git@github.com:tnfe/vite-concent-pro.git
```

- 安装相关依赖
```bash
npm ci
```  

- 启动与调试项目
```bash
npm start 启动服务
npm run build 编译打包
npm run preview 预览打包后的代码
```

- 测试与格式校验
```bash
npm run test (jest测试)
npm run lint (eslint校验)
npm run lintfix (eslint修复)
```
- 代码提交与推送
```
git commit -am 'xxxx_msg' (触发 husky钩子 pre-commit: npm run lintfix)
git push (触发 husky钩子 pre-commit: npm run test)
```

## 添加页面
- 添加菜单与路由   
`src/configs/menus`里添加路由对应的菜单信息
- 添加路由页面    
`src/pages`目录下添加页面组件
> 可参考 `src/pages/_DemoTempalte`查看示例代码，启动项目后 访问 localhost:3000/template可以访问该组件页面


## 编码建议
1 pages里拆分的组件如不涉及到跨页面复用，推荐就近放置，如后期复用在移到`components/**`下
2 page模块状态推荐就近放置

## 技术栈
### 运行时依赖
* [react 16.13.1](https://github.com/facebook/react) 组件化编程ui基础库   
* [react-router v5](https://github.com/ReactTraining/react-router) react路由方案 
* [concent v2](https://github.com/concentjs/concent) 内置依赖收集，高性能、渐进式的react开发框架
* [react-router-concent v2](https://github.com/concentjs/react-router-concent) 桥接react-router和concent的中间库
* [ant-design v4](https://github.com/ant-design/ant-design) react基础ui组件库

### 开发依赖
* [vite 2.1.0](https://cn.vitejs.dev/) 下一代前端开发与构建工具  
* [create-react-app v3](https://github.com/facebook/create-react-app)   
* [mocker-api v1.13](https://github.com/jaywcjlove/mocker-api)    
* eslint
* typescript
* jest
* husky

## 根目录结构
```
|____config             # jest配置和vite.server的proxy代理配置   
|____build              # 打包产出目录
|____public             # 静态资源目录
|____src                # 项目源码
|____test               # 测试启动依赖
```

## src目录结构
```

|____index.tsx            # app入口文件
|____utils                # 通用的非业务相关工具函数集合（可以进一步按用途分类）
|____configs
| |____constant           # 各种常量定义处目录
| |____runConcent.ts      # 启动concent
| |____menus.ts           # 站点菜单配置(包含了路由)
| |____runConcent.js      # run concent script
| 
|____models               # [[business models(全局模块配置)]]
| |____index.js           # 如需全局各个组件共享的model，可提升到此处导出（model可就近放置也可放到models目录下）
| |____global             # [[ 一个标准的模块文件(可以copy到各处，只需修改meta里的模块名即可 ]]
| | |____index.ts         # 模型导出文件
| | |____reducer.ts       # 修改模块数据方法(可选)
| | |____computed.ts      # 模块数据的计算函数(可选)
| | |____watch.ts         # 模块数据的观察函数(可选)
| | |____lifecycle.ts     # 模块生命周期配置(可选)
| | |____state.ts         # 模块状态(必需)
| | |____meta.ts          # 模块元数据文件- 导出整个模块的描述对象、相关类型、钩子等
| |____...
| |
|____components           # [[多个页面复用的基础组件集合]]
| |____biz-dumb           # 业务相关展示型组件
| |____biz-smart          # 业务相关容器型组件
| |____dumb               # 非业务相关展示型组件（通常会基于UI库定制一些可复用组合）
| |____smart              # 非业务相关容器型组件（剥离了业务的容器组件可以沉淀到此，后期可单独发npm包共享）
|
|____pages                # [[router component]]
| |____PageFoo
|   |____ model           # 当前页面的model定义，方便就近打开就近查看（定义可见models/global）
|   |____ dumb            # 当前页面的一些业务笨组件（如果出现多个页面重用则可以进一步调整到components/dumb下）
|   |____ HeaderArea.tsx  
|   |____ BodyArea.tsx
|   |____ SearchArea.tsx
|   |____ index..tsx      # 页面组件导出文件，注意第一行需要 import ./model 触发model配置
|
|____types                # 类型定义目录
| |____store              # store相关的各种类型推导文件(这是一个固定的文件，无需用户改动)
| |____mods               # 模型推导辅助文件，无需用户修改
| |____ev-map             # 事件相关的类型定义
| |____domain             # 业务领域相关的对象类型定义，通常是后端返回的对象
| |____biz                # 其他一些全局通用的前端定义的对象类型
|
|
|____services             # [[services，涉及业务io相关、业务通用逻辑相关下沉到此处]]
| |____domain             # 领域模型相关服务
| | |____user
| | |____ticket
| |____common-func        # 和领域无关的基础业务函数集合
| |____http               # 其他业务基础服务
| |____...
```

## 浏览器兼容

Modern browsers and IE10.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --- | --- | --- | --- | --- |
| IE10, Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions |
