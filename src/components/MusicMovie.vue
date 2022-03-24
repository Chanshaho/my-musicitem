<template>
  <div class="mv">
    <video v-if="musicmv.url"
           :src="`${musicmv.url}`"
           controls></video>
  </div>
</template>

<script>
export default {
  props: ["musicmv"],
}
</script>

<style lang="less" scoped>
.mv {
  video {
    width: 100vw;
    margin-bottom: 10px;
  }
}
</style>