<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar class="tab-bar-item" />
  </div>
</template>

<script>
import MainTabBar from "@/components/content/MainTabBar/MainTabBar";
import { request } from "@/entwork/request";

export default {
  name: "app",
  components: {
    MainTabBar
  }
};
</script>

<style>
@import "./assets/css/base.css";
</style>
