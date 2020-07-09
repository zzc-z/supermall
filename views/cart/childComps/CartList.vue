<template>
  <div class="cart-list">
    <Scroll ref="scroll" class="content">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item">
      </cart-list-item>
    </Scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Scroll from "@/components/common/scroll/Scroll";
import CartListItem from "./CartListItem";

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(["cartList"])
  },
  activated() {
    this.$refs.scroll.refresh();
  },
  mounted(){
    // console.log(this.cartList)
  }
};
</script>

<style scoped>
.cart-list {
  position: relative;
  height: 100vh;
}
.content {
  overflow: hidden;
  position: absolute;
  top:44px;
  bottom: 89px;
  left: 0;
  right: 0;
  z-index: 50;
}
</style>