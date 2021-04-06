import apiData from './apiData';

function tryMockApi(method: string, url: string, data: any) {
  const [pureUrl] = url.split('?');
  const key = `${method} ${pureUrl}`;
  const result = apiData[key];
  if (result) {
    if (typeof result === 'function') return result(url, data);
    return result;
  }
  return {};
}

/**
 * 既提供给jest使用，也提供给应用处于 innerMock 模式运行时使用
 */
export function mockImpl() {
  return {
    get: (url: string, data: any) => {
      return tryMockApi('get', url, data);
    },
    post: (url: string, data: any) => {
      return tryMockApi('post', url, data);
    },
  };
};
