<template>
  <van-dialog
    v-model="loginbox"
    show-cancel-button
    confirm-button-text="登录"
    cancel-button-text="返回"
    confirmButtonColor="#FFCC03"
    :beforeClose="cloneLogin"
  >
    <div class="cloneimgdiv" @click="clonebox()">
      <img src="~@/assets/img/clone.png" class="cloneimg">
    </div>
    <div class="showbox-bookinggift">
      <div class="showbox-title-showbookingok">您好，请先登录</div>
    </div>
  </van-dialog>
</template>

<script>
export default {
  name: 'Login',
  props: {
    status: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      loginbox: false
    }
  },
  mounted() {
  },
  methods: {
    clonebox(){
      this.$emit("changeShow",false);
    },
    cloneLogin: function(action, done) {
      window.checkLogin()
      if (action === 'confirm') {
        if(window.userID == 0){
          var res = window.callLogin()
          if(res === false){
            this.$emit('changeShow', false, '')
          }else{
            this.$emit('changeShow', false, 'ok')
          }
        }
      } else {
        this.$emit('changeShow', false, 'clone')
      }
      done()
    }
  },
  watch: {
    status(val) {
      this.loginbox = val
      window.checkLogin()
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
  flex:none !important;
  border: none !important;
  margin-top: 15px;
}
.van-dialog__cancel{
  width:108px !important;
  height:32px !important;
  border-radius:16px !important;
  border:1px solid rgba(217,217,217,1) !important;
  line-height: 32px !important;
  flex:none !important;
  font-size:14px !important;
  font-family:PingFangSC-Regular,PingFang SC !important;
  font-weight:400 !important;
  color:rgba(140,140,140,1) !important;
  margin-left: 25px;
  margin-right: 29px;
  margin-top: 15px;
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
.showbox-bookinggift {
  border-bottom: 1px solid #F2F2F2;
.showbox-title-showbookingok {
    width: 245px;
    margin: 0 auto;
    font-size: 14px;
    text-align: center;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(38, 38, 39, 1);
    line-height: 22px;
    margin-top: 50px;
    margin-bottom: 60px;
  }
}
</style>
