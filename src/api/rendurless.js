import request from '@/utils/request'

export function getRegionTest(params) {
  return request({
    url: 'vue-admin-template/rendurless/list',
    method: 'get',
    params
  })
}
