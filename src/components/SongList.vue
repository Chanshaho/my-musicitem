<template>
  <div v-if="musiclist">
    <div class="songlist"
         v-for="(song,index) in musiclist"
         :key="index">
      <div v-if="shownum"
           :class="['shownum',{red:index<3}]">{{index|formatOrder}}</div>
      <div class="left">
        <h2 v-html="$options.filters.highKey(song.name,keywords)"></h2>
        <i class="fa fa-h-square"
           v-if="song.song.privilege.maxbr==999000"></i>
        <span v-for="(artists,index) in song.song.artists"
              :key="index"
              :class="{'toright':song.song.privilege.maxbr!=999000}"
              v-html="$options.filters.highKey(artists.name,keywords)">
        </span>
        <span v-html="$options.filters.highKey('-'+song.song.album.name,keywords)"></span>
      </div>
      <playing v-if="playMusicID==song.id"></playing>
      <i class="fa fa-play-circle-o"
         v-else
         @click="$emit('play',song)"></i>
    </div>
  </div>
</template>

<script>
import Playing from './Playing.vue';

export default {
  components: { Playing },
  props: ["musiclist", "keywords", "shownum", "playMusicID"],
  filters: {
    formatOrder (val) {
      //序号从1
      val++;
      //如果小于10加0补齐
      return val < 10 ? '0' + val : val;
    },
    highKey (val, keywords) {
      // console.log(val,keywords);
      let reg = new RegExp(`${keywords}`, 'g');
      if (reg.test(val)) {
        //把关键词 替换成 <b style="color:red">关键词</b>
        val = val.replace(reg, `<b style="color:skyblue">${keywords}</b>`)
      }
      return val;
    }
  }

}
</script>

<style lang="less" scoped>
.songlist {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  div {
    &.shownum {
      color: #888;
      padding-left: 10px;
      font-size: 17px;
    }
    &.red {
      color: #df3436;
    }
  }
  .left {
    padding-left: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: normal;
    white-space: nowrap;
    word-break: normal;
    flex: 1;
    h2 {
      flex: 1;
      font-size: 18px;
      padding-bottom: 5px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: normal;
      white-space: nowrap;
      word-break: normal;
    }
    span {
      color: #888;
      font-size: 13px;
      padding-left: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: normal;
      white-space: nowrap;
      word-break: normal;
      &.toright {
        padding-left: 0px;
      }
    }
  }
  i {
    &.fa-h-square {
      color: green;
      font-size: 13px;
    }
    &.fa-play-circle-o {
      font-size: 24px;
      padding-right: 10px;
      color: #888;
    }
  }
}
</style>