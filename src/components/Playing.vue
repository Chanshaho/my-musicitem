<template>
  <ul class="loading">
    <li></li>
    <li></li>
    <li></li>
  </ul>
</template>
<style lang="less" scoped>
.loading {
  height: 20px;
  display: flex;
  justify-content: center;
  padding-right: 12px;
  li {
    width: 4px;
    background: green;
    margin-left: 2px;
    transform-origin: bottom;
    animation: loadjump 0.5s linear infinite;
    &:first-child {
      animation-delay: 0s;
    }
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
}
@keyframes loadjump {
  0% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.5);
  }
  100% {
    transform: scaleY(0.8);
  }
}
</style>