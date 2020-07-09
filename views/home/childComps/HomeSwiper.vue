<template>
  <van-swipe class="swipe" :autoplay="4000" indicator-color="white" :stop-propagation="false ">
   <van-swipe-item v-for="item in banners" :key="item.id">
      <a :href="item.link">
        <img v-lazy="item.image" alt @load="imageLoad" />
      </a>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import Vue from "vue";
import { Swipe, SwipeItem } from "vant";
Vue.use(Swipe).use(SwipeItem);

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isLoad: false
    };
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.$emit("swiperImageLoad");
        this.isLoad = true;
      }
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 12px;
}
.swipe {
  width: 100%;
  height: 51.56vw;
}
.swipe img {
  width: 100%;
  height: 100%;
}
.van-swipe__indicator{
  width: 10px;
  height: 10px;
}
</style>