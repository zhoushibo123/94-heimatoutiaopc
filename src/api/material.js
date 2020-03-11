// 专门处理素材的请求 导出诺干方法

import request from '@/utils/request'
export function getMaterial (params) {
  //  请求调用 返回结果
  return request({
    url: '/user/images',
    params
  })
}
