<template>
  <router-link class="box"
               :to="`${path}/${item.id}`"
               tag="li">
    <img :src="`${item.picUrl}`">
    <div class="xbox">
      <i class="fa fa-play"></i>
      <h1>{{item.playCount|formatNum}}</h1>
    </div>
    <h2>{{item.name}}</h2>
  </router-link>
</template>

<script>
export default {
  props: ["item", "path"]
}
</script>

<style lang="less" scoped>
.box {
  width: 33%;
  padding-left: 2px;
  position: relative;
  margin-bottom: 10px;
  img {
    display: inline-block;
    width: 100%;
    border-radius: 10px;
    height: 80%;
  }
  .xbox {
    height: 15px;
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 20%;
    right: 0;
    font-size: 13px;
    background: rgba(0, 0, 0, 0.4);
    color: white;
    padding-right: 10px;
    border-radius: 5px;
    .fa {
      padding-left: 10px;
      padding-right: 5px;
    }
  }
  h2 {
    font-size: 13px;
    color: #575757;
    display: -webkit-box; //设置box显示方式
    -webkit-line-clamp: 2; //两行
    -webkit-box-orient: vertical; //垂直
    overflow: hidden;
    padding: 5px 0 0 5px;
  }
}
</style>