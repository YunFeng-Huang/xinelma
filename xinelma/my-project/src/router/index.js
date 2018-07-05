import Vue from 'vue'
import Router from 'vue-router'
import goods from '../components/goods'
import ratings from '../components/ratings'
import merchant from '../components/merchant'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      redirect:'/goods'
    },
    {
      path: '/goods',
      component: goods
    },
    {
      path: '/ratings',
      component:ratings
    },
    {
      path:'/merchant',
      component:merchant
    }
  ]
})
