<template>
  <div class="tab-control">
    <div
      v-for="(item,index) in titles"
      :key="index"
      :class="{active:index===currentIndex }"
      @click="ItemClick(index)"
      class="tab-control-item">
      <span>{{item}}</span>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "TabControl",
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
      this.$emit('tabClick',index)  
    }
  },
  data() {
    return {
      currentIndex: 0
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