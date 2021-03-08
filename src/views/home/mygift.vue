<!-- home -->
<template>
  <div class="app-container">
    <ReturnNavBox message="我的礼包"></ReturnNavBox>
    <template v-if="emptyBox">
      <van-empty class="custom-image" image="https://img.yzcdn.cn/vant/custom-empty-image.png" description="暂无礼包" />
    </template>
    <template v-else>
      <div class="result">
        <template v-for="item in gift">
          <div class="result-box">
            <div class="result-left">
              <img :src="item.cover_img" />
            </div>
            <div class="result-middle">
              <div class="result-middle-title">{{ item.gift_name }}</div>
              <div class="result-middle-content" @click="openInfoBox(item.receive_gift_desc)">
                礼包详情：{{ item.receive_gift_desc }}
              </div>
            </div>
            <div class="result-right" @click="openCodeBox(item.cokey)">
              <GameButton message="复制礼包码" pattern="px108"></GameButton>
            </div>
          </div>
        </template>
      </div>
    </template>
    <div class="result-hotgame">
      <div class="result-hotgame-title">热门游戏礼包</div>
      <div class="result-hotgame-box">
        <template v-for="item in hotGift">
          <div class="hotgame-box">
            <router-link :to="item.url">
              <div class="hotgame-img">
                <img src="~@/assets/img/hot_icon.png" class="hotgame-box-icon" />
                <div class="hotgame-box-icon-font">热门</div>
                <img :src="item.cover_img" class="hotgame-box-img" />
              </div>
              <div class="hotgame-box-title">{{ item.name }}</div>
            </router-link>
          </div>
        </template>
      </div>
    </div>
    <van-dialog v-model="giftCodeShow" confirm-button-text="关闭" confirmButtonColor="#FFCC03">
      <div class="showbox-bookinggift">
        <div class="showbox-title-showbookingok codebox">已复制礼包码:{{ cokeyNumber }}</div>
      </div>
    </van-dialog>
    <van-dialog v-model="giftInfoShow" confirm-button-text="关闭" confirmButtonColor="#FFCC03">
      <div class="showbox-bookinggift">
        <div class="showbox-title-showbookingok">礼包详情:{{ infoMes }}</div>
      </div>
    </van-dialog>
    <Login @changeShow="loginShow" :status="loginBox"></Login>
  </div>
</template>

<script>
// api
// 我的礼包
import {myGiftList} from '@/api/gift.js'
// 热门礼包
import {hotGiftList} from '@/api/detail.js'

import ReturnNavBox from '@/components/ReturnNavBox'
import GameButton from '@/components/GameButton'
import Login from '@/components/gift_dialog/Login'
export default {
  data() {
    return {
      giftInfoShow: false,
      loginBox: false,
      emptyBox: false,
      giftCodeShow: false,
      // 分页
      page: 1,
      // 我的礼包
      gift: [],
      // 热门礼包
      hotGift: [],
      // 激活码
      cokeyNumber: '',
      uid: window.userID,
      infoMes: ''
    }
  },
  components: {
    ReturnNavBox,
    GameButton,
    Login
  },
  computed: {},
  created() {
    window.checkLogin()
  },
  mounted() {
    this.queryGiftList()
    this.queryHotGiftList()
  },
  methods: {
    loginShow(val, type) {
      this.loginBox = val
      if (type === 'ok') {
        this.$router.push({name: 'index'})
      }
    },
    // 查询用户礼包列表
    queryGiftList: function() {
      window.checkLogin()
      if (window.userID == 0) {
        this.loginBox = true
        return false
      }

      const params = {uid: window.userID, page: this.page}
      myGiftList(params)
        .then(res => {
          let status = res.data.status
          if (status === 1) {
            let data = res.data.data
            this.gift = data
          } else {
            this.emptyBox = true
          }
        })
        .catch(res => {
          this.$toast.fail('请等待片刻')
        })
    },
    // 查询热门礼包列表
    queryHotGiftList: function() {
      hotGiftList()
        .then(res => {
          let status = res.data.status
          if (status === 1) {
            let data = res.data.data
            this.hotGift = data
          }
        })
        .catch(res => {
          this.$toast.fail('请等待片刻')
        })
    },
    openCodeBox: function(cokey) {
      this.cokeyNumber = cokey
      this.$copyText(cokey)
        .then(res => {
          this.giftCodeShow = true
        })
        .catch(err => {
          this.$toast.fail('复制失败')
        })
    },
    openInfoBox(info) {
      this.giftInfoShow = true
      this.infoMes = info
    }
  }
}
</script>
<style>
.van-dialog {
  border-radius: 5px;
}
.custom-image .van-empty__image {
  width: 90px;
  height: 90px;
}
</style>
<style lang="scss" scoped>
.app-container {
  background: #ffffff;
  .showbox-bookinggift {
    width: 245px;
    margin: 0 auto;
    .showbox-title-showbookingok {
      width: 245px;
      font-size: 14px;
      text-align: center;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 400;
      color: rgba(38, 38, 39, 1);
      line-height: 22px;
      margin-top: 40px;
      margin-bottom: 10px;
    }
    .codebox {
      width: 245px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .result {
    width: 345px;
    margin: 0 auto;
    .result-box {
      width: 345px;
      height: 60px;
      padding: 20px 0px;
      border-bottom: 1px solid #f5f5f5;
      .result-left {
        width: 60px;
        height: 60px;
        margin-right: 10px;
        float: left;
        img {
          width: 60px;
          height: 60px;
          border-radius: 10px;
        }
      }
      .result-middle {
        width: 142px;
        float: left;
        margin-right: 25px;
        .result-middle-title {
          width: 142px;
          font-size: 16px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(42, 42, 40, 1);
          line-height: 16px;
          margin-bottom: 5px;
        }
        .result-middle-content {
          width: 142px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(128, 128, 128, 1);
          line-height: 20px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
      .result-right {
        width: 108px;
        float: left;
        margin-top: 12px;
      }
    }
  }
  .result-hotgame {
    width: 345px;
    margin: 0 auto;
    margin-top: 47px;
    padding-bottom: 40px;
    .result-hotgame-title {
      width: 120px;
      height: 24px;
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(42, 42, 40, 1);
      line-height: 24px;
    }
    .result-hotgame-box {
      width: 345px;
      height: 310px;
      margin-top: 15px;
      .hotgame-box {
        width: 92px;
        height: 155px;
        float: left;
        margin-top: 15px;
        margin-right: 33px;
        .hotgame-img {
          width: 90px;
          height: 90px;
          margin-bottom: 8px;
          .hotgame-box-icon {
            width: 70px;
            height: 22px;
            position: absolute;
          }
          .hotgame-box-icon-font {
            width: 28px;
            height: 20px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(42, 42, 40, 1);
            line-height: 22px;
            position: absolute;
            padding-left: 20px;
          }
          .hotgame-box-img {
            width: 90px;
            height: 90px;
            border-radius: 10px;
          }
        }
        .hotgame-box-title {
          width: 90px;
          height: 60px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(42, 42, 40, 1);
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
      }
      .hotgame-box:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
}
</style>
