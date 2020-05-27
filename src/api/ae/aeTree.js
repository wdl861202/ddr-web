import request from '@/utils/request'

export function aeTreeData(data) {
  return request({
    url: '/ddr/ae/tree',
    method: 'post',
    data
  })
}

