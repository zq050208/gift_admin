<template>
  <div class="bigbox">
    <div class="box">
      <div class="topBox">
        <img class="gameImg" :src="data.cover_img" />
        <div class="infoBox">
          <div class="title" v-text="data.name"></div>
          <div class="date">活动时间: {{ data.stime }}-{{ data.etime }}</div>
          <template v-if="data.class === 0">
            <router-link :to="{ name: 'giftinfo', params: { id: data.id }}">
              <GameButton message="点击领取"></GameButton>
            </router-link>
          </template>
          <template v-else>
            <router-link :to="{ name: 'bookinggift', params: { id: data.id }}">
              <GameButton message="点击预约"></GameButton>
            </router-link>
          </template>
        </div>
      </div>
      <div class="middle">
        <div class="left">参与活动即可获得以下礼包福利：</div>
        <div class="right">查看游戏详情</div>
      </div>
      <div class="bottom">
        <template v-for="(descItem , index) in data.gift_content">
          <template v-if="(index + 1) !== data.gift_content.length">
            <div class="iconmargin" >
              <GameGiftDesc :data="descItem"></GameGiftDesc>
            </div>
          </template>
          <template v-else>
            <div class="iconbox" >
              <GameGiftDesc :data="descItem"></GameGiftDesc>
            </div>
          </template>
        </template>
        <img class="moreIcon" v-if="data.gift_content" src="~@/assets/img/moreIcon.png">
        <template v-if="data.class === 0">
          <div class="giftMore">
            <router-link :to="{ name: 'giftinfo', params: { id: data.id }}">
              <div class="font">
                更多礼包
              </div>
            </router-link>
          </div>
        </template>
        <template v-else>
          <div class="giftMore">
            <router-link :to="{ name: 'bookinggift', params: { id: data.id }}">
              <div class="font">
                更多礼包
              </div>
            </router-link>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import GameButton from '@/components/GameButton'
import GameGiftDesc from '@/components/GameGiftDesc'
export default {
  name: 'GameDescSearch',
  props: {
    data: {
      type: Object / Array,
      default: []
    }
  },
  data() {
    return {
    }
  },
  mounted(){
  },
  methods: {},
  components: {
    GameButton,
    GameGiftDesc
  },
}
</script>

<style lang="scss" scoped>
.bigbox {
  width: 345px;
  height: 275px;
  border-radius: 12px;
  margin-top: 20px;
  .box {
    width: 345px;
    height: 275px;
    background: #f5f5f5;
    border-radius: 10px;
    .topBox {
      width: 331px;
      height: 107px;
      padding-left: 10px;
      padding-top: 15px;
      .gameImg {
        width: 96px;
        height: 96px;
        float: left;
        margin-right: 10px;
        border-radius: 10px;
      }
      .infoBox {
        float: right;
        .title {
          width: 225px;
          height: 40px;
          font-size: 16px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(42, 42, 40, 1);
          line-height: 20px;
        }
        .date {
          width: 225px;
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(128, 128, 128, 1);
          line-height: 20px;
          margin-top: 5px;
          margin-bottom: 5px;
        }
        .button {
          margin: 0 auto;
          width: 173px;
          height: 37px;
          background: linear-gradient(126deg, rgba(255, 232, 7, 1) 0%, rgba(255, 204, 3, 1) 100%);
          box-shadow: 0px 5px 10px 0px rgba(255, 204, 3, 0.5);
          border-radius: 19px;
          text-align: center;
          margin-top: 5px;
          .font {
            line-height: 37px;
            font-size: 14px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(42, 42, 40, 1);
          }
        }
      }
    }
    .middle {
      width: 325px;
      height: 14px;
      margin: 0 auto;
      margin-top: 20px;
      .left {
        width: 210px;
        height: 14px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(42, 42, 40, 1);
        line-height: 14px;
        float: left;
      }
      .right {
        width: 84px;
        height: 14px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 204, 3, 1);
        line-height: 14px;
        float: right;
        text-decoration: underline;
      }
    }
    .bottom {
      width: 325px;
      height: 94px;
      margin: 0 auto;
      margin-top: 10px;
      .iconmargin{
        width: 55px;
        height: 94px;
        margin-right: 10px;
        float: left;
      }
      .iconbox {
        width: 55px;
        height: 94px;
        margin: 0;
        float: left;
      }
      .moreIcon {
        width: 8px;
        margin-left: 3.5px;
        margin-right: 3.5px;
        margin-top: 26px;
        height: 2px;
        float: left;
      }
      .giftMore {
        width: 53px;
        height: 45px;
        padding-top: 8px;
        border-radius: 5px;
        border: 1px solid rgba(255, 204, 3, 1);
        float: left;
        .font {
          width: 28px;
          height: 40px;
          margin: 0 auto;
          text-align: center;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(255, 204, 3, 1);
        }
      }
    }
  }
}
</style>
