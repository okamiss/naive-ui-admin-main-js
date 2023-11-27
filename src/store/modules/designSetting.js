import { defineStore } from 'pinia';
import { store } from '@/store';
import designSetting from '@/settings/designSetting';

const { darkTheme, appTheme, appThemeList } = designSetting;


export const useDesignSettingStore = defineStore({
  id: 'app-design-setting',
  state: () => ({
    darkTheme,
    appTheme,
    appThemeList,
  }),
  getters: {
    getDarkTheme() {
      return this.darkTheme;
    },
    getAppTheme() {
      return this.appTheme;
    },
    getAppThemeList() {
      return this.appThemeList;
    },
  },
  actions: {},
});

// Need to be used outside the setup
export function useDesignSetting() {
  return useDesignSettingStore(store);
}
