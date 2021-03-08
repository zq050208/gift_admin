<template>
  <div class="app-container">
    <van-search
        v-model="value"
        shape="round"
        show-action
        placeholder="请输入你想要的游戏名称"
        @search="onSearch"
        @cancel="onCancel"
      />
      <div class="keyword" v-if="keyword">关键字： “{{ keyword }}” 的搜索结果</div>
    <template v-if="empty">
      <van-empty
        class="custom-image"
        image="~@/assets/img/wechat.png"
        description="抱歉，暂时没有搜到对应礼包"
      />
    </template>
    <template v-else>
      <div class="content">
        <template v-for="(item) in indexList">
          <template v-for="(vo) in item">
            <GameDescSearch :data="vo"></GameDescSearch>
          </template>
        </template>
      </div>
    </template>
    
    <center><van-loading color="#1989fa" v-if="loading"/></center>
  </div>
</template>
<script>
//api
// 获取首页信息
import {getIndexList} from '@/api/detail.js'

import GameDescSearch from '@/components/GameDescSearch'
export default {
  data() {
    return {
      value: '',
      page: 1,
      indexList: [],
      keyword: '',
      loading:false,
      stopPage:false,
      empty:false,
    }
  },
  components: {
    GameDescSearch
  },
  mounted() {
    var _this = this;
    window.addEventListener('scroll', function(){
      var scr = document.documentElement.scrollTop || document.body.scrollTop; // 向上滚动的那一部分高度
      var clientHeight = document.documentElement.clientHeight; // 屏幕高度也就是当前设备静态下你所看到的视觉高度
      var scrHeight = document.documentElement.scrollHeight || document.body.scrollHeight; // 整个网页的实际高度，兼容Pc端
      if(scr + clientHeight + 10 >= scrHeight){
        if(_this.stopPage === false && _this.keyword){ //this.isMoreLoad控制滚动是否加载更多
          _this.scrollLoadMore();
        }else{
          return false;
        }
      }
    });
  },
  methods: {
    onSearch(val) {
      this.indexList = []
      this.stopPage = false
      this.page = 1
      this.keyword = val
      this.scrollLoadMore()
    },
    scrollLoadMore() {
      // 防止多次加载
      if (this.loading || this.stopPage) {
        return false
      }
      this.loading = true
      const params = {page: this.page, search: this.keyword}
      getIndexList(params)
      .then(res => {
        let status = res.data.status
        if (status === 1) {
          let data = res.data.data
          this.indexList.push(data)
          this.loading = false
          this.page = this.page + 1
          this.empty = false
        } else if (status === 2 && code !== 20001) {
          this.$toast.fail('请等待片刻')
          this.loading = false
        }else{
          this.page = this.page + 1
          this.stopPage = true
          this.loading = false
          if(this.indexList.length === 0){
            this.empty = true
          }
        }
        
      })
      .catch(res => {
        this.$toast.fail('请等待片刻')
        this.loading = false
      })
    },
    onCancel() {
      this.$router.go(-1)
    }
  }
}
</script>
<style>
html{
  background: #ffffff;
}
.van-empty__image img {
  width: 0px;
  height: 0px;
  padding: 0px;
  margin: 0px;
  border: none;
}
.van-empty__image{
  background:url('~@/assets/img/emptyBox.png') center no-repeat;
}
</style>
<style lang="scss" scoped>

.app-container {
  background: #ffffff;
  .keyword {
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(128, 128, 128, 1);
    line-height: 20px;
    padding: 10px 15px;
    border-bottom: 1px solid #f5f5f5;
  }
  .content {
    width: 345px;
    margin: 0 auto;
    margin-top: 15px;
    padding-bottom: 15px;
  }
}
</style>
