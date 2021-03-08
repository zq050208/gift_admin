<template>
  <div class="app-container">
    <div style="height:46px;">
      <van-nav-bar title="预约礼包" left-arrow border fixed z-index="3" @click-left="$router.push({name: 'index'})">
        <template #right>
          <img src="~@/assets/img/shuaxinicon.png" @click="Refresh()" />
          <span class="shuaxinFont" @click="Refresh()">刷新</span>
        </template>
      </van-nav-bar>
    </div>
    <div class="top">
      <div class="game-toinfo">
        <div class="box">
          <img class="img" :src="gameInfo.icon" />
          <div class="title">{{ gameMoreInfo.name }}</div>
          <div class="button">
            <div class="font" @click="selectClick(gameInfo.remote_id)">查看详情</div>
          </div>
        </div>
      </div>
      <!-- <template v-if="info.term"> -->
      <template v-if="reserveStatus === false">
        <div
          class="down-banner"
          :style="
            'background: linear-gradient(180deg, rgba(238, 238, 238, 0) 0%, rgba(255, 241, 182, 1) 100%),url(' +
              info.banner +
              ')'
          "
        >
          <span @click="openReadyBox(0)">
            <GameButton message="立即预约"></GameButton>
          </span>
        </div>
      </template>
      <template v-else>
        <div
          class="down-banner"
          :style="
            'background: linear-gradient(180deg, rgba(238, 238, 238, 0) 0%, rgba(255, 241, 182, 1) 100%),url(' +
              info.banner +
              ')'
          "
        >
          <span @click="openReadyBox(1)">
            <GameButton message="已预约"></GameButton>
          </span>
        </div>
      </template>
      <!-- </template> -->
      <!-- <template v-else>
        <template v-if="reserveStatus === false">
          <div class="down-banner"
          :style="'background: linear-gradient(180deg, rgba(238, 238, 238, 0) 0%, rgba(255, 241, 182, 1) 100%),url('+ info.banner +')'">
            <span @click="openDownBox()"><GameButton message="下载游戏"></GameButton></span>
          </div>
        </template>
        <template v-else>
          <div class="down-banner"
          :style="'background: linear-gradient(180deg, rgba(238, 238, 238, 0) 0%, rgba(255, 241, 182, 1) 100%),url('+ info.banner +')'">
            <span @click="openDownBox()"><GameButton message="已下载"></GameButton></span>
          </div>
        </template>
      </template>-->
    </div>
    <div class="content">
      <div class="gametitle">
        <GameTitle message="预约领小虎福利礼包" pattern="booking"></GameTitle>
      </div>
      <div class="explain">
        预约人数达到目标数量后，即可解锁
        <span style="color:#F22D6B">{{ info.pack_count }}款</span>预约礼包，在游戏正式上线后即可到本活动中领取者
        <span style="color:#F22D6B">{{ info.pack_count }}款</span>预约礼包
      </div>
      <van-steps
        direction="vertical"
        :active="info.steps"
        active-color="#FF9100"
        inactive-color="#CCC"
        style="background-color:transparent;"
      >
        <template v-for="(item, index) in info.gift">
          <van-step class="step">
            <div class="stepbox">
              <div class="number">{{ index + 1 }}</div>
              <div class="stepbox-top">
                <div class="stepbox-top-title">{{ item.name }}</div>
                <template v-if="item.is_receive === 0">
                  <div class="stepbox-top-button" @click="openReceiveGiftCodeBox(index, item.id)">点击领取</div>
                </template>
                <template v-else>
                  <div class="stepbox-top-button-off">已领取</div>
                </template>
              </div>
              <div class="stepbox-bottom">
                <div class="stepbox-bottom-box">
                  <template v-for="(vo, index) in item.gift_content">
                    <template v-if="index % 3 == 2">
                      <div class="stepbox-bottom-box-flexnth-child">
                        <GameGiftDesc :data="vo"></GameGiftDesc>
                      </div>
                    </template>
                    <template v-else>
                      <div class="stepbox-bottom-box-flex">
                        <GameGiftDesc :data="vo"></GameGiftDesc>
                      </div>
                    </template>
                  </template>
                  <div style="clear:both"></div>
                </div>
              </div>
            </div>
          </van-step>
        </template>
      </van-steps>
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
      <div class="gametitle">
        <GameTitle message="游戏介绍" pattern="newbie"></GameTitle>
      </div>
      <div class="gameDesc">
        <div class="gameDesc-font">
          {{ gameMoreInfo.detail_introduce }}
          <a @click="selectClick(gameInfo.remote_id)">查看游戏详情</a>
        </div>
      </div>
      <div class="gametitle">
        <GameTitle message="游戏截图" pattern="newbie"></GameTitle>
      </div>
      <template v-if="gameMoreInfo.images_introduce_type == 1">
        <div class="screenshot screenshotWidth">
          <template v-for="item in gameMoreInfo.images_introduce">
            <div class="screenshot-box">
              <img :src="item" />
            </div>
          </template>
        </div>
      </template>
      <template v-else>
        <div class="screenshot screenshotHeight">
          <template v-for="item in gameMoreInfo.images_introduce">
            <div class="screenshot-box">
              <img :src="item" />
            </div>
          </template>
        </div>
      </template>
      <div class="gametitle">
        <GameTitle message="游戏视频" pattern="newbie"></GameTitle>
      </div>
      <template v-if="gameMoreInfo.video_introduce_type == 1">
        <div class="screenshot screenshotVideo">
          <div class="screenshot-box">
            <template v-for="item in gameVideo">
              <video-player
                class="video-player vjs-custom-skin"
                ref="videoPlayer"
                :playsinline="false"
                :options="item"
                @play="onPlayerPlay($event)"
              ></video-player>
            </template>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="screenshot screenshotVideo">
          <div class="screenshot-box">
            <template v-for="item in gameVideo">
              <video-player
                class="video-player vjs-custom-skin"
                ref="videoPlayer"
                :playsinline="false"
                :options="item"
                @play="onPlayerPlay($event)"
              ></video-player>
            </template>
          </div>
        </div>
      </template>
      <div class="gametitle">
        <GameTitle message="活动规则" pattern="newbie"></GameTitle>
      </div>
      <div class="gameDesc">
        <div class="gameDesc-font" v-html="info.booking_rule"></div>
      </div>
      <div class="over"></div>
    </div>

    <GiftOver @changeShow="giftOverShow" :status="giftOverBox"></GiftOver>
    <Login @changeShow="loginShow" :status="loginBox"></Login>
    <DownGame @changeShow="downShow" :status="downBox" :gameInfo="gameInfo" :uid="uid"></DownGame>
    <Booking @changeShow="bookingShow" :status="show" :giftID="id"></Booking>
    <BookingOk @changeShow="bookingOkShow" :status="showBookingOk"></BookingOk>
    <BookingClone @changeShow="bookingCloneShow" :status="cloneBookingBox" :giftID="id"></BookingClone>
    <ReceiveGiftCode @changeShow="giftCodeRShow" :code="cokeyNumber" :status="giftCodeShow"></ReceiveGiftCode>
    <PeopleMax @changeShow="notBookingShow" :people="info.booking_number" :status="showNotBookingBox"></PeopleMax>
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
// 领取礼包
import {gameInfo} from '@/api/detail.js'
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
import PeopleMax from '@/components/gift_dialog/PeopleMax'
export default {
  data() {
    return {
      // 礼包已领完
      giftOverBox: false,
      // 下载弹窗
      downBox: false,
      // 登录弹窗
      loginBox: false,
      // 预约人数不足
      showNotBookingBox: false,
      // 取消预约弹窗
      cloneBookingBox: false,
      // 预约弹窗
      show: false,
      // 领取成功弹窗
      giftCodeShow: false,
      // 成功预约弹窗
      showBookingOk: false,
      // 提示手机号码是否正确
      showMobileWarning: false,
      mobile: '',
      // 当前游戏礼包预约状态
      reserveStatus: false,
      // 当前礼包ID
      id: this.$route.params.id,
      uid: window.userID,
      // 用户已领取礼包
      giftUserPack: [],
      // 礼包详情
      info: [],
      // 激活码
      cokeyNumber: '',
      // 游戏图片
      detailImg: [],
      // 游戏视频
      gameVideo: [],
      // 游戏介绍
      gameDesc: '',
      // 游戏详情
      gameInfo: [],
      // 更多游戏详情
      gameMoreInfo: []
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
    BookingClone,
    PeopleMax
  },
  mounted() {
    window.checkLogin()
    this.queryUser()
    this.queryInfo()
  },
  methods: {
    onPlayerPlay(element) {
      setTimeout(function() {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen()
        } else if (element.oRequestFullscreen) {
          element.oRequestFullscreen()
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullScreen()
        } else {
          var docHtml = document.documentElement
          var docBody = document.body
          var videobox = document.getElementsByClassName('video-player')
          var cssText = 'width:100%;height:100%;overflow:hidden;'
          docHtml.style.cssText = cssText
          docBody.style.cssText = cssText
          videobox.style.cssText = cssText + ';' + 'margin:0px;padding:0px;'
          document.IsFullScreen = true
        }
      }, 1000)
    },
    // 获取游戏信息
    queryGame() {
      const params = {id: this.gameInfo.remote_id}
      gameInfo(params)
        .then(res => {
          var data = res.data
          console.log(data)
          if (data.code === 200 && data.status === true) {
            this.gameMoreInfo = data.data
            var aspectRatio = '16:9'
            if (data.data.video_introduce_type == 2) {
              aspectRatio = '16:9'
            }
            var poster = ''
            for (var i = 0; i < data.data.video_introduce.length; i++) {
              if (data.data.images_introduce[i]) {
                poster = data.data.images_introduce[i]
              }
              this.gameVideo.push({
                // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                autoplay: false, // 如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: aspectRatio, // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [
                  {
                    type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                    src: data.data.video_introduce[i] // url地址
                  }
                ],
                hls: false,
                poster: poster, // 你的封面地址
                width: document.documentElement.clientWidth, // 播放器宽度
                notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                  nativeVideoTracks: false,
                  timeDivider: false,
                  durationDisplay: false,
                  remainingTimeDisplay: false,
                  fullscreenToggle: true // 全屏按钮
                }
              })
            }
          }
        })
        .catch(res => {
          this.$toast.fail('请等待片刻')
        })
    },
    notBookingShow(val) {
      this.showNotBookingBox = val
    },
    // 领取cokey弹窗子组件回调
    giftCodeRShow(val) {
      this.giftCodeShow = val
    },
    // 预约成功弹窗子组件回调
    bookingOkShow(val) {
      this.showBookingOk = val
    },
    // 取消预约弹窗子组件回调
    bookingCloneShow(val, reserveStatus) {
      this.cloneBookingBox = val
      if (reserveStatus == 'reserveStatus') {
        this.reserveStatus = false
        this.showBookingOk = false
      }
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
    // 礼包领完弹窗子组件回调
    giftOverShow(val) {
      this.giftOverBox = val
    },
    // 下载游戏弹窗子组件回调
    downShow(val) {
      this.downBox = val
    },
    openDownBox() {
      if (window.userID == 0) {
        this.loginBox = true
        return false
      }
      this.downBox = true
    },
    // 登录弹窗子组件回调
    loginShow(val, type) {
      this.loginBox = val
      if (type === 'ok') {
        this.$router.go(-1)
      }
    },
    // 分享
    shareGame(type) {
      var share_url = baseUrl + '/#/g/' + this.info.id
      var share_title = this.info.name
      var share_desc = this.info.booking_desc
      var share_image = this.gameInfo.icon
      window.callShare(type, share_url, share_title, share_desc, share_image)
    },
    // 跳转到游戏详情
    selectClick(id) {
      window.clickInfo(id)
    },
    // 查询礼包信息
    queryInfo: function() {
      const params = {id: this.id, uid: window.userID}
      giftInfo(params)
        .then(res => {
          let status = res.data.status
          if (status === 1) {
            let data = res.data.data
            this.info = data
            this.info.booking_rule = this.info.booking_rule.replace(/\n/g, '<br/>')
            this.detailImg = data.game_info.detail_img
            this.gameDesc = data.game_info.desc
            this.gameInfo = data.game_info
            this.queryGame()
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
    // 选择开启预约或者取消预约弹窗
    openReadyBox: function(status) {
      if (window.userID == 0) {
        this.loginBox = true
        return false
      }

      if (status === 0) {
        this.show = true
      } else {
        this.cloneBookingBox = true
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
    // 领取方法
    openReceiveGiftCodeBox: function(step, packID) {
      if (window.userID == 0) {
        this.loginBox = true
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

          // 人数不足
          if (status === 1 && code === 0) {
            this.showNotBookingBox = true
            this.info.booking_number = data
          }

          // 领取成功
          if (status === 1 && code === 1) {
            this.cokeyNumber = data.cokey
            this.giftCodeShow = true
            this.info.gift[step].is_receive = 1
          }

          // 礼包领完
          if (status === 1 && code === 2) {
            this.giftOverBox = true
          }

          // 未预约
          if (status === 1 && code === 3) {
            this.show = true
          }

          if (status === 0) {
            this.$toast.fail(msg)
          }
        })
        .catch(res => {
          this.$toast.fail('请等待片刻')
        })
    },
    // 刷新
    Refresh: function() {
      // 礼包已领完
      ;(this.giftOverBox = false),
        // 下载弹窗
        (this.downBox = false),
        // 登录弹窗
        (this.loginBox = false),
        // 预约人数不足
        (this.showNotBookingBox = false),
        // 取消预约弹窗
        (this.cloneBookingBox = false),
        // 预约弹窗
        (this.show = false),
        // 领取成功弹窗
        (this.giftCodeShow = false),
        // 成功预约弹窗
        (this.showBookingOk = false),
        // 提示手机号码是否正确
        (this.showMobileWarning = false),
        (this.mobile = ''),
        // 当前游戏礼包预约状态
        (this.reserveStatus = false),
        // 当前礼包ID
        (this.id = this.$route.params.id),
        (this.uid = window.userID),
        // 用户已领取礼包
        (this.giftUserPack = []),
        // 礼包详情
        (this.info = []),
        // 激活码
        (this.cokeyNumber = ''),
        // 游戏图片
        (this.detailImg = []),
        // 游戏视频
        (this.gameVideo = []),
        // 游戏介绍
        (this.gameDesc = ''),
        // 游戏详情
        (this.gameInfo = []),
        // 更多游戏详情
        (this.gameMoreInfo = [])
      this.$toast.loading({
        message: '刷新中...',
        forbidClick: true
      })
      window.checkLogin()
      this.queryUser()
      this.queryInfo()
    }
  }
}
</script>
<style lang="scss">
.video-js .vjs-time-control {
  font-size: 0;
  display: none;
}

.video-js .vjs-remaining-time {
  font-size: 0;
  display: none;
}

.video-js .vjs-progress-control {
  min-width: 0;
  display: none;
}

.video-js .vjs-play-progress:before {
  font-size: 0;
  display: none;
}

.van-dialog {
  border-radius: 5px;
}

.vjs-poster {
  background-color: initial;
  background-size: 100%;
  border-radius: 10px;
}

.video-js {
  background-color: inherit;
}

.video-js .vjs-tech {
  border-radius: 10px;
}

.video-player {
  width: 185px;
  display: inline-block;
  border-radius: 10px;
  margin-right: 10px;
}

.van-step__line {
  background-color: #ff9100;
}

.van-step--vertical {
  padding: 10px;
}

.van-step--vertical .van-step__line {
  width: 5px;
  left: -17px;
  top: 107px;
}

.van-step__circle {
  width: 0;
  height: 0;
  padding: 0;
  margin: 0;
}

.van-step--finish .van-step__circle,
.van-step--finish .van-step__line {
  background-color: #ff9100;
}

.van-step__icon--active,
.van-step__title--active {
  font-size: 24px;
}

.van-step--vertical:first-child::before {
  width: 0px;
  height: 0px;
}

[class*='van-hairline']::after {
  border: none;
}

.van-step--vertical .van-step__circle-container {
  top: 110px;
  width: 37px;
  height: 25px;
  background: rgba(255, 145, 0, 1);
  box-shadow: 0px 5px 10px 0px rgba(255, 145, 0, 1);
  border-radius: 0px 100px 100px 0px;
}
</style>
<style lang="scss" scoped>
.app-container {
  width: 375px;

  .shuaxinFont {
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(255, 204, 3, 1);
    padding-left: 5px;
    line-height: 15px;
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
      width: 315px;
      height: 60px;
      margin: 0 auto;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(128, 128, 128, 1);
      line-height: 20px;
    }

    .step {
      width: 315px;

      .stepbox {
        width: 315px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 10px 0px rgba(255, 204, 3, 0.5);
        border-radius: 10px;

        .number {
          position: absolute;
          left: -20px;
          top: 99px;
          z-index: 3;
          font-size: 16px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
          line-height: 22px;
        }

        .stepbox-top {
          width: 285px;
          height: 38px;
          margin: 0 auto;
          padding-top: 15px;
          padding-bottom: 9px;
          border-bottom: 1px solid #f5f5f5;

          .stepbox-top-title {
            width: 159px;
            height: 33px;
            font-size: 18px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(255, 145, 0, 1);
            line-height: 38px;
            margin-right: 25px;
            float: left;
          }

          .stepbox-top-button {
            width: 99px;
            height: 37px;
            background: linear-gradient(126deg, rgba(255, 232, 7, 1) 0%, rgba(255, 204, 3, 1) 100%);
            box-shadow: 0px 5px 10px 0px rgba(255, 204, 3, 0.5);
            border-radius: 19px;
            text-align: center;
            line-height: 37px;
            font-size: 14px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(42, 42, 40, 1);
            float: right;
          }

          .stepbox-top-button-off {
            width: 99px;
            height: 37px;
            background: rgba(128, 128, 128, 1);
            border-radius: 19px;
            font-size: 14px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(255, 255, 255, 1);
            line-height: 37px;
            text-align: center;
            float: right;
          }
        }

        .stepbox-bottom {
          width: 315px;
          margin-top: 14px;
          .stepbox-bottom-box {
            width: 300px;
            padding-left: 15px;
            .stepbox-bottom-box-flex {
              float: left;
              height: 94px;
              margin-right: 60px;
              margin-bottom: 15px;
            }
            .stepbox-bottom-box-flexnth-child {
              float: left;
              height: 94px;
              margin-bottom: 15px;
            }
          }
        }
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

    .gameDesc {
      width: 345px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 10px 0px rgba(255, 204, 3, 0.5);
      border-radius: 10px;

      .gameDesc-font {
        width: 315px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(128, 128, 128, 1);
        line-height: 20px;
        padding: 15px;

        a {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(255, 204, 3, 1);
        }
      }
    }
  }

  .screenshotHeight {
    width: 345px;
    height: 215px;

    div {
      width: 120px;
      height: 185px;
    }

    img {
      width: 120px;
      height: 185px;
      border-radius: 10px;
    }
  }

  .screenshotWidth {
    width: 345px;
    height: 140px;

    div {
      width: 185px;
      height: 110px;
    }

    img {
      width: 185px;
      height: 110px;
      border-radius: 10px;
    }
  }
  .screenshotVideo {
    width: 345px;
    height: 215px;

    div {
      width: 325px;
      height: 110px;
    }

    img {
      width: 325px;
      height: 110px;
      border-radius: 10px;
    }
  }
  .screenshot {
    margin: 0 auto;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 10px 0px rgba(255, 204, 3, 0.5);
    border-radius: 10px;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;

    .screenshot-box {
      display: inline-block;
      margin: 15px 10px;
    }
  }
}
</style>
