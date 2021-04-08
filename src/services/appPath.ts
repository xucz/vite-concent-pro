if(window.location.host === 'tnfe.github.io') {
  localStorage.setItem('someBaseNameKey', 'vite-concent-pro/');
}

const cachedAppName = localStorage.getItem('someBaseNameKey') || '';
const cachedApiHost = localStorage.getItem('someApiHostKey');

/**
 * 应用可能处于不同的basename下
 */
export function getBasename() {
  return cachedAppName || '';
}

export function getApiHost() {
  // 是本地调试机器，携带者端口号
  if (window.location.port !== '') return '';
  return cachedApiHost || '';
};

export function attachBasename(url: string) {
  return `/${getBasename()}${url}`;
}

/**
 * 通常用于下载链接的拼接
 * @param {*} url
 */
export function attachApiHost(url: string) {
  return `${getApiHost()}${url}`;
}

/**
 * 去掉basename之后的相对根路径
 * <basename>/xxx/yyy ---> /xxx/yyy
 */
export function getRelativeRootPath() {
  const { pathname } = window.location;
  const basename = getBasename();
  let targetPathname = pathname;

  if (basename) {
    // basename: xxx-app
    // pathname: /xxx-app/xxx or /xxx-app/xxx
    // 所以此处 startIdx 取 basename 长度加1
    const startIdx = basename.length + 1;
    targetPathname = pathname.substr(startIdx);
  }
  if (!targetPathname) targetPathname = '/';

  return targetPathname;
}
