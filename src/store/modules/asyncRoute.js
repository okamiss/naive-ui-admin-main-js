import { toRaw, unref } from 'vue';
import { defineStore } from 'pinia';
import { store } from '@/store';
import { asyncRoutes, constantRouter } from '@/router/index';
import { generateDynamicRoutes } from '@/router/generator';
import { useProjectSetting } from '@/hooks/setting/useProjectSetting';


// 默认的树形结构助手配置
const DEFAULT_CONFIG = {
  id: 'id',
  children: 'children',
  pid: 'pid',
};

// 获取树形结构助手配置
const getConfig = (config) => Object.assign({}, DEFAULT_CONFIG, config);


// 过滤函数
function filter(
  tree,
  func,
  config = {}
) {
  // 获取配置
  config = getConfig(config);
  const children = config.children;

  function listFilter(list) {
    return list
      .map((node) => ({ ...node }))
      .filter((node) => {
        node[children] = node[children] && listFilter(node[children]);
        return func(node) || (node[children] && node[children].length);
      });
  }

  return listFilter(tree);
}

// 定义异步路由状态存储
export const useAsyncRouteStore = defineStore({
  id: 'app-async-route',
  state: () => ({
    menus: [],
    routers: constantRouter,
    routersAdded: [],
    keepAliveComponents: [],
    isDynamicRouteAdded: false,
  }),
  getters: {
    getMenus() {
      return this.menus;
    },
    getIsDynamicRouteAdded() {
      return this.isDynamicRouteAdded;
    },
  },
  actions: {
    getRouters() {
      return toRaw(this.routersAdded);
    },
    setDynamicRouteAdded(added) {
      this.isDynamicRouteAdded = added;
    },
    // 设置动态路由
    setRouters(routers) {
      this.routersAdded = routers;
      this.routers = constantRouter.concat(routers);
    },
    setMenus(menus) {
      // 设置动态路由
      this.menus = menus;
    },
    setKeepAliveComponents(compNames) {
      // 设置需要缓存的组件
      this.keepAliveComponents = compNames;
    },
    async generateRoutes(data) {
      let accessedRouters;
      const permissionsList = data.permissions ?? [];
      const routeFilter = (route) => {
        const { meta } = route;
        const { permissions } = meta || {};
        if (!permissions) return true;
        return permissionsList.some((item) => permissions.includes(item.value));
      };
      const { permissionMode } = useProjectSetting();
      if (unref(permissionMode) === 'BACK') {
        // 动态获取菜单
        try {
          accessedRouters = await generateDynamicRoutes();
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          //过滤账户是否拥有某一个权限，并将菜单从加载列表移除
          accessedRouters = filter(asyncRoutes, routeFilter);
        } catch (error) {
          console.log(error);
        }
      }
      accessedRouters = accessedRouters.filter(routeFilter);
      this.setRouters(accessedRouters);
      this.setMenus(accessedRouters);
      return toRaw(accessedRouters);
    },
  },
});

// 在setup外部使用
export function useAsyncRoute() {
  return useAsyncRouteStore(store);
}
