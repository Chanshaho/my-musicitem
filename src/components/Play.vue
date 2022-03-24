<template>
  <div class="player">
    <audio autoplay
           :src="`https://music.163.com/song/media/outer/url?id=${musicId.id}.mp3`"
           @timeupdate="timeupdate"
           @play="playState=true"
           @pause="playState=false"
           @ended="$emit('changeMusic','next')"
           v-if="musicId"
           ref="player"></audio>
    <transition enter-active-class="animate__animated animate__bounceInUp">
      <div class="minibar"
           v-if="musicId">
        <img :src="musicId.picUrl"
             :style="{'animation-play-state':playState?'running':'paused'}" />
        <h5 @click="showfull=true">
          <span>
            {{musicId.name}}-<b v-for="artist in musicId.song.artists"
               :key="artist.id">{{artist.name}}</b>
          </span>
        </h5>
        <i class="playbtn"
           @click="playState=!playState">
          <i :class="['fa', {'fa-play':!playState},{'fa-pause':playState}]"
             aria-hidden="true"></i>
          <canvas ref="circleCavans"
                  width="50"
                  height="50"></canvas>
        </i>
      </div>
    </transition>
    <div class="fullscreen">
      <transition enter-active-class="animate__animated animate__bounceInUp animate__faster">
        <full-screen v-if="showfull"
                     @hidefull="showfull=$event"
                     @changeMusic="$emit('changeMusic',$event)"
                     @changeTime="changeTime"
                     @playpause="playState=!playState"
                     @delplaylist="$emit('delplaylist',$event)"
                     :musicId="musicId"
                     :currentTime="currentTime"
                     :duration="duration"
                     :playState="playState"
                     :playList="playList"></full-screen>
      </transition>

    </div>
  </div>
</template>
<script>
import FullScreen from '@/components/FullScreen.vue'
export default {
  props: {
    musicId: {
      type: Object,
      default: null
    },
    playList: Array
  },
  data () {
    return {
      cxt: null,//存储canvas画布
      playState: true,//播放状态
      showfull: false,
      currentTime: 0,
      duration: 0
    }
  },
  mounted () {
  },
  methods: {
    changeTime (event) {
      this.$refs.player.currentTime = event;
    },
    timeupdate (e) {
      this.cxt = this.$refs.circleCavans.getContext("2d");//获取canvas画布上下文
      let ctime = e.target.currentTime;//当前播放时间
      let totalTime = e.target.duration;//总时长
      this.drawCircle(ctime, totalTime);
      this.currentTime = ctime;
      this.duration = totalTime;
    },
    drawCircle (ctime, total) {
      this.cxt.clearRect(0, 0, 50, 50);//清除绘制区域
      this.cxt.beginPath();
      this.cxt.arc(25, 25, 20, 0, 2 * Math.PI); //arc(x,y,半径,开始弧度,结束弧度)
      this.cxt.strokeStyle = "green";
      this.cxt.lineWidth = 5;
      this.cxt.stroke();
      this.cxt.closePath();
      let rdu = ctime / total * 2 * Math.PI;//当前时间/总时长 * 2π弧度
      this.cxt.beginPath();
      this.cxt.strokeStyle = "skyblue";
      this.cxt.lineWidth = 5;
      this.cxt.arc(25, 25, 20, 0, rdu);
      this.cxt.stroke();
      this.cxt.closePath();
    }
  },
  watch: {
    playState (newValue) {
      if (newValue) {
        this.$refs.player.play();
      } else {
        this.$refs.player.pause();
      }
    }
  },
  components: {
    FullScreen
  },
}
</script>
<style lang="less" scoped>
.player {
  border-radius: 20px 20px 0 0;
  position: sticky;
  bottom: 6.5vh;
  z-index: 9;
  background: #eee;
  .minibar {
    padding: 5px;
    height: 50px;
    display: flex;
    h5 {
      flex: 1;
      margin: 0px 10px;
      overflow: hidden;
      span {
        line-height: 50px;
        display: inline-block;
        white-space: nowrap;
      }
    }
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      animation: roll 2s linear infinite;
    }
    i {
      &.playbtn {
        position: relative;
        .fa {
          left: 16px;
          top: 15px;
          text-align: center;
          width: 20px;
          height: 20px;
          font-size: 20px;
          color: #333;
          position: absolute;
        }
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
</style>