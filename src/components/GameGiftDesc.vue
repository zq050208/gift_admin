<template>
  <div class="GameGiftDesc-gameBox">
    <img class="giftIcon" :src="data.url" />
    <div class="giftTitle" v-html="$options.filters.titleBuild(data.name)"></div>
  </div>
</template>

<script>
export default {
  name: 'GameGiftDesc',
  props: {
    data: {
        type: Object/Array,
        default: []
    },
  },
  data() {
    return {}
  },
  methods: {},
  filters: {
    titleBuild: function (value) {
      return value.replace(',',"<br/>")
    }
  }
}
</script>
<style lang="scss" scoped>
.GameGiftDesc-gameBox {
  width: 55px;
  height: 94px;
  .giftIcon {
    width: 55px;
    height: 55px;
    border-radius: 5px;
  }
  .giftTitle {
    width: 55px;
    height: 34px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(128, 128, 128, 1);
    line-height: 17px;
    text-align: center;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    white-space:normal;
  }
}
</style>
