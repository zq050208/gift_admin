<template>
  <div class="app" id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
import TabBar from '@/components/TabBar'

export default {
  data() {
    return {
    }
  },
  name: 'App',
  components: {
    TabBar
  },
  methods:{
    
  }
}
</script>

<style lang="scss">
body {
  -webkit-text-size-adjust: none !important;
}
body {
  -webkit-text-size-adjust: 100% !important;
}
.over {
  margin: 0 auto;
  margin-top: 20px;
  width: 206px;
  height: 20px;
  padding-bottom: 20px;
  .left {
    width: 49px;
    height: 2px;
    float: left;
    padding-top: 9px;
  }
  .middle {
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(247, 211, 152, 1);
    line-height: 20px;
    float: left;
    margin-left: 5px;
    margin-right: 5px;
  }
  .right {
    width: 49px;
    height: 2px;
    float: left;
    padding-top: 9px;
  }
}
</style>
