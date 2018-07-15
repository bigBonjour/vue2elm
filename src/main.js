// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import goods from '@/components/goods/goods'
import ratings from '@/components/ratings/ratings'
import seller from '@/components/seller/seller'
import "@/common/css/main.css"
import "@/common/css/style.css"
import "@/common/css/reset.css"
Vue.config.productionTip = false
//安装路由插件
Vue.use(VueRouter)
/* eslint-disable no-new */
const routes = [{
    path: '/',
    redirect: '/goods'
  }, {
    path: '/goods',
    component: goods,
    name: 'goods'
  },
  {
    path: '/ratings',
    component: ratings,
    name: 'ratings'
  },
  {
    path: '/seller',
    component: seller,
    name: 'seller'
  }
];
// 创建路由实例
const router = new VueRouter({
  routes: routes
})
// 关键在这里，设置afterEach钩子函数
router.afterEach((to, from, next) => {
  let title = "饿了么-商品";
  switch (to.name) {
    case "seller":
      title = "饿了么-商家";
      break;
    case "goods":
      title = "饿了么-商品";
      break;
    case "ratings":
      title = "饿了么-评价";
      break;
  }
  document.title = title;
});
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')