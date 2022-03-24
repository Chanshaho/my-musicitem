<template>
  <div class="searchsug">
    <h2 @click="$emit('changekeyword',keywords)">搜索"{{keywords}}"</h2>
    <loading v-show="isSearch"></loading>
    <ul>
      <li v-for="s in sugArray"
          :key="s.id"
          @click="$emit('changekeyword',keywords)">
        <i class="fa fa-search"
           aria-hidden="true"></i>
        <span>{{s.keyword}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data () {
    return {
      sugArray: [],
      isSearch: false,
    }
  },
  props: ["keywords"],
  methods: {
    getSearch: _.debounce(function (value) {
      this.isSearch = true;
      this.axios.get(`/search/suggest?keywords=${value}&type=mobile`)
        .then(result => {
          this.isSearch = false;
          if (result.allMatch) this.sugArray = result.allMatch;
        });
    }, 100),
  },
  created () {
    this.getSearch(this.keywords);
  },
  watch: {
    keywords (newValue) {
      this.getSearch(newValue);
    }
  }

}
</script>

<style lang="less" scoped>
.searchsug {
  h2 {
    padding: 20px 10px;
    color: #507daf;
    font-size: 15px;
  }
  ul {
    li {
      line-height: 45px;
      font-size: 15px;
      color: #333;
      border-bottom: 1px solid #ebecec;
      i {
        color: #c9c9c9;
        padding-left: 10px;
      }
      span {
        padding-left: 10px;
      }
    }
  }
}
</style>