/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
export function checkPageAccess(user, currentRoute, routes) {
  // let able = false;
  /*
  for (const route of routes) {
    if (route.children) {
      for (const subRoute of route.children) {
        for (const permission of user.department.permissions) {
          if (currentRoute.indexOf(permission.value)>=0) {
            able = true
          }
        } 
      }
    } else if (currentRoute.indexOf(route.path) >= 0) {
        if (route.auth && route.auth.indexOf('no_fraud') >= 0) {
          if (user.status === 4) {
            return false;
          }
        }
        return true;
      }
  }
  */
  let able = false;
  routes.forEach((route) => {
    if (route.path === currentRoute) {
      if (route.auth.indexOf('always') >= 0) able = true;
    }
  });
  if (!able) {
    user.department.permissions.forEach((permission) => {
      if (currentRoute.indexOf(permission.value) >= 0) {
        able = true;
      }
    });
  }

  return able;
}

export function checkMenuAccess(user, menu) {
  let able = false;

  if (menu.auth.indexOf('always') >= 0) able = true;
  else {
    for (const permission of user.department.permissions) {
      if (menu.path.indexOf(permission.value) >= 0) {
        able = true;
      }
    }
  }

  /*
  if (menu.auth && menu.auth.indexOf('no_fraud') >= 0) {
    if (user.status === 4) {
      return false;
    }
  }
  */

  return able;
}

export function checkActionAccess(user, actionPermission0) {
  let able = false;
  user.department.action_permissions.forEach((actionPermission) => {
    if (actionPermission.value === actionPermission0) {
      able = true;
    }
  });

  return able;
}
