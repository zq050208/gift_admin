<template>
  <van-dialog
    v-model="showbox"
    show-cancel-button
    confirm-button-text="确定"
    cancel-button-text="关闭"
    confirmButtonColor="#FFCC03"
    :beforeClose="cloneBooking"
  >
    <div class="cloneimgdiv" @click="clonebox()">
      <img src="~@/assets/img/clone.png" class="cloneimg" />
    </div>
    <div class="bookingClone-bookinggift">
      <div class="bookingClone-title-showbookingok">您确定要取消预约吗?</div>
      <div class="bookingClone-desc">温馨提示：取消预约将不能获取游戏开测相关一手资料，同时也不能领取预约礼包哦！</div>
    </div>
  </van-dialog>
</template>
<script>
// 预约礼包逻辑
import {bookingGift} from '@/api/gift.js'
export default {
  name: 'BookingClone',
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
      showbox: false
    }
  },
  methods: {
    clonebox() {
      this.$emit('changeShow', false)
    },
    // 取消预约
    cloneBooking: function(action, done) {
      if (action === 'confirm') {
        const params = {gift_id: this.giftID, uid: window.userID, type: 1}
        bookingGift(params)
          .then(res => {
            let status = res.data.status
            let msg = res.data.msg
            let code = res.data.code
            let data = res.data.data
            if (status === 1 && code === 1) {
              this.$toast.success('取消预约成功')
              this.$emit('changeShow', false, 'reserveStatus')
            } else {
              this.$toast.fail(msg)
              this.$emit('changeShow', false, '')
            }
          })
          .catch(res => {
            this.$toast.fail('请等待片刻')
            this.$emit('changeShow', false, '')
          })
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
.bookingClone-bookinggift {
  border-bottom: 1px solid #F2F2F2;
  .bookingClone-title {
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
  .bookingClone-title-showbookingok {
    margin: 0 auto;
    width: 245px;
    font-size: 14px;
    text-align: center;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(38, 38, 39, 1);
    line-height: 22px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .bookingClone-desc {
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
