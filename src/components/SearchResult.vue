<template>
  <div>
    <loading v-if="!singer"></loading>
    <div class="searchresult"
         v-if="singer">
      <h2>最佳匹配</h2>
      <router-link class="singer"
                   tag="div"
                   :to="`/singertext/${singer.id}/${keywords}`">
        <img :src="singer.picUrl"
             alt="">
        <span>歌手：{{singer.name}}</span>
        <i class="fa fa-angle-right"></i>
      </router-link>
      <loading v-if="result.length==0"></loading>
      <song-list :keywords="keywords"
                 v-else
                 :musiclist="result"
                 @play="$emit('play',$event)"
                 :playMusicID="playMusicID"></song-list>
      <loading v-if="isloading"></loading>
      <div class="loadingmore"
           @click="getMore"
           ref="bottom">{{isMore?"加载更多":"已经到底了没有更多.."}}</div>
    </div>
  </div>
</template>
<script>
import SongList from '@/components/SongList.vue'
import _ from 'lodash'
export default {
  props: {
    keywords: String,
    playMusicID: Number
  },
  data () {
    return {
      result: [],
      singer: null,
      page: 1, //记录分页页数
      limit: 20,//记录每页显示条数
      isloading: false,//记录是否正在加载数据
      isMore: true, //记录是否有更多数据
    }
  },
  created () {
    this.axios.get(`/search?keywords=${this.keywords}&type=100`).then(result => {
      // console.log("最佳匹配歌手==>", result)
      this.singer = result.artists[0]
    });
    this.getResult();
    window.addEventListener("scroll", this.windowScroll);
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      window.addEventListener("scroll", vm.windowScroll);
    });
  },
  beforeDestroy () {
    window.removeEventListener("scroll", this.windowScroll);
  },
  beforeRouteLeave (to, from, next) {
    console.log("leavef- --")
    window.removeEventListener("scroll", this.windowScroll);
    next();
  },
  methods: {
    async getResult () {//异步函数
      let offset = (this.page - 1) * this.limit;
      await this.axios.get(`/cloudsearch?keywords=${this.keywords}&limit=${this.limit}&offset=${offset}`)
        .then(result => {
          if (result.songCount == 0) {
            this.isloading = false;
            this.isMore = false;
            return;
          }
          if (result.songs) {
            let re = result.songs.map(v => {
              v.song = {
                privilege: v.privilege,
                artists: v.ar,
                album: v.al
              };
              return v;
            });
            this.result = this.result.concat(re);
            this.isloading = false;
          }

        });
    },
    getMore () {
      this.isloading = true;
      this.page++;
      this.getResult();
    },
    windowScroll: _.debounce(function () {
      // console.log("滚动dd", window.scrollY, window.innerHeight, this.$refs.bottom.offsetTop);
      if (window.scrollY + window.innerHeight > this.$refs.bottom.offsetTop) {
        this.getMore()
      }
    }, 300)
  },
  components: {
    SongList

  }
}
</script>
  <style lang="less" scoped>
.searchresult {
  h2 {
    font-size: 13px;
    color: #888;
    padding-left: 10px;
    padding-bottom: 10px;
  }
  .singer {
    display: flex;
    align-items: center;
    padding-left: 10px;
    img {
      display: block;
      width: 50px;
      height: 50px;
    }
    span {
      padding-left: 20px;
      flex: 1;
    }
    i {
      color: #888;
      font-size: 28px;
      padding-right: 20px;
    }
  }
  .loadingmore {
    line-height: 50px;
    text-align: center;
    padding: 5px;
  }
}
</style>