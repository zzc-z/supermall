<template>
  <van-swipe class="swiper" :autoplay="4000" indicator-color="white">
   <van-swipe-item class="swiper-item" v-for="item in topImages" :key="item">
      <img :src="item" alt @load="image"/>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import Vue from 'vue';
import { Swipe, SwipeItem } from "vant";
Vue.use(Swipe).use(SwipeItem);

export default {
  name: "DetailSwiper",
  data() {
    return {
      isLoad: false
    };
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    image() {
      this.$bus.$emit("ImageLoad");
    }
  }
};
</script>

<style scoped>
.swiper {
  height: 300px;
  overflow: hidden;
}
.swiper img {
  transform: scale(1);
  width: 100%;
}
.van-swipe__indicator{
  width: 20px;
  height: 20px;
}
</style>