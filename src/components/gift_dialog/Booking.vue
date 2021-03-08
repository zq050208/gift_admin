<template>
  <van-dialog
    v-model="showbox"
    show-cancel-button
    confirmButtonText="立即预约"
    confirmButtonColor="#FFCC03"
    :beforeClose="postBooking"
  >
    <div class="cloneimgdiv" @click="clonebox()">
      <img src="~@/assets/img/clone.png" class="cloneimg" />
    </div>
    <div class="showbox-bookinggift">
      <div class="showbox-title">小虎Hoo支持手机短信预约，请在下方输入你的手机号码</div>
      <div class="showbox-codebox">
        <input type="number" placeholder="请输入手机号码" v-model="mobile" />
      </div>
      <div v-if="showMobileWarning" class="mobilewarning">请输入正确的手机号</div>
      <div class="showbox-desc">温馨提示：游戏上线后，我们会通过【手机短信】提醒你来下载游戏和领取福利！</div>
    </div>
  </van-dialog>
</template>
<script>
// 预约礼包逻辑
import {bookingGift} from '@/api/gift.js'
export default {
  name: 'Booking',
  props: {
    status: {
      type: Boolean,
      default: true
    },
    giftID: {
      type: String / Number,
      default: 0
    }
  },
  data() {
    return {
      showbox: false,
      mobile: '',
      showMobileWarning: false
    }
  },
  methods: {
    clonebox() {
      this.$emit('changeShow', false)
    },
    // 预约
    postBooking: function(action, done) {
      if (action === 'confirm') {
        if (this.showMobileWarning === false && this.mobile) {
          const params = {gift_id: this.giftID, uid: window.userID, type: 0, mobile: this.mobile}
          bookingGift(params)
            .then(res => {
              let status = res.data.status
              let msg = res.data.msg
              let code = res.data.code
              let data = res.data.data
              if (status === 1 && code === 2) {
                this.$emit('changeShow', false, 'showBookingOk', 'reserveStatus')
              } else {
                this.$emit('changeShow', false, '', '')
                this.$toast.fail(msg)
              }
            })
            .catch(res => {
              this.$emit('changeShow', false, '', '')
              this.$toast.fail('请等待片刻')
            })
        } else {
          this.$toast.fail('请输入正确的手机号码')
          done(false)
        }
      }else{
        this.$emit('changeShow', false, '')
      }
      done()
    }
  },
  watch: {
    status(val) {
      this.showbox = val
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
  width: 295px;
  border-radius: 5px !important;
}
.van-dialog__footer {
  text-align: center;
  padding-bottom: 15px;
}
.van-dialog__footer--buttons {
  display: block;
}
.van-dialog__confirm {
  width: 108px !important;
  height: 32px !important;
  background: linear-gradient(126deg, rgba(255, 232, 7, 1) 0%, rgba(255, 204, 3, 1) 100%);
  border-radius: 16px;
  font-size: 14px !important;
  font-family: PingFangSC-Semibold, PingFang SC !important;
  font-weight: 600 !important;
  color: rgba(42, 42, 40, 1) !important;
  line-height: 32px !important;
  border: none !important;
  margin-top: 15px;
  margin-left: 5px !important;
}
.van-dialog__cancel {
  width: 108px !important;
  height: 32px !important;
  border-radius: 16px !important;
  border: 1px solid rgba(217, 217, 217, 1) !important;
  line-height: 32px !important;
  font-size: 14px !important;
  font-family: PingFangSC-Regular, PingFang SC !important;
  font-weight: 400 !important;
  color: rgba(140, 140, 140, 1) !important;
  margin-right: 29px;
  margin-top: 15px;
  margin-right: 5px;
}
[class*='van-hairline']::after {
  border: none;
}
</style>
<style lang="scss" scoped>
.cloneimgdiv {
  width: 100%;
  height: 15px;
  padding-top: 15px;
  .cloneimg {
    width: 15px;
    height: 15px;
    float: right;
    padding-right: 15px;
  }
}
.showbox-bookinggift {
  border-bottom: 1px solid #f2f2f2;
  .showbox-title {
    margin: 0 auto;
    width: 245px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(38, 38, 39, 1);
    line-height: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .showbox-title-showbookingok {
    margin: 0 auto;
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
    margin: 0 auto;
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
    width: 245px;
    margin: 0 auto;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(242, 45, 107, 1);
    line-height: 17px;
  }
  .showbox-desc {
    margin: 0 auto;
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
</style>
