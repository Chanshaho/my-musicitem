<template>
  <div class="musiclist animate__animated animate__fadeIn"
       v-if="musicpic">
    <loading v-if="musicpic.length == 0"></loading>
    <img :src="`${musicpic.coverImgUrl}`" />
    <music-title>歌单简介</music-title>
    <h2>{{musicpic.description?musicpic.description:"无"}}</h2>
    <loading v-if="musiclist.length == 0"></loading>
    <song-list :musiclist="musiclist"
               @play="$emit('play',$event)"></song-list>
    <music-title>歌单评论</music-title>
    <ping-lun :pinglun="pinglun"></ping-lun>
  </div>
</template>

<script>
import MusicTitle from '../components/MusicTitle.vue';
import PingLun from '../components/PingLun.vue';
import SongList from '../components/SongList.vue';
export default {
  components: { SongList, PingLun, MusicTitle },
  props: ["listid"],
  data () {
    return {
      musiclist: [],
      musicpic: null,
      on: false,
      pinglun: [],
      showall: false
    }
  },
  created () {
    this.axios.get(`/playlist/detail?id=${this.listid}`).then((result) => {
      this.musicpic = result.playlist
      let re = result.playlist.tracks.map((v, index) => {
        v.song = {
          privilege: result.privileges[index],
          artists: v.ar,
          album: v.al
        }
        return v;
      })
      this.musiclist = re;
    });
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.axios.get(`/playlist/detail?id=${vm.listid}`).then((result) => {
        vm.musicpic = result.playlist
        let re = result.playlist.tracks.map((v, index) => {
          v.song = {
            privilege: result.privileges[index],
            artists: v.ar,
            album: v.al
          }
          return v;
        })
        vm.musiclist = re;
      });
      vm.axios.get(`/comment/playlist?id=${vm.listid}`).then(result => {
        // console.log("评论==>", result)
        vm.pinglun = result.comments
      })
    });
  },
  beforeRouteLeave (to, from, next) {
    this.musicpic = []
    this.musiclist = []
    next()
  },

}
</script>

<style lang="less" scoped>
.musiclist {
  position: relative;

  i {
    &.fa {
      position: absolute;
      top: 0px;
      color: white;
      font-size: 24px;
    }
  }

  img {
    height: 40vh;
  }
  p {
    margin: 20px 0 10px 20px;
    color: gray;
  }
  h1 {
    text-align: center;
    font-size: 20px;
  }
  h2 {
    text-indent: 2em;
    color: #888;
    padding: 10px 0 0px 0;
  }
}
</style>