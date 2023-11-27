/**
 * @description: 请求结果集
 */
export const ResultEnum = {
  SUCCESS: 200,
  ERROR: -1,
  TIMEOUT: 10042,
  TYPE: 'success',
};

/**
 * @description: 请求方法
 */
export const RequestEnum = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

/**
 * @description: 常用的 contentTyp 类型
 */
export const ContentTypeEnum = {
  JSON: 'application/json;charset=UTF-8',
  TEXT: 'text/plain;charset=UTF-8',
  FORM_URLENCODED: 'application/x-www-form-urlencoded;charset=UTF-8',
  FORM_DATA: 'multipart/form-data;charset=UTF-8',
};
