<template>
  <div class="words"
       v-if="hotWords">
    <h2>热门搜索</h2>
    <loading v-if=" hotWords.length==0"></loading>
    <div class="hotword">
      <span v-for="(word,index) in hotWords"
            :key="index"
            @click="add(word.searchWord)">
        {{word.searchWord}}
      </span>
    </div>
    <div class="history">
      <h2>历史记录</h2>
      <div class="history">
        <ul>
          <li v-for="(word,index) in his"
              :key="index">
            <i class="fa fa-clock-o"></i>
            <h1 @click="add(word)">{{word}}</h1>
            <i class="fa fa-close"
               @click="$emit('delhistory',index)"></i>
          </li>
        </ul>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["historys"],
  data () {
    return {
      hotWords: [],
      page: 0,
    }
  },
  methods: {
    add (w) {
      this.$emit('changekeyword', w)
    }
  },
  created () {
    this.axios.get("/search/hot/detail").then(result => {
      this.hotWords = result.data.slice(0, 10);
    });
  },
  computed: {
    his () {
      return new Set([...this.historys])
    }
  },
}
</script>
<style lang="less" scoped>
.words {
  h2 {
    font-size: 13px;
    color: #888;
    padding: 10px 0 10px 10px;
  }
  .hotword {
    overflow: hidden;
    padding-left: 10px;
    span {
      float: left;
      line-height: 16px;
      padding: 5px 10px;
      margin: 5px;
      border-radius: 14px;
      border: 1px solid #ddd;
    }
  }
  .history {
    li {
      line-height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      h1 {
        flex: 1;
      }
      i {
        font-size: 13px;
        color: #888;
        &.fa-clock-o {
          padding-left: 10px;
          padding-right: 20px;
        }
        &.fa-close {
          padding-right: 20px;
        }
      }
    }
  }
}
</style>