<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="@/assets/img/cart/tick.svg" alt />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type:Boolean,
      default: true
    }
  },
  watch:{
    isChecked:function(index){
    // console.log(index)
    }
  }
};
</script>

<style scoped>
.check-button {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #aaa;
}
.check {
  border-color: var(--color-tint);
  background-color: var(--color-tint);
}
</style>