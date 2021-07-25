export function saveSearchParam(searchParam) {
  localStorage.setItem('bepicAdminSearchParam', JSON.stringify(searchParam));
}

export function getSearchParam() {
  let searchParam = localStorage.getItem('bepicAdminSearchParam');
  if (searchParam) {
    searchParam = JSON.parse(searchParam);
    return searchParam;
  }
  return undefined;
}
