import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StocksView from '../views/StocksView.vue'
import StockDetail from '../views/StockDetail.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/stocks', component: StocksView },
  { path: '/stocks/:ticker', component: StockDetail }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
