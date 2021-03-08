// axios
import request from '@/utils/request'

// 礼包首页
export function getIndexList(params) {
  return request({
    url: '/gift/detail/indexList',
    method: 'get',
    hideloading: true,
    params:params
  })
}

// 礼包详情
export function giftInfo(params) {
  return request({
    url: '/gift/detail/giftInfo',
    method: 'get',
    hideloading: false,
    params:params
  })
}

// 热门礼包
export function hotGiftList() {
  return request({
    url: '/gift/detail/hotGiftList',
    method: 'get',
    hideloading: false,
  })
}

// 游戏详情
export function gameInfo(params) {
  return request({
    url: '/gift/detail/otherInfo',
    method: 'get',
    hideloading: false,
    params:params
  })
}

