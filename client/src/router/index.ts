import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Dashboard from '@/views/Dashboard.vue'
import Profile from '@/views/Profile.vue'
import Games from '@/views/Games.vue'
import Bank from '@/views/Bank.vue'
import Shop from '@/views/Shop.vue'
import SalesTerms from '@/views/SalesTerms.vue'
import PrivacyPolicy from '@/views/PrivacyPolicy.vue'
import ContactUs from '@/views/ContactUs.vue'
import FAQ from '@/views/FAQ.vue'
import Restorelogin from '@/views/Restorelogin.vue'
import token_check from '@/router/TokenCheck'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/registration',
    name: 'Register',
    component: Register,
    beforeEnter: async (to, from, next) => {
      
      next()
    }
  },
  {
    path: '/login',
    name: 'Login_page',
    component: Login,
    beforeEnter: async (to, from, next) => {
      
      next()
    }
  },
  {
    path: '/recoverlogin',
    name: 'Restorelogin',
    component: Restorelogin
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: async (to, from, next) => {
      await token_check()
      next()
    }
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: Profile,
    beforeEnter: async (to, from, next) => {
      await token_check()
      next()
    }
  },
  {
    path: '/games',
    name: 'Games',
    component: Games,
    beforeEnter: async (to, from, next) => {
      await token_check()
      next()
    }
  },
  {
    path: '/bank',
    name: 'Bank',
    component: Bank,
    beforeEnter: async (to, from, next) => {
      await token_check()
      next()
    }
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop,
    beforeEnter: async (to, from, next) => {
      await token_check()
      next()
    }
  },
  {
    path: '/terms-condition-sale',
    name: 'SalesTerms',
    component: SalesTerms
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy
  },
  {
    path: '/contact-us',
    name: 'ContactUs',
    component: ContactUs
  },
  {
    path: '/frequent-asked-questions',
    name: 'FAQ',
    component: FAQ
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
