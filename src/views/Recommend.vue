<template>
  <div class="home ">
    <loading v-if="banners.length == 0"></loading>
    <Banner :imgs="banners"></Banner>
    <div class="home1">
      <input type="text"
             placeholder="搜索"
             @focus="$router.push('search')">
    </div>
    <music-title>推荐歌单</music-title>
    <loading v-if="recommendSongs.length == 0"></loading>
    <div class="scorll">
      <ul class="imgitem">
        <img-item v-for="item in recommendSongs"
                  :item="item"
                  :key="item.id"
                  path="/musiclist">
        </img-item>
      </ul>
    </div>
    <music-title>推荐MV</music-title>
    <loading v-if="recommendMv.length == 0"></loading>
    <div class="scorll">
      <ul class="imgitem">
        <img-item v-for="item in recommendMv"
                  :item="item"
                  :key="item.id"
                  path="/movie">
        </img-item>
      </ul>
    </div>
    <music-title>最新音乐</music-title>
    <loading v-if="newsSong.length == 0"></loading>
    <song-list :musiclist="newsSong"
               @play="$emit('play',$event)"
               v-if="newsSong"
               :playMusicID="playMusicID"></song-list>
  </div>
</template>

<script>
import Banner from '../components/Banner.vue'
import ImgItem from '../components/ImgItem.vue'
import MusicTitle from '../components/MusicTitle.vue'
import SongList from '../components/SongList.vue'


export default {
  props: ["playMusicID"],
  data () {
    return {
      recommendSongs: [],
      recommendMv: [],
      newsSong: [],
      banners: []
    }
  },
  methods: {


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
  created () {
    this.$axios.get("/personalized?limit=6").then((result) => {
      this.recommendSongs = result;
      // console.log(this.recommendSongs);
    });
    this.$axios.get("/mv/first?limit=6").then((result) => {
      this.recommendMv = result.data.map(v => {
        v.picUrl = v.cover
        return v
      });
      // console.log(this.recommendMv);
    });
    this.axios.get("/personalized/newsong?limit=10").then((result) => {
      this.newsSong = result;
    });
    this.axios.get("/banner?type=1").then((result) => {
      this.banners = result.banners;
    });
  },
  name: 'Home',
  components: { MusicTitle, ImgItem, Banner, SongList, }
}
</script>
<style lang="less" scoped>
.home {
  min-height: 83.1vh;
  background-color: #fafafa;
  overflow: hidden;
  .home1 {
    text-align: center;
    width: 100%;
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
    input {
      width: 85%;
      height: 30px;
      color: rgba(26, 26, 26, 0.5);
      font-size: 14px;
      border-radius: 20px;
      padding: 0 10px;
      outline: none;
      border: none;
      text-align: center;
      font-weight: 300;
    }
  }
  .scorll {
    width: 100%;
    overflow-y: auto;
    &::-webkit-scrollbar {
      /*隐藏滚轮*/
      display: none;
    }
    .imgitem {
      display: flex;
      width: 200%;
      padding-right: 10px;
    }
  }
}
</style>
