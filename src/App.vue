<template>
  <div id="app">
    <top-bar></top-bar>
    <keep-alive>
      <router-view @play="play"
                   class="animate__animated  animate__fadeIn animate__faster"
                   :playMusicID="playMusicID" />
    </keep-alive>
    <play :musicId="musicId"
          v-if="musicId"
          :playList="playList"
          @changeMusic="changeMusic"
          @delplaylist="delplaylist"></play>
    <Nav></Nav>
  </div>
</template>
<script>
import Nav from '@/components/Nav.vue'
import Play from '@/components/Play.vue'
import TopBar from './components/TopBar.vue'
export default {
  components: { Nav, Play, TopBar },
  data () {
    return {
      musicId: null,
      playList: [],
    }
  },
  methods: {
    play (event) {
      if (event.al && event.al.picUrl) {
        event.picUrl = event.al.picUrl;
      }

      this.musicId = event;

      let isRepeat = false;
      this.playList.forEach((v) => {
        if (v.id == event.id) {
          isRepeat = true
        }
      });
      if (!isRepeat) this.playList.push(event);
    },
    changeMusic (event) {
      let currIndex = 0;
      this.playList.forEach((v, index) => {
        if (v.id == this.musicId.id) {
          currIndex = index;
        }
      })
      if (event == 'prev') {
        if (this.playList.length == 0) return
        if (currIndex == 0) {
          currIndex = this.playList.length - 1;
        }
        else {
          currIndex--;
        }

      } else if (event == "next") {
        if (this.playList.length == 0) return

        if (currIndex == this.playList.length - 1) {
          currIndex = 0;
        } else {
          currIndex++;
        }
      } else if (typeof event == 'object') {
        this.musicId = event;
        return;
      }
      this.musicId = this.playList[currIndex];
    },
    delplaylist (event) {
      if (this.playList.length == 1) return
      this.playList.splice(event, 1)
      this.musicId = this.playList[this.playList.length - 1]
    }
  },
  computed: {
    playMusicID () {
      if (this.musicId) {
        return this.musicId.id;
      }
      return 0;
    }
  },
}
</script>

<style lang="less">
body {
  background: #fafafa;
}
</style>
