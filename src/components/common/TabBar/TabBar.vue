<template>
<!-- tabbar的父div -->
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"  
};
</script>
<style scoped>
#tab-bar {
  width: 100%;
  height: 49px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f6f6f6;
  display: flex;
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.2);
  z-index: 20;
}
</style>