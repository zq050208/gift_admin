<template>
    <div :class="'GameTitle-box GameTitle-' + pattern">
        <img class="img" src="~@/assets/img/title_left.png">
        <div class="middle">{{ message }}</div>
        <img class="img" src="~@/assets/img/title_right.png">
    </div>
</template>

<script>

export default {
  name: 'GameTitle',
  props: {
    message: {
        type: String,
        default: ''
    },
    pattern: {
        type: String,
        default: ''
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
.GameTitle-box{
    height:20px;
    margin: 0 auto;
    text-align: center;
    .img{
        width: 28px;
        height: 10px;
        float: left;
        padding-top: 5px;
    }
    .middle{
        font-size:20px;
        font-family:PingFangSC-Semibold,PingFang SC;
        font-weight:600;
        color:rgba(255,145,0,1);
        line-height:20px;
        float: left;
        margin-left: 5px;
        margin-right: 5px;
    }
}
.GameTitle-receive{
    width:206px;
}
.GameTitle-newbie{
    width:146px;
}
.GameTitle-notifyfriends{
    width:286px;
}
.GameTitle-booking{
    width:246px;
}
</style>
