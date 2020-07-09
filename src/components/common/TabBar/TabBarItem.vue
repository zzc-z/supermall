<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "#F06292 "
    }
  },
  data() {
    return {};
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path);
    }
  }
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  float: left;
  text-align: center;
  padding-top: 5px;
}
.tab-bar-item img{
  margin-top: 1px;
  width: 25px;
  height: 25px;
}
</style>