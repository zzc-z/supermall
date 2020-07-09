<template>
  <div id="detail">
    <detail-nav-bar ref="nav" class="detail-nav" @titleClick="titleClick"></detail-nav-bar>
    <scroll @scroll="contentScroll" :probeType="3" ref="scroll" class="content">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-image-info @itemImgLoad="itemImgLoad" :detail-info="detailInfo"></detail-image-info>
      <detail-params-info ref="params" :param-info="paramInfo"></detail-params-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @scroll="contentScroll" @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailShopInfo from "./childComps/DetailShopInfo";
import Scroll from "@/components/common/scroll/Scroll";
import DetailImageInfo from "./childComps/DetailImageInfo";
import DetailParamsInfo from "./childComps/DetailParamsInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottonBar";

import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import GoodsList from "@/components/content/goods/GoodsList";

import { debounce } from "../../src/utils/utils";
import { itemListenerMixin, BackTopMixin } from "@/utils/mixin";

import { getDetail, Goods, Shop, getRecommend } from "@/entwork/detail";


export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailImageInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar
  },
  mixins: [itemListenerMixin, BackTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      saveY: 0,
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
    };
  },
  created() {
    //保存传入的iid
    this.iid = this.$route.params.iid;
    // console.log(this.$route);

    getDetail(this.iid).then(res => {
      //对数据进行分离 方便以后用
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      // console.log(res);
      //获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //获取店铺信息
      this.shop = new Shop(data.shopInfo);
      //获取详情的信息
      this.detailInfo = data.detailInfo;
      //获取参数信息
      this.paramInfo = data.itemParams;
      //获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    ///获取推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });

    //给themeTopYs的赋值进行防抖
    this.getThemeTopY = debounce(() => {
      //自带的异步回调方法
      //注意图片加载完毕才行
      this.themeTopYs = [];
      this.$nextTick(() => {
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        //多加一个值让他变得更好判断
        this.themeTopYs.push(Number.MAX_VALUE);
        // console.log(Number.MAX_VALUE);
      });
    }, 150);
  },
  updated() {},
  //离开页面
  destroyed() {
    //离开后取消接受事件总线
    // console.log('ok')
    this.$bus.$off("itemImgLoad", this.itemImgLintener);
  },
  methods: {
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
      // console.log(index);
    },
    itemImgLoad() {
      this.getThemeTopY();
    },
    contentScroll(position) {
      const positionY = -position.y;
      // console.log(positionY);

      //positionY在 0和 7938 之间，index=0
      //positionY在 7938和 9120 之间，index=1
      //positionY在 9120和 9425 之间，index=2
      //positionY在 大于等于 9425 之间，index=3
      const length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        //通过 赋值 处理将判断条件简化  也防止多次调用
        if (
          this.currentIndex !== i &&
          (positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1])
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
          // console.log(this.currentIndex);
        }
      }
      this.isShowBackTop = -position.y > 1000;
    },
    addToCart() {
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.newPrice;
      product.iid = this.iid;
      // console.log( product);
      //添加购物车

      this.$store.dispatch("addCart", product).then(res => {
        // console.log(res);
        // this.show = true;
        // this.message = res;

        // setTimeout(() => {
        //   this.show = false;
        //   this.message = "";
        // }, 2000);
        this.$toast.show(res, 1000);
      });
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 30;
  background-color: #fff;
  /* 100%视口高度 */
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 30;
  background-color: #fff;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* .content{
  height: calc(100%-44px);
} */
</style>