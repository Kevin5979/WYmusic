import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 懒加载处理
const Recommend = () => import("views/recommend/Recommend")
const Singer = () => import("views/singer/Singer")
const Rank = () => import("views/rank/Rank")
const Search = () => import("views/search/Search")

const Account = () => import("components/Account/Account")

const Detail = () => import("views/recommend/Detail")

const routes = [
  {
    path: '',
    // 默认路由
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend,
    children: [
      {
        path: 'personalized',
        component: Detail
      },
      {
        path: 'album',
        component: Detail
      }
    ]
  },
  {
    path: '/singer',
    component: Singer,
    children: [
      {
        path: 'detail',
        component: Detail
      },
    ]
  },
  {
    path: '/rank',
    component: Rank,
    children: [
      {
        path: 'detail',
        component: Detail
      },
    ]

  },
  {
    path: '/search',
    component: Search
  },
  {
    path: "/account",
    component: Account
  }
]

const router = new VueRouter({
  // 使用history模式，打包上架后不能刷新,需要后端人员处理
  // 注意点:如果需要使用预渲染插件,必须使用history模式,否则打包失败
  mode: 'history',
  // mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
