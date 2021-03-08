<template>
  <input class="inputBox" placeholder="请输入你想要的游戏名称">
</template>

<script>

export default {
  name: 'Search',
  data() {
    return {
    }
  },
  methods: {
  
  }
}
</script>

<style lang="scss" scoped>

.inputBox {
  margin: 0 auto;
  width:307px;
  height:34px;
  margin: 0 auto;
  background:url('~@/assets/img/Fill_2.png') no-repeat 10px 11px;
  background-size:16px;
  border-radius:19px;
  border:1px solid rgba(255,204,3,1);
  padding-left: 30px;
  background-color: #FFF;
  font-size:14px;
  font-family:PingFangSC-Medium,PingFang SC;
  font-weight:500;
  line-height:20px;
}
</style>
