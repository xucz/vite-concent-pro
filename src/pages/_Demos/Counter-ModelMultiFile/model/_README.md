
## model 定义目录
此目录可以copy到任意地方复用，copy后只需调整1点即可

- 修改 `./meta` 里的 `moduleName`值，防止注册重复的模块名

## 注意事项
如果是跨多个页面共享的model，推荐提升到 src/models下，任意页面的子组件都可以使用 `services/concent` 的 `useC2Mod`
接口来消费model
