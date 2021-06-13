import apiData from './apiData';

function getMockFnKey(method: string, url: string) {
  const [pureUrl] = url.split('?');
  return `${method} ${pureUrl}`;
};

function getMockResult(method: string, url: string) {
  const key = getMockFnKey(method, url);
  const result = apiData[key];
  return result;
};

function tryMockApi(method: string, url: string, data: any) {
  const result = getMockResult(method, url);
  if (result) {
    if (typeof result === 'function') return result(url, data);
    return result;
  }
  return null;
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
    hasMockedFn: (method: string, url: string) => {
      const key = getMockFnKey(method, url);
      return Object.prototype.hasOwnProperty.call(apiData, key);
    },
  };
};
