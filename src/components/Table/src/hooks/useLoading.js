import { ref, ComputedRef, unref, computed, watch } from 'vue';
import type { BasicTableProps } from '../types/table';

export function useLoading(props) {
  const loadingRef = ref(unref(props).loading);

  watch(
    () => unref(props).loading,
    (loading) => {
      loadingRef.value = loading;
    }
  );

  const getLoading = computed(() => unref(loadingRef));

  function setLoading(loading) {
    loadingRef.value = loading;
  }

  return { getLoading, setLoading };
}
