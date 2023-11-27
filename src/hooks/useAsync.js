import { isReactive, isRef } from 'vue';

function setLoading(loading, val) {
  if (loading != undefined && isRef(loading)) {
    loading.value = val;
  } else if (loading != undefined && isReactive(loading)) {
    loading.loading = val;
  }
}

export const useAsync = async (func: Promise<any>, loading): Promise<any> => {
  setLoading(loading, true);

  return await func.finally(() => setLoading(loading, false));
};
