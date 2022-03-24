<template>
  <div>
    <swiper :options="options">
      <swiper-slide v-for="imgs in imgs"
                    :key="imgs.pic">
        <div class="demo">
          <router-link to="">
            <img :src="imgs.pic" />
          </router-link>
        </div>
      </swiper-slide>
      <div class="swiper-pagination"
           slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import 'swiper/css/swiper.css'
export default {
  props: {
    imgs: Array
  },

  data () {
    return {
      options: {
        autoplay: true,
        pagination: {
          el: ".swiper-pagination"//指定分页器的挂载点.
        }
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide,
  },
};
</script>
<style lang="less" scoped>
.demo {
  width: 100%;
  background-color: red;
  img {
    display: block;
    width: 100%;
  }
}
</style>