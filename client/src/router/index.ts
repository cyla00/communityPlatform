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

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/registration',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login_page',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/games',
    name: 'Games',
    component: Games
  },
  {
    path: '/bank',
    name: 'Bank',
    component: Bank
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop
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
