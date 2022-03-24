<template>
  <div class="home">
    <div class="home1">
      <i class="fa fa-search"></i>
      <input type="text"
             placeholder="搜索歌曲、歌手、专辑"
             ref="box"
             @input="inputing"
             v-model="keywords"
             @keydown.enter="search" />
      <span v-show="showdel"
            @click="back">取消</span>
    </div>
    <component :is="isshow"
               :keywords="keywords"
               @changekeyword="changekeyword"
               @play="$emit('play',$event)"
               :historys="historys"
               @delhistory="delhistory"
               :playMusicID="playMusicID"></component>
  </div>
</template>

<script>
import SearchHot from '@/components/SearchHot.vue'
import SearchResult from '@/components/SearchResult.vue'
import SearchSug from '@/components/SearchSug.vue'
export default {
  props: ["playMusicID"],
  data () {
    return {
      isshow: SearchHot,
      keywords: "",
      showdel: false,
      historys: []
    }
  },
  methods: {
    inputing () {
      if (this.keywords == "") {
        this.isshow = SearchHot;
        this.showdel = false;
      } else {
        this.showdel = true;
        this.isshow = SearchSug;
      }
    },
    search () {
      this.isshow = SearchResult
      this.historys.push(this.keywords)
    },
    back () {
      this.keywords = ""
      this.isshow = SearchHot
      this.showdel = false;
    },
    changekeyword (event) {
      this.keywords = event
      this.isshow = SearchResult
      this.showdel = true
      this.historys.push(event)
    },
    delhistory (event) {
      this.historys.splice(event, 1)
    },
  },
  name: "Search",
  components: {},
}
</script>

<style lang="less" scoped>
.home {
  min-height: 83.1vh;
  .home1 {
    margin: 0 5px;
    text-align: center;
    width: 85%;
    padding: 20px 0;
    position: relative;
    i {
      color: #888;
      &.fa-search {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 20px;
      }
    }
    input {
      width: 100%;
      height: 30px;
      font-size: 14px;
      border-radius: 20px;
      padding-left: 30px;
      outline: none;
      border: none;
      font-weight: 300;
      margin-left: 10px;
      &::-webkit-input-placeholder {
        color: rgba(26, 26, 26, 0.5);
      }
    }
    span {
      position: absolute;
      right: -20px;
      bottom: 28px;
      padding-left: 10px;
      font-size: 13px;
      font-weight: bold;
    }
  }
}
</style>