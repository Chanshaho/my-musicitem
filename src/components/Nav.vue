<template>
  <div id="nav">
    <router-link tag="span"
                 to="/">
      <i class="fa fa-star"></i> 推荐
    </router-link>
    <router-link tag="span"
                 to="/toplist">
      <i class="fa fa-music"></i> 热歌榜
    </router-link>
    <router-link tag="span"
                 to="/search">
      <i class="fa fa-search"></i> 搜索
    </router-link>
  </div>
</template>
<script>
export default {

}
</script>

<style lang="less" scoped>
#nav {
  position: sticky;
  bottom: 0;
  width: 100%;
  display: flex;
  text-align: center;
  background: white;
  z-index: 9;
  span {
    -webkit-tap-highlight-color: transparent;
    line-height: 7vh;
    flex: 1;
    &.router-link-exact-active {
      color: lightskyblue;
    }
  }
}
</style>