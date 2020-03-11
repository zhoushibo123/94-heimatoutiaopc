import request from '@/utils/request'
export function getChannels () {
  return request({
    url: '/channels' // 获取频道数据
  })
}
