<template>
  <div class="top">
    <h2>企鹅音乐</h2>
    <img src="@/assets/qie.png"
         alt="">
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.top {
  position: sticky;
  z-index: 9;
  top: 0;
  width: 100vw;
  height: 10vh;
  background: white;
  text-align: center;
  position: relative;
  h2 {
    line-height: 10vh;
    font-size: 24px;
    font-weight: bold;
  }
  img {
    position: absolute;
    left: 40px;
    top: 0;
    height: 100%;
    width: 15%;
  }
}
</style>