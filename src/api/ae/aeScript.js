import request from '@/utils/request'

export function aeRun(data) {
  return request({
    url: '/ddr/ae/run',
    method: 'post',
    data
  })
}

