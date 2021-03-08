<template>
  <van-dialog v-model="showbox" confirm-button-text="好的" confirmButtonColor="#FFCC03" :beforeClose="clone">
    <div class="cloneimgdiv" @click="clonebox()">
      <img src="~@/assets/img/clone.png" class="cloneimg" />
    </div>
    <div class="bookingok-bookinggift">
      <div class="bookingok-title-showbookingok">已预约成功，游戏上线</div>
      <div class="bookingok-desc">温馨提示：游戏上线后，我们会通过【手机短信】提醒你来下载游戏和领取福利！</div>
    </div>
  </van-dialog>
</template>
<script>
export default {
  name: 'BookingOk',
  props: {
    status: {
      type: Boolean,
      default: true
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
    clone: function(action, done) {
      this.$emit('changeShow', false)
      done()
    }
  },
  watch: {
    status(val) {
      this.showbox = val
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
.bookingok-bookinggift {
  border-bottom: 1px solid #f2f2f2;
  .bookingok-title {
    width: 245px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(38, 38, 39, 1);
    line-height: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin: 0 auto;
  }
  .bookingok-title-showbookingok {
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
  .bookingok-desc {
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
