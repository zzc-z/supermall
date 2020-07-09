<template>
  <div class="tab-control">
    <!-- <div
      v-for="(item,index) in titles"
      :key="index"
      :class="{active:index===currentIndex }"
      @click="ItemClick(index)"
      class="tab-control-item">
      <span>{{item}}</span>
    </div>-->
    <van-tabs v-model="active" sticky>
      <van-tab v-for="(item,index) in titles" :titles="['流行','新款','精选']" :key="index">
        <van-tab title="标签 1">内容 1</van-tab>
        <van-tab title="标签 2">内容 2</van-tab>
        <van-tab title="标签 3">内容 3</van-tab>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "tbControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    ItemClick(index) {
      this.currentIndex = index;
      this.$emit("tabClick", index);
    }
  },
  data() {
    return {
      currentIndex: 0,
      active: 0
    };
  }
};
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  margin-top: -1px;
}
.tab-control-item {
  flex: 1;
}
.tab-control-item span {
  padding: 5px;
}
.active {
  color: rgb(253, 156, 173);
}
.active span {
  border-bottom: 3px solid rgb(253, 156, 173);
}
</style>