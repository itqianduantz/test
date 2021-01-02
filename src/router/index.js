import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')

Vue.use(VueRouter)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// }
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
};


const routes = [
 {
   path:"",
   //重定向
   redirect:"/home"
 },
   {
     path:"/home",
     component:Home,
   // meta:{
 	 //  title:'首页'
   // },
  },
 {
   path:"/category",
   component:Category,
   // meta:{
   // 		  title:'分类'
   // },
 },
 {
   path:"/cart",
   component:Cart,
   // meta:{
   // 		  title:'购物车'
   // },
 },
 {
   path:"/profile",
   component:Profile,
   // meta:{
   // 		  title:'我的'
   // },
 },
    {
        path:"/detail/:iid",
        component:Detail,
        // meta:{
        // 		  title:'我的'
        // },
    }
]

const router = new VueRouter({
routes,
  mode: 'history',
})

export default router
