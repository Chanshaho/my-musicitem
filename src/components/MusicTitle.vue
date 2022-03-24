<template>
  <div class="musictitle"
       @click="$router.push('search')">
    <h2>
      <slot></slot>
    </h2>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.musictitle {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  h2:first-child {
    font-size: 18px;
    margin-left: 15px;
    font-weight: bold;
  }
  h2.more {
    padding-right: 15px;
    color: #bbb;
    font-size: 14px;
    i {
      padding-left: 3px;
      font-size: 18px;
    }
  }
}
</style>