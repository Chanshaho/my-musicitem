<template>
  <div class="pinglun">
    <ul>
      <li v-for="p in pinglun"
          :key="p.id">
        <img :src="`${p.user.avatarUrl?p.user.avatarUrl:''}`"
             alt="">
        <div class="box">
          <h2>{{p.user.nickname?p.user.nickname:''}}</h2>
          <p>{{p.content?p.content:''}}</p>
        </div>
        <span @click="p.likedCount++">{{p.likedCount==0?"":p.likedCount}}</span>
        <i class="fa fa-thumbs-o-up"
           :class="{'red':p.likedCount!=0}"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["pinglun"],
}
</script>

<style lang="less" scoped>
.pinglun {
  ul {
    li {
      display: flex;
      padding-left: 10px;
      padding-top: 10px;

      img {
        display: block;
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      .box {
        border-bottom: 1px solid #eee;
        padding-left: 10px;
        flex: 1;
        h2 {
          color: #666;
        }
        p {
          margin-top: 20px;
          padding-bottom: 10px;
        }
      }
      span {
        font-size: 15px;
        padding-right: 5px;
        color: #888;
      }
      i {
        padding-right: 10px;
        color: #888;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>