<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" class="check-button"></check-button>
      <span>全选</span>
    </div>

    <div class="price">合计：{{totalPrice}}</div>

    <div class="caculate" @click="calcClick">去计算({{checkLength}})</div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/CheckButton/CheckButton";
import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  data() {
    return {
      price: 0
    };
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            // console.log(parseInt(item.price.substr(1)))
            return preValue + parseInt(item.price.substr(1)) * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length;
    },
    isSelectAll() {
      //全选
      if (this.cartList.length === 0) {
        return false;
      } else {
        //   return !(this.cartList.filter(item => !item.checked).length);
        return !this.cartList.find(item => !item.checked);
      }
    }
  },
  methods:{
    calcClick(){
      if (!this.isSelectAll) {
        this.$toast.show('请选择购买的商品',2000)
      }
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  width: 100%;
  background-color: #eee;
  position: fixed;
  bottom: 49px;
  display: flex;
}
.check-content {
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 20px;
  line-height: 38px;
  flex: 1;
}
.caculate {
  width: 90px;
  background-color: red;
  color: aliceblue;
  text-align: center;
  line-height: 38px;
}
</style>