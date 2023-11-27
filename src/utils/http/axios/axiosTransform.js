/**
 * 数据处理类，可以根据项目自行配置
 */

export class AxiosTransform {
  /**
   * 请求之前处理配置
   */
  beforeRequestHook(config, options) {
    return config;
  }

  /**
   * 请求成功处理
   */
  transformRequestData(res, options) {
    return res;
  }

  /**
   * 请求失败处理
   */
  requestCatch(e) {
    return Promise.reject(e);
  }

  /**
   * 请求之前的拦截器
   */
  requestInterceptors(config, options) {
    return config;
  }

  /**
   * 请求之后的拦截器
   */
  responseInterceptors(res) {
    return res;
  }

  /**
   * 请求之前的拦截器错误处理
   */
  requestInterceptorsCatch(error) {
    // Handle interceptor errors here
  }

  /**
   * 请求之后的拦截器错误处理
   */
  responseInterceptorsCatch(error) {
    // Handle interceptor errors here
  }
}
