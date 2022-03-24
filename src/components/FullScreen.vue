<template>
  <div>
    <div class="full"
         :style="{
        'background-image': `url(${musicId.picUrl})`,
        'background-size': 'auto 100%',
        'background-origin':'center center',
        filter: 'blur(30px)',
      }"></div>
    <div class="fullscreen">
      <h1><i @click="$emit('hidefull', false)"
           class="fa fa-chevron-down"></i></h1>
      <img :src="musicId.picUrl"
           class="cover"
           :style="{'animation-play-state':playState?'running':'paused'}" />
      <div class="lyric">
        <ul :style="{transform:`translateY(-${lyricIndex*21}px)`}">
          <li v-for="(ly,index) in lyricArray"
              :key="index"
              :class="{active: index==lyricIndex}">{{ly.lyric}}</li>
        </ul>
      </div>
      <div class="control">
        <input class="process"
               v-model="timeprocess"
               type="range"
               max="100"
               min="0" />
      </div>
      <div class="controls">
        <i @click="$emit('changeMusic','prev')"
           class="fa fa-step-backward"
           aria-hidden="true"></i>
        <i :class="['fa', {'fa-play':!playState},{'fa-pause':playState}]"
           @click="$emit('playpause')"
           aria-hidden="true"></i>
        <i @click="isshow=!isshow"
           class="fa fa-bars"
           aria-hidden="true"></i>
        <i @click="$emit('changeMusic','next')"
           class="fa fa-step-forward"
           aria-hidden="true"></i>
      </div>
      <div class="playList animate__animated animate__bounceInUp"
           v-show="isshow">
        <h2>歌曲列表</h2>
        <i @click="isshow=false"
           class="fa fa-angle-down"></i>
        <p v-for="(pl,index) in playList"
           :key="pl.id"
           :class="{
          active:pl.id==musicId.id
        }">
          <span @click="$emit('changeMusic',pl)">{{pl.name}}-{{pl.song.artists[0].name}}</span>
          <i class="fa fa-close"
             @click="$emit('delplaylist',index)"></i>
        </p>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    musicId: Object,
    currentTime: Number,
    duration: Number,
    playState: Boolean,
    playList: Array
  },
  data () {
    return {
      lyric: "",
      isshow: false,
    }
  },
  created () {
    this.axios.get(`/lyric?id=${this.musicId.id}`).then(result => {
      this.lyric = result.lrc.lyric;
    });
  },
  watch: {
    musicId () {
      this.axios.get(`/lyric?id=${this.musicId.id}`).then(result => {
        this.lyric = result.lrc.lyric;
      });
    }
  },
  computed: {
    lyricArray () {
      if (this.lyric == "" || this.lyric.length < 1) return [];//还没有歌词的时候.
      let arr = this.lyric.split("\n");
      arr.pop();
      let reg = /\[(\d+):(\d+.\d+)\](.*)/;
      let lyricArr = arr.map(ly => {
        if (reg.test(ly)) {
          return {
            time: parseInt(RegExp.$1) * 60 + parseFloat(RegExp.$2),
            lyric: RegExp.$3
          }
        } else {
          return {
            time: 0,
            lyric: ly
          }
        }
      });
      return lyricArr;
    },
    lyricIndex () {
      if (this.lyricArray.length < 1) return 0;
      for (let i in this.lyricArray) {
        if (i >= this.lyricArray.length - 2) {
          return this.lyricArray.length - 1;
        } else {
          if (this.currentTime > this.lyricArray[i].time && this.lyricArray[parseInt(i) + 1].time > this.currentTime) {
            return i;
          }
        }
      }
      return 1;
    },
    timeprocess: {
      get () {
        let process = this.currentTime / this.duration * 100;
        return process;
      },
      set (value) {
        let ctime = value / 100 * this.duration;
        this.$emit('changeTime', ctime)
      }
    }
  },


};
</script>
<style lang="less" scoped>
.full {
  position: fixed;
  z-index: 98;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  transform: scale(1.5);
  background: #000;
}
.fullscreen {
  position: fixed;
  z-index: 99;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  i {
    font-size: 24px;
  }
  .cover {
    display: block;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin: 0 auto;
    animation: roll 5s linear infinite;
  }
  .lyric {
    margin-top: 1vw;
    height: 30vh;
    text-align: center;
    position: relative;
    overflow-y: auto;
    ul {
      position: absolute;
      transition: transform 0.3s linear;
      top: 0px;
      left: 0px;
      width: 100%;
      li {
        height: 21px;
        &.active {
          color: #6f98fe;
          font-size: 18px;
        }
      }
    }
  }
  .control {
    display: flex;
    padding: 10px 20px;
    .process {
      width: 80vw;
      flex: 1;
      margin: 0 auto;
    }
  }
  .controls {
    display: flex;
    padding: 5vh 10vw;
    justify-content: space-between;
    i {
      flex: 1;
      text-align: center;
      font-size: 20px;
    }
  }
  .playList {
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    width: 100vw;
    bottom: 50vh;
    left: 0;
    height: 30vh;
    overflow: hidden;
    h2 {
      text-align: center;
      padding-top: 5vw;
    }
    i {
      &.fa-angle-down {
        font-size: 24px;
      }
      &.fa-close {
        float: right;
        padding-right: 5vw;
        font-size: 14px;
      }
    }
    p {
      padding-left: 5vw;
      padding-top: 5vw;
      &.active {
        color: skyblue;
      }
    }
  }
}
@keyframes roll {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes gun {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
}
</style>