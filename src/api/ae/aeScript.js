import request from '@/utils/request'

export function aeRun(data) {
  return request({
    url: '/ddr/ae/run',
    method: 'post',
    data
  })
}

export function aeSave(data) {
  return request({
    url: '/ddr/ae/save',
    method: 'post',
    data
  })
}

