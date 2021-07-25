export function saveSearchParam(searchParam) {
    localStorage.setItem('mlmAdminOrderSearchParam', JSON.stringify(searchParam));
  }
  
  export function getSearchParam() {
    let searchParam = localStorage.getItem('mlmAdminOrderSearchParam');
    if (searchParam) {
      searchParam = JSON.parse(searchParam);
      return searchParam;
    }
    return undefined;
  }
  