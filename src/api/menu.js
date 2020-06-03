import request from '@/utils/request'

export function getMenus(params) {
  return request({
    url: '/ddr/routers',
    method: 'post',
    params
  })
}
