<template>
  <div class="movie">
    <loading v-if="musicmv.length==0"></loading>
    <music-movie :musicmv="musicmv"></music-movie>
    <music-title>视频详情</music-title>
    <loading v-if="mvtext.length==0"></loading>
    <div class="text">
      <h2>MV名称：{{mvtext.name}}</h2>
      <h2>歌手：{{mvtext.artistName}}</h2>
    </div>
    <div class="date">发行日期：{{mvtext.publishTime}}</div>
    <p :class="{'click':!showall}">{{mvtext.desc}}</p>
    <h2 class="show"
        @click="showall=!showall"
        v-if="mvtext.desc">{{word}}</h2>
    <music-title>精彩评论</music-title>
    <loading v-if="!pinglun"></loading>
    <ping-lun :pinglun="pinglun"></ping-lun>
  </div>
</template>

<script>
import Loading from '../components/Loading.vue';
import MusicMovie from '../components/MusicMovie.vue'
import MusicTitle from '../components/MusicTitle.vue';
import PingLun from '../components/PingLun.vue';
export default {
  components: { MusicMovie, PingLun, MusicTitle, Loading },
  props:
    ["listid"],
  data () {
    return {
      musicmv: [],
      pinglun: null,
      mvtext: [],
      showall: true
    }
  },
  created () {
    this.axios.get(`/mv/url?id=${this.listid}`).then((result) => {
      this.musicmv = result.data
    });
    this.axios.get(`/comment/mv?id=${this.listid}`).then(result => {
      // console.log("评论==>", result)
      this.pinglun = result.comments
    });
    this.axios.get(`/mv/detail?mvid=${this.listid}`).then(result => {
      // console.log("mv数据==>", result.data)
      this.mvtext = result.data
    });
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.axios.get(`/mv/url?id=${vm.listid}`).then((result) => {
        vm.musicmv = result.data
      });
      vm.axios.get(`/comment/mv?id=${vm.listid}`).then(result => {
        // console.log("评论==>", result)
        vm.pinglun = result.comments
      });
      vm.axios.get(`/mv/detail?mvid=${vm.listid}`).then(result => {
        // console.log("mv数据==>", result.data)
        vm.mvtext = result.data
      });
    });
  },
  computed: {
    word () {
      if (this.showall) {
        return "展开"
      } else {
        return "收起"
      }
    }
  },
}
</script>

<style lang="less" scoped>
.movie {
  min-height: 83.1vh;
  .text {
    display: flex;
    flex-wrap: wrap;
    padding-left: 10px;
    padding-bottom: 20px;
    h2 {
      padding-top: 10px;
      flex: 1;
      text-align: center;
    }
  }
  .date {
    text-align: center;
    padding-bottom: 10px;
  }
  p {
    margin: 20px 0 10px 0;
    text-indent: 2em;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: #666;
    font: 14px/1.5 Helvetica, sans-serif, STHeiTi;
    &.click {
      display: block;
    }
  }
  .show {
    text-align: center;
    font-size: 20px;
  }
}
</style>