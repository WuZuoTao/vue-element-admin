import request from '@/utils/request'

export function getTestList(params) {
  return request({
    url: 'vue-admin-template/personal-data/list',
    method: 'get',
    params
  })
}
