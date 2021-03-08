<template>
  <div :class="'down-button down-' + pattern">
    <div class="font">{{ message }}</div>
  </div>
</template>

<script>

export default {
  name: 'GameButton',
  props: {
    message: {
        type: String,
        default: ''
    },
    pattern: {
      type: String,
      default: 'px173'
    },
  },
  data() {
    return {
    }
  },
  methods: {
  
  }
}
</script>

<style lang="scss" scoped>
.down-button{
  height:37px;
  margin: 0 auto;
  background:linear-gradient(126deg,rgba(255,232,7,1) 0%,rgba(255,204,3,1) 100%);
  box-shadow:0px 5px 10px 0px rgba(255,204,3,0.5);
  border-radius:19px;
  .font{
      text-align: center;
      font-size:14px;
      font-family:PingFangSC-Semibold,PingFang SC;
      font-weight:600;
      color:rgba(42,42,40,1);
      line-height:37px;
  }
}
.down-button-off{
  height:37px;
  margin: 0 auto;
  background:rgba(128,128,128,1);
  box-shadow:none;
  border-radius:19px;
  .font{
      text-align: center;
      font-size:14px;
      font-family:PingFangSC-Semibold,PingFang SC;
      font-weight:600;
      color:rgba(255,255,255,1);
      line-height:37px;
  }
}
.down-px173{
  width:173px;
}
.down-px108{
  width:108px;
}
</style>
