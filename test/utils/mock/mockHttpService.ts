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


// see https://stackoverflow.com/questions/64245013/difference-between-jest-mock-and-jest-domock
// jest.mock 有自动的全局提升效果，不能访问到 apiData，这里需要使用 jest.doMock
jest.doMock('../../../src/services/http', () => {
  return {
    get: (url: string, data: any) => {
      return tryMockApi('get', url, data);
    },
    post: (url: string, data: any) => {
      return tryMockApi('post', url, data);
    },
  };
});
