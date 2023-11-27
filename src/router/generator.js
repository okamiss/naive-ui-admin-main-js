import { adminMenus } from '@/api/system/menu';
import { constantRouterIcon } from './icons';
import { Layout, ParentLayout } from '@/router/constant';

const Iframe = () => import('@/views/iframe/index.vue');
const LayoutMap = new Map();

LayoutMap.set('LAYOUT', Layout);
LayoutMap.set('IFRAME', Iframe);

export const generateRoutes = (routerMap, parent) => {
  return routerMap.map((item) => {
    const currentRoute = {
      path: `${(parent && parent.path) ?? ''}/${item.path}`,
      name: item.name ?? '',
      component: item.component,
      meta: {
        ...item.meta,
        label: item.meta.title,
        icon: constantRouterIcon[item.meta.icon] || null,
        permissions: item.meta.permissions || null,
      },
    };

    currentRoute.path = currentRoute.path.replace('//', '/');
    item.redirect && (currentRoute.redirect = item.redirect);

    if (item.children && item.children.length > 0) {
      !item.redirect && (currentRoute.redirect = `${item.path}/${item.children[0].path}`);
      currentRoute.children = generateRoutes(item.children, currentRoute);
    }
    return currentRoute;
  });
};

export const generateDynamicRoutes = async () => {
  const result = await adminMenus();
  const router = generateRoutes(result);
  asyncImportRoute(router);
  return router;
};

let viewsModules;
export const asyncImportRoute = (routes) => {
  viewsModules = viewsModules || import.meta.glob('../views/**/*.{vue,tsx}');
  if (!routes) return;
  routes.forEach((item) => {
    if (!item.component && item.meta?.frameSrc) {
      item.component = 'IFRAME';
    }
    const { component, name } = item;
    const { children } = item;
    if (component) {
      const layoutFound = LayoutMap.get(component);
      if (layoutFound) {
        item.component = layoutFound;
      } else {
        item.component = dynamicImport(viewsModules, component);
      }
    } else if (name) {
      item.component = ParentLayout;
    }
    children && asyncImportRoute(children);
  });
};

export const dynamicImport = (viewsModules, component) => {
  const keys = Object.keys(viewsModules);
  const matchKeys = keys.filter((key) => {
    let k = key.replace('../views', '');
    const lastIndex = k.lastIndexOf('.');
    k = k.substring(0, lastIndex);
    return k === component;
  });
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0];
    return viewsModules[matchKey];
  }
  if (matchKeys?.length > 1) {
    console.warn(
      '请不要在 views 文件夹下的同一层级目录中创建相同文件名的 `.vue` 和 `.TSX` 文件。这会导致动态引入失败'
    );
    return;
  }
};
