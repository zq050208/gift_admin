<template>
  <van-dialog
    v-model="showbox"
    show-cancel-button
    confirm-button-text="进入游戏"
    cancel-button-text="关闭"
    confirmButtonColor="#FFCC03"
    :beforeClose="clone"
  >
  <div class="cloneimgdiv" @click="clonebox()">
      <img src="~@/assets/img/clone.png" class="cloneimg" />
    </div>
    <div class="ReceiveGiftCode-showbox">
      <div class="ReceiveGiftCode-showbox-title">恭喜您，已领取成功</div>
      <div class="ReceiveGiftCode-showbox-codebox">
        <div class="ReceiveGiftCode-gamecode">游戏礼包码:{{ code }}</div>
        <div class="ReceiveGiftCode-copy" @click="copyGameCode(code)">复制</div>
      </div>
      <div class="ReceiveGiftCode-showbox-desc">礼包码已保存到我的礼包，若暂不使用，下次可进入“我的礼包”→“已领取礼包列表”查看</div>
    </div>
  </van-dialog>
</template>

<script>
export default {
  name: 'ReceiveGiftCode',
  props: {
    code: {
      type: String,
      default: ''
    },
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
    },
    copyGameCode: function(message) {
      this.$copyText(message)
        .then(res => {
          this.$toast.success('复制成功')
        })
        .catch(err => {
          this.$toast.fail('复制失败')
        })
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
.ReceiveGiftCode-showbox {
  border-bottom: 1px solid #f2f2f2;
  .ReceiveGiftCode-showbox-title {
    margin: 0 auto;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(38, 38, 39, 1);
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .ReceiveGiftCode-showbox-codebox {
    margin: 0 auto;
    width: 245px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid rgba(204, 204, 204, 1);
    .ReceiveGiftCode-gamecode {
      width: 175px;
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(38, 38, 39, 1);
      line-height: 20px;
      float: left;
      padding: 10px;
      overflow:hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .ReceiveGiftCode-copy {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 204, 3, 1);
      line-height: 20px;
      float: right;
      padding: 10px;
    }
  }
  .ReceiveGiftCode-showbox-desc {
    margin: 0 auto;
    width: 245px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(128, 128, 128, 1);
    line-height: 17px;
    margin-top: 10px;
    margin-bottom: 40px;
  }
}
</style>
