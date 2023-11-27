import { warn } from '@/utils/log';
import { getAppEnvConfig } from '@/utils/env';

export const useGlobSetting = () => {
  const {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
    VITE_GLOB_PROD_MOCK,
    VITE_GLOB_IMG_URL,
  } = getAppEnvConfig();

  if (!/[a-zA-Z\_]*/.test(VITE_GLOB_APP_SHORT_NAME)) {
    warn(
      `VITE_GLOB_APP_SHORT_NAME 变量只能包含字符/下划线，请在环境变量中进行修改并重新运行。`
    );
  }

  // 获取全局配置
  const glob = {
    title: VITE_GLOB_APP_TITLE,
    apiUrl: VITE_GLOB_API_URL,
    shortName: VITE_GLOB_APP_SHORT_NAME,
    urlPrefix: VITE_GLOB_API_URL_PREFIX,
    uploadUrl: VITE_GLOB_UPLOAD_URL,
    prodMock: VITE_GLOB_PROD_MOCK,
    imgUrl: VITE_GLOB_IMG_URL,
  };
  return glob;
};
