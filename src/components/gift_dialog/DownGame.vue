<template>
  <van-dialog
      v-model="showbox"
      show-cancel-button
      confirm-button-text="下载游戏"
      cancel-button-text="返回"
      confirmButtonColor="#FFCC03"
      :beforeClose="clone"
  >
    <div class="cloneimgdiv" @click="clonebox()">
      <img src="~@/assets/img/clone.png" class="cloneimg">
    </div>
    <div class="Down-bookinggift">
      <div class="Down-title-showbookingok">{{ info }}</div>
    </div>
  </van-dialog>
</template>
<script>
export default {
  name: 'DownGame',
  props: {
    status: {
      type: Boolean,
      default: true
    },
    uid:{
      type: String / Number,
      default: 0
    },
    gameInfo:{
      type: Array / Object,
      default: []
    },
    info:{
      type: String,
      default: '您好，请先下载游戏后才可领取礼包哦！'
    }
  },
  data() {
    return {
      showbox:false,
    }
  },
  methods: {
    clonebox(){
      this.$emit("changeShow",false);
    },
    clone: function(action, done) {
      if (action === 'confirm') {
        // var down = window.callAPKPackger(this.gameInfo.download_url , this.gameInfo.package)
        window.clickInfo(this.gameInfo.remote_id)
        // window.location.href = 'http://down.57k.com/sdkgame/xbdland_60506/xbdland_60506_1094.apk'
      }
      this.$emit("changeShow",false);
      done()
    },
  },
  watch:{
    status(val){
      this.showbox = val
    }
  }
}
</script>
<style>
.van-dialog{
  width: 295px;
  border-radius: 5px !important;
}
.van-dialog__footer{
  text-align: center;
  padding-bottom: 15px;
}
.van-dialog__footer--buttons{
  display: block;
}
.van-dialog__confirm{
  width:108px !important;
  height:32px !important;
  background:linear-gradient(126deg,rgba(255,232,7,1) 0%,rgba(255,204,3,1) 100%);
  border-radius:16px;
  font-size:14px !important;
  font-family:PingFangSC-Semibold,PingFang SC !important;
  font-weight:600 !important;
  color:rgba(42,42,40,1) !important;
  line-height: 32px !important;
  border: none !important;
  margin-top: 15px;
  margin-right: 5px;
}
.van-dialog__cancel{
  width:108px !important;
  height:32px !important;
  border-radius:16px !important;
  border:1px solid rgba(217,217,217,1) !important;
  line-height: 32px !important;
  font-size:14px !important;
  font-family:PingFangSC-Regular,PingFang SC !important;
  font-weight:400 !important;
  color:rgba(140,140,140,1) !important;
  margin-right: 29px;
  margin-top: 15px;
  margin-left: 5px;
}
[class*=van-hairline]::after{
  border: none;
}
</style>
<style lang="scss" scoped>
.cloneimgdiv{
  width: 100%;
  height: 15px;
  padding-top: 15px;
  .cloneimg{
    width: 15px;
    height: 15px;
    float: right;
    padding-right: 15px;
  }
}
.Down-bookinggift {
  border-bottom: 1px solid #F2F2F2;
  .Down-title-showbookingok {
    width: 245px;
    margin: 0 auto;
    font-size: 14px;
    text-align: center;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(38, 38, 39, 1);
    line-height: 22px;
    margin-top: 30px;
    margin-bottom: 60px;
  }
}
</style>
