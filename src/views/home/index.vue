<template>
  <div class="app-container">
    <div class="banner">
      <div class="mygiftButton"><router-link to="/mygift"><div class="font">我的礼包</div></router-link></div>
    </div>
    <div class="warpper">
      <div class="content">
        <router-link to="/search">
          <van-search
            shape="round"
            background="transparent"
            placeholder="请输入搜索关键词"
            padding="0"
          />
        </router-link>
        <template v-for="(item) in indexList">
          <template v-for="(vo) in item">
            <GameDesc :data="vo"></GameDesc>
          </template>
        </template>
        <center><van-loading color="#1989fa" v-if="loading"/></center>
        <div class="over" v-if="stopPage">
          <img class="left" src="~@/assets/img/juxing.png">
          <div class="middle">已全部加载完毕</div>
          <img class="right" src="~@/assets/img/juxingright.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//api 
// 获取首页信息
import {getIndexList} from '@/api/detail.js'

import Search from '@/components/Search'
import GameDesc from '@/components/GameDesc'
export default {
  data() {
    return {
      page: 1,
      indexList:[],
      loading:false,
      stopPage:false,
    }
  },
  components: {
    Search,
    GameDesc
  },
  created(){
    window.checkLogin()
  },
  mounted() {
    this.scrollLoadMore()
    var _this = this;
    window.addEventListener('scroll', function(){
      var scr = document.documentElement.scrollTop || document.body.scrollTop; // 向上滚动的那一部分高度
      var clientHeight = document.documentElement.clientHeight; // 屏幕高度也就是当前设备静态下你所看到的视觉高度
      var scrHeight = document.documentElement.scrollHeight || document.body.scrollHeight; // 整个网页的实际高度，兼容Pc端
      if(scr + clientHeight + 10 >= scrHeight){
        if(_this.stopPage === false){ //this.isMoreLoad控制滚动是否加载更多
          _this.scrollLoadMore();
        }else{
          return;
        }
      }
    });
  },
  methods: {
    scrollLoadMore() {
      // 防止多次加载
      if (this.loading || this.stopPage) {
        return false
      }
      this.loading = true
      const params = {page: this.page}
      getIndexList(params)
      .then(res => {
        var status = res.data.status
        if (status === 1) {
          var data = res.data.data
          this.indexList.push(data)
          this.loading = false
          this.page = this.page + 1
        } else if (status === 2 && code !== 20001) {
          this.loading = false
        }else{
          this.page = this.page + 1
          this.stopPage = true
          this.loading = false
        }
        
      })
      .catch(res => {
        this.$toast.fail('请等待片刻')
        this.loading = false
      })
    },
    // queryGetIndexList:function(){
    //   const params = {page: this.page}
    //   getIndexList(params)
    //   .then((res) => {
    //     let status = res.data.status
    //     if(status === 1){
    //       let data = res.data.data
    //       this.indexList.push(data)
    //     }else if(status === 2 && code !== 20001){
    //       this.$toast.fail('请等待片刻')
    //     }
    //   })
    //   .catch((res) => {
    //     this.$toast.fail('请等待片刻')
    //   })
    // },
    getSearchResult:function(){
      this.page = 1
    }
  },
  watch: {
    $route: function(to, from) {
      this.getSearchResult()
    }
  }
}
</script>
<style>
.warpper .van-search__content--round {
  border:1px solid rgba(255,204,3,1);
}
.warpper .van-search {
  padding:0;
  height: 38px;
}
.warpper .van-cell {
  line-height: 30px;
}
.warpper .van-field__left-icon .van-icon, .van-field__right-icon .van-icon {
    font-size: 18px;
}
</style>
<style lang="scss" scoped>
.app-container {
  padding: 0;
  margin: 0;
  background-color: #FFF1B6;
  .banner {
    margin: 0 auto;
    background: url('~@/assets/img/banner.png') center / contain no-repeat;
    background-size: 100%;
    width:375px;
    height:245px;
    .mygiftButton{
      width:79px;
      height:35px;
      background:linear-gradient(126deg,rgba(255,232,7,1) 0%,rgba(255,204,3,1) 100%);
      box-shadow:0px 5px 10px 0px rgba(255,204,3,0.6);
      border-radius:19px 0px 0px 19px;
      border:1px solid rgba(255,204,3,1);
      right: 0%;
      position: absolute;
      top: 185px;
      .font{
        width:70px;
        padding-left: 10px;
        height:37px;
        font-size:14px;
        font-family:PingFangSC-Semibold,PingFang SC;
        font-weight:600;
        color:rgba(42,42,40,1);
        line-height:37px;
        text-align: center;
      }
    }
  }
  .warpper {
    background: url('~@/assets/img/top_yun.png') top / contain ;
    .content{
      width: 345px;
      margin: 0 auto;
      margin-top: 15px;
    }
  }
}
</style>
