/* eslint-disable */
import cute from 'cute-http';
import qs from 'qs';
import axios from 'axios';
import * as messageService from './message';
import * as objUtil from 'utils/obj';

// import resData from 'assets/response-data';

export interface IReqOptions {
  /**
   * default = true, 是否返回服务器端响应的业务逻辑数据给调用方
   * 服务器完整的返回数据reply形如：{data:any, code:string, msg:string},
   * true：返回reply.data
   * false：返回reply,
   */
  returnLogicData?: boolean,
  defaultValue?: any,
  /**
   * 是否检查服务返回code，并做错误提示
   * default = true
   */
  check?: boolean,
  /**
   * default = true
   * 当check为true时生效，是否alert提示错误信息
   */
  alertErrorMsg?: boolean,
}

type DataParams = Record<string, any> | null;

interface MultiItem {
  url: string;
  data: DataParams;
}

cute.setConfig({
  retryCount: 3, // 重试次数
  timeout: 50000, // 超时时间
  // debug: true, // 打开debug模式
});

const getXFormOptions = () => ({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  },
  withCredentials: true,
});
const generalOptions = {
  headers: {'Content-Type': 'application/json'},
  withCredentials: true,
  mockData: null as any,

  // replyReceived: (reply, m) => {
  //   // console.log('reply.config.url', reply.config.url);
  //   cute.post('/collectData', { data: reply.data, method: m, url: reply.config.url }, {
  //     headers: { 'Content-Type': 'application/json' },
  //     withCredentials: true,
  //   });
  // }
};

// 测试模式，拦截请求，直接响应mock数据
// if (process.env.TEST_MODE === '1') {
//   generalOptions.mockData = (method: string, url: string, inputData: any) => {
//     const key = `${method}${url}`;
//     // console.log(`return mock data for ${key}`);
//     return Promise.resolve({ data: resData[key] });
//   }
// }

function seperateOptions(options: any = {}) {
  const {
    returnLogicData, defaultValue = '', check = true, alertErrorMsg = true,
    failStrategy = cute.const.KEEP_ALL_BEEN_EXECUTED, ...cuteOptions
  } = options;
  // cute-http的调用相关可选参数
  cuteOptions.failStrategy = failStrategy;
  return {logicOptions: {returnLogicData, defaultValue, check, alertErrorMsg}, cuteOptions};
}

const checkCode = (axiosReply: any, url = '', checkOptions: IReqOptions = {}) => {
  const {returnLogicData = true, check = true} = checkOptions;

  const {statusCode = 0} = axiosReply;
  const httpResponse = axiosReply.data || axiosReply;

  if (statusCode >= 400) throw new Error(`服务器内部错误${statusCode}`);
  const {status = '0', message = '接口格式错误', response, code, data, msg} = httpResponse;
  const errMsg = msg || message;

  let toReturn = null;
  // 直接返回 axiosReply.data, 即服务器返回的原始数据
  if (!returnLogicData) {
    toReturn = httpResponse;
  } else {
    // 服务端返回的业务相关的数据
    toReturn = data || response;
  }

  if (!check) return toReturn;

  // 这里 status 和 code 都要判断......
  if (typeof status !== 'undefined' && status != '0') {
    const err = new Error(errMsg) as any;
    err.status = status;
    err.url = url;
    throw err;
  }

  if (typeof code !== 'undefined' && code != 0) {
    throw new Error(`url: ${url} ${errMsg}`);
  }

  return toReturn;
};

const attachPrefixAndData = (url: string, data: DataParams | '') => {
  const pureUrl = url.replace(/ /g, '');
  let prefixedUrl = `${pureUrl}`;

  // 此处可自定义一些其他规则修改 prefixedUrl
  // 例如通过 process.env.

  if (data) {
    if (pureUrl.includes('?')) return `${prefixedUrl}&${qs.stringify(data)}`;
    return `${prefixedUrl}?${qs.stringify(data)}`;
  }
  return prefixedUrl;
};

function handleError(error: any, options: any, defaultValue: any) {
  if (!defaultValue) {
    if (options.check && options.alertErrorMsg) messageService.error(error.message);
    throw error;
  }
  if (error && error.response && error.response.status >= 400) {
    messageService.error(`服务器内部错误 ${error.response.status}`);
  }

  // 返回默认值
  return defaultValue;
}

async function sendRequest(method: string, url: string, data?: DataParams, options = {}) {
  const {logicOptions, cuteOptions} = seperateOptions(options);
  const {returnLogicData, defaultValue = '', check = true} = logicOptions;

  try {
    const mergedOpt = {...generalOptions, ...cuteOptions};
    let reply;
    if (method === 'get') {
      reply = await cute[method](attachPrefixAndData(url, data || ''), '', mergedOpt);
    } else {
      reply = await cute[method](attachPrefixAndData(url, ''), data, mergedOpt);
    }

    return checkCode(reply, url, {returnLogicData, check});
  } catch (err) {
    return handleError(err, options, defaultValue);
  }
}

async function get(url: string, data?: DataParams, options?: IReqOptions) {
  return sendRequest('get', url, data, options);
}

async function post(url: string, body?: DataParams, options?: IReqOptions) {
  return sendRequest('post', url, body, options);
}

async function put(url: string, body?: DataParams, options?: IReqOptions) {
  return sendRequest('put', url, body, options);
}

/**
 * 以application/x-www-form-urlencoded的形式提交数据
 * TODO: 删除postFormData
 * @param {*} url
 * @param {*} data
 * @param {*} options
 */
async function sendXForm(method: string, url: string, data: DataParams, options = {}) {
  const {logicOptions, cuteOptions} = seperateOptions(options);
  const {returnLogicData, defaultValue = '', check = true} = logicOptions;
  try {
    const xFormOptions = getXFormOptions();
    const mergedOpt = {...xFormOptions, ...cuteOptions};

    let _data = data;
    if (objUtil.isObject(data)) {
      _data = {};
      for (let key in data) {
        const val = data[key];
        // x-www-form提交的话，对象 {} [] 都要转为string
        _data[key] = objUtil.isObject(val) ? JSON.stringify(val) : val;
      }
    }

    const reply = await cute[method](attachPrefixAndData(url, ''), qs.stringify(_data), mergedOpt);
    return checkCode(reply, url, {returnLogicData, check});
  } catch (err) {
    return handleError(err, options, defaultValue);
  }
}

async function xFormPost(url: string, data: DataParams, options = {}) {
  return sendXForm('post', url, data, options);
}

async function xFormPut(url: string, data: DataParams, options = {}) {
  return sendXForm('put', url, data, options);
}

async function multiGet(urls: string[], options: IReqOptions = {}) {
  const {logicOptions, cuteOptions} = seperateOptions(options);
  const {returnLogicData, defaultValue = '', check = true} = logicOptions;
  try {
    delete options.returnLogicData;
    const _urls = urls.map(url => attachPrefixAndData(url, ''));
    const replyList: any[] = await cute.multiGet(_urls, {...generalOptions, ...cuteOptions});
    return replyList.map((r, idx) => checkCode(r, _urls[idx], {returnLogicData, check}));
  } catch (err) {
    return handleError(err, options, defaultValue);
  }
}

async function multiPost(items: MultiItem[], options: IReqOptions = {}) {
  const {logicOptions, cuteOptions} = seperateOptions(options);
  const {returnLogicData, defaultValue = '', check = true} = logicOptions;

  try {
    delete options.returnLogicData;
    items.forEach(item => item.url = attachPrefixAndData(item.url, ''));
    const replyList: any[] = await cute.multiPost(items, {...generalOptions, ...cuteOptions});
    return replyList.map((r, idx) => checkCode(r, items[idx].url, {returnLogicData, check}));
  } catch (err) {
    return handleError(err, options, defaultValue);
  }
}

/**
 * 通常用于文件提交
 * Content-Type 为 multipart/form-data
 */
async function postFormData(url: string, data: DataParams, options: IReqOptions) {
  const {logicOptions, cuteOptions} = seperateOptions(options);
  const {returnLogicData, defaultValue = '', check = true} = logicOptions;
  const finalUrl = attachPrefixAndData(url, '');

  const formData = new FormData();
  data && Object.keys(data).forEach((key) => {
    const val = data[key];
    if (Object.prototype.hasOwnProperty.call(data, key) && !!data[key]) {
      if (val instanceof File) {
        formData.append(key, val);
      } else {
        const appendVal = objUtil.isObject(val) ? JSON.stringify(val) : val;
        formData.append(key, appendVal);
      }
    }
  });

  const instance = axios.create({withCredentials: true});

  try {
    const reply = await instance.post(finalUrl, formData, cuteOptions);
    return checkCode(reply, url, {returnLogicData, check});
  } catch (err) {
    return handleError(err, options, defaultValue);
  }
}

/**
 *
 * @param {string} url - 请求地址
 * @param {Record<string, any>} data - ost请求需要的参数
 */
function downloadFile(url: string, data: Record<string, any> = {}) {
  const form = document.createElement('form');
  form.style.display = 'none';
  form.action = url;
  form.method = 'post';
  document.body.appendChild(form);
  if (data) {
    // 动态创建input并给value赋值
    for (const key in data) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      const val = data[key];
      input.value = objUtil.isObject(val) ? JSON.stringify(val) : val;
      form.appendChild(input);
    }
  }
  form.submit();
  form.remove();
}

export default {
  downloadFile,
  get,
  put,
  post,
  xFormPost,
  xFormPut,
  postFormData,
  multiGet,
  multiPost,
};
