<template>
  <div class="animation">
    <img src="@/assets/qie.png"
         alt="">
    <h2>企鹅音乐</h2>
  </div>
</template>

<script>
export default {
  name: "index",
  mounted () {
    setTimeout(() => { this.$router.replace('/recommend') }, 3000)
  }
}
</script>

<style lang="less">
.animation {
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: 99999;
  background-color: white;
  top: 0;
  h2 {
    font-size: 50px;
    text-align: center;
    color: black;
    padding-top: 80px;
    font-weight: bold;
  }
}
</style>