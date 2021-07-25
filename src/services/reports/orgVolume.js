import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const EXPORT_ORG_VOLUME_ROUTE = 'report/org_volume/export_csv';

export function exportOrgVolumeApi(params, callback, failCallback) {
  return request(EXPORT_ORG_VOLUME_ROUTE, {
    method: 'GET',
    params,
    headers: { Authorization: `Bearer ${getToken()}` },
  })
  .then(({ data, response }) => {
    if (response) {
      callback(data.data);
    } else {
      failCallback();
    }
  })
  .catch(failCallback);
}
