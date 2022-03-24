<template>
  <div class="singertext"
       v-if="singer">
    <loading v-if="!singer.cover"></loading>
    <img :src="singer.cover" />
    <h2>{{singer.name}}</h2>
    <span>昵称: {{singer.name}}</span>
    <p class="fans">粉丝：1000万</p>
    <music-title>歌手简介</music-title>
    <loading v-if="!singer.briefDesc"></loading>
    <p class="text"
       :class="{'click':showall==false}">{{singer.briefDesc}}
    </p>
    <div class="cli"
         @click="showall=!showall"
         v-if="singer.briefDesc">{{word}}</div>
    <music-title>热门单曲</music-title>
    <loading v-if="songs.length==0"></loading>
    <song-list :musiclist="songs"
               :keywords="keywords"
               @play="$emit('play',$event)"
               v-if="songs"
               :playMusicID="playMusicID"></song-list>
  </div>
</template>

<script>
import MusicTitle from '../components/MusicTitle.vue'
import SongList from '../components/SongList.vue'
export default {
  components: { MusicTitle, SongList },
  props: ["listid", "keywords", "playMusicID"],
  data () {
    return {
      singer: null,
      songs: [],
      page: 1, //记录分页页数
      limit: 5, //记录每页显示条数
      showall: true
    }
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.axios.get(`/artist/detail?id=${vm.listid}`)
        .then(result => {
          vm.singer = result.data.artist
        }),
        vm.axios.get(`/artist/songs?id=${vm.listid}&order=hot&limit=${vm.limit}`)
          .then(result => {
            // console.log(result);
            let re = result.songs.map((v) => {
              v.song = {
                privilege: v.privilege,
                artists: v.ar,
                album: v.al,
              };
              return v;
            });
            vm.songs = re
          })
    })
  },
  computed: {
    word () {
      if (this.showall) {
        return "完整歌手介绍"
      } else {
        return "收起"
      }
    }
  },
}
</script>

<style lang="less" scoped>
.singertext {
  position: relative;
  &::after {
    position: absolute;
    width: 100%;
    height: 325px;
    content: '';
    top: 0;
    left: 0;
    background: #00000033;
  }
  img {
    margin-bottom: 15px;
  }
  h2 {
    color: #ffffff;
    font-size: 20px;
    position: absolute;
    top: 155px;
    left: 0;
    z-index: 2;
    padding-left: 15px;
  }
  span {
    position: absolute;
    top: 200px;
    left: 0;
    color: rgb(241, 238, 238);
    font-size: 14px;
    padding-left: 15px;
    z-index: 2;
  }
  .fans {
    position: absolute;
    top: 250px;
    left: 0;
    color: rgb(241, 238, 238);
    font-size: 16px;
    padding-left: 15px;
    z-index: 2;
  }
  .text {
    text-indent: 2em;
    color: #666;
    font: 14px/1.5 Helvetica, sans-serif, STHeiTi;
    padding-left: 15px;
    padding-top: 20px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    &.click {
      display: block;
    }
  }
  .loadingmore {
    line-height: 50px;
    text-align: center;
    padding: 5px;
  }
  .cli {
    padding-bottom: 10px;
    color: #666;
    text-align: center;
    margin-top: 20px;
  }
}
</style>