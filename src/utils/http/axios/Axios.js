import axios from 'axios';
import { AxiosCanceler } from './axiosCancel';
import { isFunction } from '@/utils/is';
import { cloneDeep } from 'lodash-es';

import { ContentTypeEnum } from '@/enums/httpEnum';

export * from './axiosTransform';

/**
 * @description: axios模块
 */
export class VAxios {
  constructor(options) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.setupInterceptors();
  }

  getAxios() {
    return this.axiosInstance;
  }

  configAxios(config) {
    if (!this.axiosInstance) {
      return;
    }
    this.createAxios(config);
  }

  setHeader(headers) {
    if (!this.axiosInstance) {
      return;
    }
    Object.assign(this.axiosInstance.defaults.headers, headers);
  }

  request(config, options) {
    let conf = cloneDeep(config);
    const transform = this.getTransform();

    const { requestOptions } = this.options;

    const opt = Object.assign({}, requestOptions, options);

    const { beforeRequestHook, requestCatch, transformRequestData } = transform || {};
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt);
    }

    conf.requestOptions = opt;

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(conf)
        .then((res) => {
          const isCancel = axios.isCancel(res);
          if (transformRequestData && isFunction(transformRequestData) && !isCancel) {
            try {
              const ret = transformRequestData(res, opt);
              resolve(ret);
            } catch (err) {
              reject(err || new Error('request error!'));
            }
            return;
          }
          resolve(res);
        })
        .catch((e) => {
          if (requestCatch && isFunction(requestCatch)) {
            reject(requestCatch(e));
            return;
          }
          reject(e);
        });
    });
  }

  createAxios(config) {
    this.axiosInstance = axios.create(config);
  }

  getTransform() {
    const { transform } = this.options;
    return transform;
  }

  uploadFile(config, params) {
    const formData = new window.FormData();
    const customFilename = params.name || 'file';

    if (params.filename) {
      formData.append(customFilename, params.file, params.filename);
    } else {
      formData.append(customFilename, params.file);
    }

    if (params.data) {
      Object.keys(params.data).forEach((key) => {
        const value = params.data[key];
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item);
          });
          return;
        }

        formData.append(key, params.data[key]);
      });
    }

    return this.axiosInstance.request({
      method: 'POST',
      data: formData,
      headers: {
        'Content-type': ContentTypeEnum.FORM_DATA,
        ignoreCancelToken: true,
      },
      ...config,
    });
  }

  setupInterceptors() {
    const transform = this.getTransform();
    if (!transform) {
      return;
    }
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform;

    const axiosCanceler = new AxiosCanceler();

    this.axiosInstance.interceptors.request.use((config) => {
      const { headers: { ignoreCancelToken } } = config;
      const ignoreCancel = ignoreCancelToken !== undefined ?
        ignoreCancelToken :
        this.options.requestOptions?.ignoreCancelToken;

      !ignoreCancel && axiosCanceler.addPending(config);
      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config, this.options);
      }
      return config;
    }, undefined);

    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch);

    this.axiosInstance.interceptors.response.use((res) => {
      res && axiosCanceler.removePending(res.config);
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res);
      }
      return res;
    }, undefined);

    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch);
  }
}
