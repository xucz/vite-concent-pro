import modelDesc from './meta';
import { configure } from 'concent';

/**
 * 使用 configure接口配置模块，此时不用在 src/models/index 里导出该模块到全局
 * 但是需要注意组件的 index文件 第一行代码写下
 * import './model';
 * 以便先触发模块配置过程后再安全的导入其他使用了该模块的组件
 * 如需在别的页面或者组件里可以使用名字配合 src/configs/useC2Mod
 * 函数来消费该模块的数据和调用该模块的方法，将模块提升到 src/models/index 文件导出即可
 */
configure(modelDesc);

export default modelDesc;
