<template>
  <van-tabs v-model="active" sticky>
    <van-tab v-for="index in titles" :title="index" :key="index">
      {{ index }}
  </van-tab>
  </van-tabs>
</template>

<script>
import Vue from "vue";
import { Tab, Tabs } from "vant";

Vue.use(Tab).use(Tabs);

export default {
  name: "Profile",
  data() {
    return {
      active: 0,
      titles:['流行','新款','精选']
    };
  }
};
</script>

<style scoped>
</style>