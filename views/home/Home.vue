<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      ref="tabControl1"
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      class="tab-control"
      v-show="isTabFixed"
    />
    <Scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper class="home-swiper" :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control ref="tabControl2" :titles="['流行','新款','精选']" @tabClick="tabClick" />
      <goods-list :goods="showGoods" />
    </Scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import BackTop from "@/components/content/backTop/BackTop";
import Scroll from "@/components/common/scroll/Scroll";

import { debounce } from "@/utils/utils";
import { itemListenerMixin } from "@/utils/mixin";

import { getHomeMultidata, getHomeGoods } from "@/entwork/home";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      refresh: true,
      scroll: [0, 0, 0],
      index: 0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  //进入页面
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
    this.$bus.$off("itemImgLoad", this.itemImgLintener);
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    var that = this;
    setTimeout(function() {
      that.scroll = [that.tabOffsetTop, that.tabOffsetTop, that.tabOffsetTop];
    }, 500);
  },
  methods: {
    tabClick(index) {
      //一定要写在最上面
      this.index = index;
      switch (index) {
        case 0:
          this.currentType = "pop";
          if (-this.$refs.scroll.scroll.y < this.tabOffsetTop) {
            console.log(-this.$refs.scroll.scroll.y);
            console.log(this.tabOffsetTop);
            this.$refs.scroll.scrollTo(0, this.$refs.scroll.scroll.y, 100);
          } else {
            this.$refs.scroll.scrollTo(0, -this.scroll[0], 100);
          }
          break;
        case 1:
          this.currentType = "new";
          if (-this.$refs.scroll.scroll.y < this.tabOffsetTop) {
            console.log(-this.$refs.scroll.scroll.y);
            console.log(this.tabOffsetTop);
            this.$refs.scroll.scrollTo(0, this.$refs.scroll.scroll.y, 100);
          } else {
            this.$refs.scroll.scrollTo(0, -this.scroll[1], 100);
          }
          break;
        case 2:
          this.currentType = "sell";
          if (-this.$refs.scroll.scroll.y < this.tabOffsetTop) {
            console.log(-this.$refs.scroll.scroll.y);
            console.log(this.tabOffsetTop);
            this.$refs.scroll.scrollTo(0, this.$refs.scroll.scroll.y, 100);
          } else {
            this.$refs.scroll.scrollTo(0, -this.scroll[2], 100);
          }
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
      // console.log(this.scroll);
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000;
      this.isTabFixed = -position.y > this.tabOffsetTop;

      if (this.tabOffsetTop < -position.y) {
        // console.log(this.tabOffsetTop)
        // console.log(-position.y)
        this.scroll[this.index] = -position.y;
      }
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },

    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>
<style scoped>
#home {
  position: relative;
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
.home-swiper {
  width: 100%;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control {
  position: relative;
  z-index: 9;
}
</style>