import {createRouter, createWebHashHistory} from "vue-router";
import Currency from '../views/Currency.vue';
import Converter from '../views/Converter.vue';

const routes = [
  {
    path: '/',
    name: 'Currency',
    component: Currency,
  },
  {
    path: '/converter',
    name: 'Converter',
    component: Converter,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router