import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import ProductView from './views/ProductView.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/product/:id', name: 'ProductView', component: ProductView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
