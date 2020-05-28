import request from '@/utils/request'

export function aeTreeData(data) {
  return request({
    url: '/ddr/ae/tree',
    method: 'post',
    data
  })
}

export function aeUpload(data) {
  return request({
    url: '/ddr/ae/upload',
    method: 'post',
    data
  })
}
