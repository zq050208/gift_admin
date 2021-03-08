import qs from 'qs'
// axios
import request from '@/utils/request'

// 预约
export function bookingGift(params) {
    return request({
        url: '/gift/gift/bookingGift',
        method: 'post',
        data: params,
        hideloading: false
    })
}

// 下载游戏记录
export function downGameGift(params) {
    return request({
        url: '/gift/gift/downGameGift',
        method: 'post',
        data: params,
        hideloading: false
    })
}

// 当前礼包
export function giftUser(params) {
    return request({
      url: '/gift/gift/giftUser',
      method: 'post',
      data: params,
      hideloading: false
    })
}

// 领取礼包
export function receiveGift(params) {
    return request({
        url: '/gift/gift/receiveGift',
        method: 'post',
        data: params,
        hideloading: false
    })
}

// 用户我的礼包列表
export function myGiftList(params) {
    return request({
      url: '/gift/gift/myGiftList',
      method: 'post',
      data: params,
      hideloading: false
    })
}
