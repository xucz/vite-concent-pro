/**
 * 声明window里用户新增的属性，让ts编译通过
 */
interface SuperProfiler {
  new(): { container: any };
}

declare global {
  interface Window {
    _isPub: boolean;
    Raven: any;
    SuperProfiler: SuperProfiler;

    [key: string]: any;
  }
}
