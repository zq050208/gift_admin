<template>
  <div class="app-container">
    <div style="height:46px;">
      <van-nav-bar left-arrow border fixed z-index="3" @click-left="$router.push({name: 'index'})">
        <template #right>
          <div class="nav-box">
            <img src="~@/assets/img/gift.png" @click="$router.push({name: 'mygift'})" />
            <span class="shuaxinFont" @click="$router.push({name: 'mygift'})">我的礼包</span>
          </div>
        </template>
      </van-nav-bar>
    </div>
    <div class="top">
      <div class="game-toinfo">
        <div class="box">
          <img class="img" :src="gameInfo.icon" />
          <div class="title">{{ gameInfo.name }}</div>
          <div class="button">
            <div class="font" @click="selectClick(gameInfo.remote_id)">查看详情</div>
          </div>
        </div>
      </div>
      <div
        class="down-banner"
        :style="
          'background: linear-gradient(180deg, rgba(238, 238, 238, 0) 0%, rgba(255, 241, 182, 1) 100%),url(' +
            info.banner +
            ')'
        "
      >
        <div @click="downGame()"><GameButton message="下载游戏"></GameButton></div>
      </div>
    </div>
    <div class="content">
      <div class="gametitle">
        <GameTitle message="领取与使用方式" pattern="receive"></GameTitle>
      </div>
      <div class="explain">
        <div class="font" v-html="info.receive_desc"></div>
      </div>
      <template v-if="giftPackInfo">
        <div class="gametitle">
          <GameTitle message="礼包详情" pattern="newbie"></GameTitle>
        </div>
        <div class="newbie">
          <div class="top">
            <div class="left" id="newbie_left">
              <template v-for="(item, index) in giftPackInfo.gift_content">
                <div class="gamebox" :id="'desc' + index">
                  <GameGiftDesc :data="item"></GameGiftDesc>
                </div>
              </template>
            </div>
            <!-- <template v-if="imgLength > 4">
              <div class="right" @click="newbieGame()"></div>
            </template> -->
          </div>
          <div class="bottom">
            <template v-if="giftUserPack == false">
              <span @click="openReceiveGiftCodeBox(giftPackInfo.id)">
                <GameButton message="点击领取"></GameButton>
              </span>
            </template>
            <template v-else>
              <GameButton message="已领取" pattern="button-off down-px173"></GameButton>
            </template>
          </div>
        </div>
      </template>
      <div class="gametitle">
        <GameTitle message="通知你的好友来领取礼包" pattern="notifyfriends"></GameTitle>
      </div>
      <div class="share">
        <div class="box" @click="shareGame(0)">
          <div class="top">
            <img src="~@/assets/img/wechat.png" />
          </div>
          <div class="title">微信</div>
        </div>
        <div class="box boxmargin" @click="shareGame(2)">
          <div class="top">
            <img src="~@/assets/img/qq.png" />
          </div>
          <div class="title">QQ</div>
        </div>
        <div class="box boxmargin" @click="shareGame(1)">
          <div class="top">
            <img src="~@/assets/img/pyq.png" />
          </div>
          <div class="title">朋友圈</div>
        </div>
      </div>
      <template v-if="info.link_data">
        <div class="gametitle">
          <GameTitle message="相关礼包" pattern="newbie"></GameTitle>
        </div>
        <div class="related">
          <div class="related-box">
            <template v-for="(item, index) in info.link_data">
              <template v-if="index === 0">
                <div class="related-content" @click="$router.push('/' + item.class + '/' + item.id)">
                  <div class="related-img">
                    <img :src="item.cover_img" />
                  </div>
                  <div class="related-font">{{ item.name }}</div>
                </div>
              </template>
              <template v-else>
                <div class="related-content related-box-marign" @click="$router.push('/' + item.class + '/' + item.id)">
                  <div class="related-img">
                    <img :src="item.cover_img" />
                  </div>
                  <div class="related-font">{{ item.name }}</div>
                </div>
              </template>
            </template>
          </div>
        </div>
      </template>
      <div class="over">
        <img class="left" src="~@/assets/img/juxing.png" />
        <div class="middle">已全部加载完毕</div>
        <img class="right" src="~@/assets/img/juxingright.png" />
      </div>
    </div>

    <GiftOver @changeShow="giftOverShow" :status="showPackMaxBox"></GiftOver>
    <Booking @changeShow="bookingShow" :status="show" :giftID="id"></Booking>
    <BookingOk @changeShow="bookingOkShow" :status="showBookingOk"></BookingOk>
    <ReceiveGiftCode @changeShow="giftCodeRShow" :code="cokeyNumber" :status="giftCodeShow"></ReceiveGiftCode>
    <BookingClone @changeShow="bookingCloneShow" :status="cloneBookingBox" :giftID="id"></BookingClone>
    <Login @changeShow="loginShow" :status="loginBox"></Login>
    <DownGame @changeShow="downShow" :status="downBox" :gameInfo="gameInfo" :uid="uid"></DownGame>
    <DownGame
      @changeShow="downGameShow"
      :status="downGameBox"
      :gameInfo="gameInfo"
      :uid="uid"
      info="您好，是否下载游戏"
    ></DownGame>
  </div>
</template>
<script>
// api
// 礼包用户状态
import {giftUser} from '@/api/gift.js'
// 礼包详情
import {giftInfo} from '@/api/detail.js'
// 领取礼包
import {receiveGift} from '@/api/gift.js'
// 预约礼包
import {bookingGift} from '@/api/gift.js'
// 配置
import {baseUrl} from '@/config'

import GameButton from '@/components/GameButton'
import GameTitle from '@/components/GameTitle'
import GameGiftDesc from '@/components/GameGiftDesc'
import ReturnNavBox from '@/components/ReturnNavBox'
import ReceiveGiftCode from '@/components/gift_dialog/ReceiveGiftCode'
import Login from '@/components/gift_dialog/Login'
import DownGame from '@/components/gift_dialog/DownGame'
import GiftOver from '@/components/gift_dialog/GiftOver'
import Booking from '@/components/gift_dialog/Booking'
import BookingOk from '@/components/gift_dialog/BookingOk'
import BookingClone from '@/components/gift_dialog/BookingClone'

export default {
  data() {
    return {
      imgLength: 0,
      boxX: 4,
      giftCodeShow: false,

      // 下载游戏弹窗
      downGameBox: false,
      // 取消预约弹窗
      cloneBookingBox: false,
      // 成功预约弹窗
      showBookingOk: false,
      // 提示手机号码是否正确
      showMobileWarning: false,
      mobile: '',
      // 预约弹窗
      show: false,
      // 下载弹窗
      downBox: false,
      // 登录
      loginBox: false,
      // 领取成功弹窗
      giftCodeShow: false,
      // 礼包已领完
      showPackMaxBox: false,
      id: this.$route.params.id,
      uid: window.userID,
      // 礼包详情
      info: [],
      // 激活码
      cokeyNumber: '',
      // 用户已领取礼包
      giftUserPack: true,
      // 游戏详情
      gameInfo: [],
      // 游戏礼包详情
      giftPackInfo: [],
      // 是否预约
      reserveStatus: false
    }
  },
  components: {
    GameButton,
    GameTitle,
    GameGiftDesc,
    ReturnNavBox,
    ReceiveGiftCode,
    Login,
    DownGame,
    GiftOver,
    Booking,
    BookingOk,
    BookingClone
  },
  mounted() {
    this.queryUser()
    this.queryInfo()
  },
  methods: {
    // 取消预约弹窗子组件回调
    bookingCloneShow(val, reserveStatus) {
      this.cloneBookingBox = val
      if (reserveStatus == 'reserveStatus') {
        this.reserveStatus = false
        this.showBookingOk = false
      }
    },
    // 领取cokey弹窗子组件回调
    giftCodeRShow(val) {
      this.giftCodeShow = val
    },
    // 预约成功弹窗子组件回调
    bookingOkShow(val) {
      this.showBookingOk = val
    },
    // 礼包领完弹窗子组件回调
    giftOverShow(val) {
      this.showPackMaxBox = val
    },
    // 预约弹窗子组件回调
    bookingShow(val, showBookingOk, reserveStatus) {
      this.show = val
      if (showBookingOk == 'showBookingOk') {
        this.showBookingOk = true
      }
      if (reserveStatus == 'reserveStatus') {
        this.reserveStatus = true
      }
    },
    downGame() {
      this.downGameBox = true
    },
    // 预约
    postBooking: function(action, done) {
      if (window.userID == 0) {
        this.loginBox = true
        done()
        return false
      }

      if (action === 'confirm') {
        if (this.showMobileWarning === false && this.mobile) {
          const params = {gift_id: this.id, uid: window.userID, type: 0, mobile: this.mobile}
          bookingGift(params)
            .then(res => {
              let status = res.data.status
              let msg = res.data.msg
              let code = res.data.code
              let data = res.data.data
              if (status == 1 && code == 2) {
                this.showBookingOk = true
                this.reserveStatus = true
              } else {
                this.$toast.fail(msg)
              }
            })
            .catch(res => {
              this.$toast.fail('请等待片刻')
            })
        } else {
          this.$toast.fail('请输入正确的手机号码')
          done(false)
        }
      }
      done()
    },
    // 取消预约
    cloneBooking: function(action, done) {
      if (action === 'confirm') {
        const params = {gift_id: this.id, uid: window.userID, type: 1}
        bookingGift(params)
          .then(res => {
            let status = res.data.status
            let msg = res.data.msg
            let code = res.data.code
            let data = res.data.data
            if (status === 1 && code === 1) {
              this.$toast.success('取消预约成功')
              this.reserveStatus = false
              location.reload()
            } else {
              this.$toast.fail(msg)
            }
          })
          .catch(res => {
            this.$toast.fail('请等待片刻')
          })
      }
      done()
    },
    // 下载游戏弹窗子组件回调
    downGameShow(val) {
      this.downGameBox = val
    },
    // 下载游戏弹窗子组件回调
    downShow(val) {
      this.downBox = val
    },
    loginShow(val) {
      this.loginBox = val
    },
    shareGame(type) {
      var share_url = baseUrl + '/#/g/' + this.info.id
      var share_title = this.info.name
      var share_desc = this.info.booking_desc
      var share_image = this.gameInfo.icon
      window.callShare(type, share_url, share_title, share_desc, share_image)
    },
    selectClick(id) {
      window.clickInfo(id)
    },
    // 领取方法
    openReceiveGiftCodeBox: function(packID) {
      if (window.userID == 0) {
        this.loginBox = true
        return false
      }

      if (this.info.term == 1) {
        if (this.reserveStatus) {
          this.showBookingOk = true
        } else {
          this.show = true
        }
        return false
      }

      var downStatus = window.callAPKPackger(this.gameInfo.download_url, this.gameInfo.package)
      if ((downStatus == '{}' || !downStatus || downStatus == '' || downStatus == {}) && this.info.term == 0) {
        this.downBox = true
        return false
      }

      const params = {gift_id: this.id, uid: window.userID, pack_id: packID}
      receiveGift(params)
        .then(res => {
          let status = res.data.status
          let msg = res.data.msg
          let code = res.data.code
          let data = res.data.data
          // 领取成功
          if (status === 1 && code === 1) {
            this.cokeyNumber = data.cokey
            this.giftCodeShow = true
            this.giftUserPack = true
          }

          // 礼包领完
          if (status === 1 && code === 2) {
            this.showPackMaxBox = true
          }

          if (status === 0) {
            this.$toast.fail(msg)
          }
        })
        .catch(res => {
          this.$toast.fail('请等待片刻')
        })
    },
    newbieGame: function() {
      // var box = document.getElementById('newbie_left')
      // var width = box.scrollWidth
      // if (this.boxX + 240 >= width) {
      //   this.boxX = 0
      // }
      // let currentPosition, timer
      // box.scrollTo(this.boxX, 0)
      // this.boxX = this.boxX + 79.5

      var i = document.getElementById('desc' + this.boxX).getBoundingClientRect()
      var box = document.getElementById('newbie_left')
      box.scrollTo(i.x, 0)
      var count = this.giftPackInfo.gift_content.length
      if (count <= this.boxX + 1) {
        this.boxX = 0
      } else {
        this.boxX = this.boxX + 1
      }
    },
    // 领取成功
    cloneReceive: function(action, done) {
      if (action === 'confirm') {
      } else {
        location.reload()
      }
      done()
    },
    // 查询礼包信息
    queryInfo: function() {
      const params = {id: this.id, uid: window.userID}
      giftInfo(params)
        .then(res => {
          let status = res.data.status
          if (status === 1) {
            let data = res.data.data
            if (data.class == 1) {
              this.$router.push({name: 'bookinggift', params: {id: this.id}})
              return false
            }
            this.info = data
            this.info.receive_desc = this.info.receive_desc.replace(/\n/g, '<br/>')
            this.gameInfo = data.game_info
            this.giftPackInfo = data.gift
            this.imgLength = this.giftPackInfo.gift_content.length
          } else {
            this.$toast.fail('请等待片刻')
          }
        })
        .catch(res => {
          this.$toast.fail('请等待片刻')
        })
    },
    // 查询用户对该礼包的信息
    queryUser: function() {
      const params = {gift_id: this.id, uid: window.userID}
      giftUser(params)
        .then(res => {
          let status = res.data.status
          if (status === 1) {
            let data = res.data.data
            this.reserveStatus = data.reserve_status
            this.giftUserPack = data.gift_pack_list
          } else {
            this.$toast.fail('请等待片刻')
          }
        })
        .catch(res => {
          this.$toast.fail('请等待片刻')
        })
    },
    // 跳转刷新
    getSearchResult: function(id) {
      this.id = id
      this.queryUser()
      this.queryInfo()
    }
  },
  watch: {
    $route: function(to, from) {
      this.getSearchResult(to.params.id)
    },
    // 手机验证
    mobile(val) {
      if (val !== '') {
        var mobile = this.mobile
        if (!/^1[3456789]\d{9}$/.test(mobile)) {
          this.showMobileWarning = true
          return true
        }
      }
      this.showMobileWarning = false
    }
  }
}
</script>
<style>
.van-dialog {
  border-radius: 5px;
}
</style>
<style lang="scss" scoped>
.app-container {
  width: 375px;
  .showbox-bookinggift {
    width: 245px;
    margin: 0 auto;
    .showbox-title {
      width: 245px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(38, 38, 39, 1);
      line-height: 20px;
      margin-top: 40px;
      margin-bottom: 10px;
    }
    .showbox-title-showbookingok {
      width: 245px;
      font-size: 14px;
      text-align: center;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(38, 38, 39, 1);
      line-height: 22px;
      margin-top: 40px;
      margin-bottom: 10px;
    }
    .showbox-codebox {
      width: 245px;
      height: 38px;
      border-radius: 5px;
      border: 1px solid rgba(204, 204, 204, 1);
      input {
        width: 230px;
        height: 36px;
        padding-left: 10px;
        background: none;
        outline: none;
        border: 0px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(42, 42, 40, 1);
      }
    }
    .mobilewarning {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(242, 45, 107, 1);
      line-height: 17px;
    }
    .showbox-desc {
      width: 245px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(128, 128, 128, 1);
      line-height: 17px;
      margin-top: 5px;
      margin-bottom: 40px;
    }
  }
  .nav-box {
    width: 101px;
    height: 31px;
    border-radius: 16px;
    border: 1px solid rgba(255, 204, 3, 1);
    img {
      width: 15px;
      height: 15px;
      float: left;
      margin-top: 8px;
      margin-left: 10px;
    }
    span {
      font-size: 14px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(255, 204, 3, 1);
      margin-left: 10px;
      float: left;
      height: 31px;
      line-height: 31px;
    }
  }
  .top {
    width: 375px;
    height: 283px;
    .game-toinfo {
      width: 375px;
      height: 48px;
      background: #ffffff;
      .box {
        width: 345px;
        height: 32px;
        margin: 0 auto;
        padding-top: 8px;
        .img {
          width: 32px;
          height: 32px;
          border-radius: 5px;
          float: left;
        }
        .title {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(42, 42, 40, 1);
          line-height: 32px;
          float: left;
          margin-left: 10px;
        }
        .button {
          width: 84px;
          height: 31px;
          border-radius: 16px;
          border: 1px solid rgba(255, 204, 3, 1);
          float: right;
          .font {
            font-size: 14px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(255, 204, 3, 1);
            line-height: 31px;
            text-align: center;
          }
        }
      }
    }
    .down-banner {
      width: 375px;
      height: 61px;
      background-size: 100% !important;
      padding-top: 174px;
    }
  }
  .content {
    background: url('~@/assets/img/top_yun.png') top, #fff1b6;
    background-size: 100%;
    .gametitle {
      padding-top: 22px;
      margin-bottom: 20px;
    }
    .explain {
      width: 345px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 10px 0px rgba(255, 204, 3, 0.5);
      border-radius: 10px;
      margin: 0 auto;
      .font {
        margin: 0 auto;
        padding: 15px;
        width: 315px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #808080;
        line-height: 20px;
      }
    }
    .newbie {
      width: 345px;
      height: 194px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 10px 0px rgba(255, 204, 3, 0.5);
      border-radius: 10px;
      .top {
        width: 345px;
        height: 94px;
        padding-top: 20px;
        .left {
          width: 297px;
          height: 94px;
          margin-left: 20px;
          overflow-x: auto;
          overflow-y: hidden;
          white-space: nowrap;
          float: left;
          .gamebox {
            margin-right: 17px;
            display: inline-block;
            vertical-align: top;
          }
        }
        .right {
          width: 25px;
          height: 12px;
          margin-left: 14px;
          margin-top: 23px;
          float: left;
          background: url('~@/assets/img/right_jiantou.png') left;
          background-size: 8px 12px;
        }
      }
      .bottom {
        margin-top: 20px;
      }
    }
    .share {
      width: 345px;
      height: 107px;
      margin: 0 auto;
      .boxmargin {
        margin-left: 15px;
      }
      .box {
        width: 105px;
        height: 92px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 10px 0px rgba(255, 204, 3, 0.5);
        border-radius: 10px;
        float: left;
        padding-top: 15px;
        .top {
          width: 45px;
          height: 45px;
          margin: 0 auto;
          img {
            width: 45px;
            height: 45px;
          }
        }
        .title {
          margin-top: 10px;
          text-align: center;
          font-size: 16px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(128, 128, 128, 1);
        }
      }
    }
    .related {
      width: 345px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 10px 0px rgba(255, 204, 3, 0.5);
      border-radius: 10px;
      .related-box {
        .related-box-marign {
          margin-left: 37px;
        }
        width: 315px;
        height: 95px;
        margin: 0 auto;
        padding: 15px 20px;
        .related-content {
          width: 80px;
          float: left;
          .related-img {
            width: 45px;
            height: 45px;
            margin: 0 auto;
            img {
              width: 45px;
              height: 45px;
              border-radius: 5px;
            }
          }
          .related-font {
            width: 80px;
            height: 40px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(128, 128, 128, 1);
            line-height: 20px;
            text-align: center;
            margin-top: 10px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>
