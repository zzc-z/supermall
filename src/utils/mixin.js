import { debounce } from "@/utils/utils";
import BackTop from "@/components/content/backTop/BackTop";

export const itemListenerMixin = {
    data() {
        return {
            itemImgLintener: null,
            newRefresh: null,
        }
    },
    mounted() {
        this.newRefresh = debounce(this.$refs.scroll.refresh, 300);
        this.itemImgLintener = () => {
            this.newRefresh();
        };
        this.$bus.$on("itemImgLoad", this.itemImgLintener);
        // this.$bus.$on("detailImageLoad", this.itemImgLintener);
    }
}
export const BackTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, 500);
        }
    }
}