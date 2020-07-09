import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('../../views/home/Home.vue')
const Category = () => import('../../views/category/Category.vue')
const Cart = () => import('../../views/cart/Cart.vue')
const Profile = () => import('../../views/profile/Profile.vue')
const Detail=()=>import ('../../views/detail/Detail.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      component:Home
    },
    {
      path: '/category',
      component: Category
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/profile',
      component: Profile
    },
    {
      path: '/detail/:iid',
      component: Detail,
      meta: {
        keepAlive: true // 不需要被缓存
      }
    }
  ],
  mdoe: 'history'
})
