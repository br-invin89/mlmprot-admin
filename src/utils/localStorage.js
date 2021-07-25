export function storeUser(user, token) {
  localStorage.setItem('bepicAdminUser', JSON.stringify({ user, token }));
}

export function getToken() {
  let authData = localStorage.getItem('bepicAdminUser');
  if (authData) {
    authData = JSON.parse(authData);
    return authData.token;
  }
  return '';
}

export function getUser() {
  let authData = localStorage.getItem('bepicAdminUser');
  if (authData) {
    authData = JSON.parse(authData);
    return authData.user;
  }
  return undefined;
}

export function clearUser() {
  localStorage.removeItem('bepicAdminUser');
}
