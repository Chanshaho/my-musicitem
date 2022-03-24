<template>
  <div class="toplist ">
    <div class="topTitle">
      <div class="hotsong">
        <div>更新日期:10月23日</div>
      </div>
    </div>
    <loading v-if="showList.length==0"></loading>
    <song-list @play="$emit('play',$event)"
               :shownum="true"
               :musiclist="showList"
               v-else
               :playMusicID="playMusicID"></song-list>
    <i class="fa fa-angle-double-up toTop"
       @click="scrollToTop"
       v-if="show"></i>
    <div ref="bottom"
         class="loadingmore"
         @click="loadMore">{{this.page>=10?"到底了...":"加载更多"}}</div>
  </div>
</template>
<script>
import SongList from '../components/SongList.vue'
import _ from "lodash";
export default {
  name: 'TopList',
  props: ["playMusicID"],
  data () {
    return {
      hotList: [],
      page: 1,
      show: false
    }
  },
  created () {
    this.axios.get("/playlist/detail", { params: { id: 3778678 } })
      .then(result => {
        let musiclist = result.playlist.tracks.map((v, index) => {
          v.song = {
            privilege: result.privileges[index],
            artists: v.ar,
            album: v.al
          }
          return v;
        });
        this.hotList = musiclist;
      })
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
    window.removeEventListener("scroll", this.windowScroll);
    next();
  },
  methods: {
    loadMore () {
      if (this.page >= 10) {
        return;
      }
      this.page++;
    },
    windowScroll: _.debounce(function () {
      if (window.scrollY + window.innerHeight > this.$refs.bottom.offsetTop) {
        this.loadMore()
        this.show = true
      }
      if (window.scrollY + window.innerHeight > window.innerHeight) {
        this.show = true
      } else {
        this.show = false
      }

    }, 300),
    scrollToTop () {
      let path = this.$route.path;
      if (path.indexOf("abc") > 0) {
        path = path.substr(0, path.length - 3);
      } else {
        path = path + "abc";
      }
      this.$router.push({
        path: path,
        hash: '#hello'
      })

    }
  },
  computed: {
    showList () {
      if (this.hotList.length > 0) {
        let endPos = this.page * 20;
        return this.hotList.slice(0, endPos);
      }
      return [];
    },
  },
  components: {
    SongList
  }
}
</script>

<style lang="less" scoped>
.toplist {
  min-height: 83.1vh;
  .topTitle {
    width: 100vw;
    height: 39vw;
    background: url(../assets/hot_music_bg_2x.jpg) no-repeat;
    background-size: cover;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      left: 0px;
      top: 0px;
      right: 0px;
      bottom: 0px;
      background: rgba(0, 0, 0, 0.2);
      z-index: 1;
    }
    .hotsong {
      top: 50%;
      left: 20px;
      z-index: 2;
      transform: translateY(-50%);
      position: absolute;
      &::before {
        content: '';
        display: inline-block;
        width: 142px;
        height: 67px;
        background: url(../assets/index_icon_2x.png) no-repeat;
        background-size: 166px 97px;
        background-position: -25px -30px;
      }
      & > div {
        font-size: 12px;
        color: white;
      }
    }
  }
  .loadingmore {
    text-align: center;
    line-height: 80px;
    color: #888;
  }
  .toTop {
    font-size: 50px;
    position: fixed;
    bottom: 50px;
    right: 40px;
    color: skyblue;
  }
}
</style>

