<template>
  <div class="NavBar">
  <van-nav-bar
    :title="message"
    left-arrow
    @click-left="onClickLeft"
    border
    fixed
    z-index="3"
  />
  </div>
</template>

<script>
export default {
  name: 'ReturnNavBox',
  props: {
    message: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
  }
}
</script>
<style>
.van-nav-bar .van-icon {
  color: #000000;
}
</style>
<style lang="scss" scoped>
.NavBar{
  height: 40px;
}
</style>
