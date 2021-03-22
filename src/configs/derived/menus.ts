
/**
 * 由 configs/menus 派生出的数据
 */
import menus, { IMenuGroup, IMenuItem } from '../menus';

// 打平菜单为一层的结构
function flatMenus() {
  const flated = [] as IMenuItem[];

  const pushToFlated = (item: IMenuItem) => {
    flated.push(item);
  };

  menus.forEach((item) => {
    const groupItem = item as IMenuGroup;
    if (groupItem.children) {
      groupItem.children.forEach(pushToFlated);
      return;
    }
    const menuItem = item as IMenuItem;
    pushToFlated(menuItem);
  });

  return flated;
}

// 提前计算好 menus 的相关映射关系，或者其他目标参数
function calcMenus() {
  const path2menuItem: Record<string, IMenuItem> = {};
  const path2menuGroup: Record<string, IMenuGroup> = {};
  let homePageFullPath = '';

  menus.forEach(item => {
    const groupItem = item as IMenuGroup;
    if (groupItem.children) {
      groupItem.children.map((childItem) => {
        path2menuGroup[childItem.path] = groupItem;
        path2menuItem[childItem.path] = childItem;
        if (childItem.isHomePage) {
          homePageFullPath = childItem.path;
          path2menuGroup['/'] = groupItem;
          path2menuItem['/'] = childItem;
        }
      });
      return;
    }

    const menuItem = item as IMenuItem;
    path2menuItem[menuItem.path] = menuItem;
    if (menuItem.isHomePage) {
      path2menuItem['/'] = menuItem;
      homePageFullPath = menuItem.path;
    }
  });
  return { path2menuGroup, path2menuItem, homePageFullPath };
}

const ret = calcMenus();

export const path2menuGroup = ret.path2menuGroup;

export const path2menuItem = ret.path2menuItem;

export const homePageFullPath = ret.homePageFullPath;

export const flatedMenus = flatMenus();

