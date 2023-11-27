import axios from 'axios';
import qs from 'qs';

import { isFunction } from '@/utils/is/index';

let pendingMap = new Map();

export const getPendingUrl = (config) =>
  [config.method, config.url, qs.stringify(config.data), qs.stringify(config.params)].join('&');

export class AxiosCanceler {
  addPending(config) {
    this.removePending(config);
    const url = getPendingUrl(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          pendingMap.set(url, cancel);
        }
      });
  }

  removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel();
    });
    pendingMap.clear();
  }

  removePending(config) {
    const url = getPendingUrl(config);

    if (pendingMap.has(url)) {
      const cancel = pendingMap.get(url);
      cancel && cancel(url);
      pendingMap.delete(url);
    }
  }

  reset() {
    pendingMap = new Map();
  }
}
