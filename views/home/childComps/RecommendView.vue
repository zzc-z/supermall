<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.sort" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt />
        <div class="p">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration:none
}
.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;
  color: black;
  padding: 10px 0 20px;
  border-bottom: 10px solid #eee;
}
.recommend .p {
    color: black;
    list-style: none;
}

.recommend-item {
  flex: 1;
}

.recommend-item img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
</style>