
const cachedAppName = localStorage.getItem('someBaseNameKey') || '';
const cachedApiHost = localStorage.getItem('someApiHostKey');

/**
 * 应用可能处于不同的basename下
 */
export function getBasename() {
  const { hostname, pathname } = window.location;
  // concent-pro 站点走特殊的basename，以符合 gh-pages 目录结构
  if (hostname.includes('github.io') && pathname.includes('concent-pro')) return '';
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
 * 去掉basename之后的相对根路径，注不含search参数，等同于 location.pathname
 * <basename>/xxx/yyy ---> /xxx/yyy
 */
export function getRelativeRootPath() {
  const { pathname, hash } = window.location;
  const basename = getBasename();
  let targetPathname = pathname;
  if (hash.startsWith('#')) {
    // 取的应该是hash后面的那一段path
    targetPathname = extractPathAndSearch(hash.substr(1)).path;
  }

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

export function getSearchPath(path: string, search: string) {
  return search ? `${path}?${search}` : path;
}

/**
 * 返回的search字符串是无问号前缀的字符串
 * @param pathMayIncludeSearch
 * @returns
 */
export function extractPathAndSearch(pathMayIncludeSearch: string): { path: string, search: string } {
  if (!pathMayIncludeSearch) return { path: '', search: '' };

  const ensureNoStartQuestion = (stringMyStartsWithQuestion: string): string => {
    if (stringMyStartsWithQuestion.startsWith('?')) {
      const restStr = stringMyStartsWithQuestion.substr(1);
      return ensureNoStartQuestion(restStr);
    }
    return stringMyStartsWithQuestion;
  };

  const firstQuestionIdx = pathMayIncludeSearch.indexOf('?');
  let path = pathMayIncludeSearch;
  let search = '';
  if (firstQuestionIdx >= 0) {
    const stringMyStartsWithQuestion = pathMayIncludeSearch.substr(firstQuestionIdx);
    path = pathMayIncludeSearch.substring(0, firstQuestionIdx);
    // 防止是 /xxx/yyy ????a=1 这样的错误数据传进来
    search = ensureNoStartQuestion(stringMyStartsWithQuestion);
  }

  return { path, search };
}
