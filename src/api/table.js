import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/ddr/table/list',
    method: 'get',
    params
  })
}
