import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Referral from '@/views/Referral.vue'
import Profile from '@/views/Profile.vue'
import SalesTerms from '@/views/SalesTerms.vue'
import PrivacyPolicy from '@/views/PrivacyPolicy.vue'
import ContactUs from '@/views/ContactUs.vue'
import FAQ from '@/views/FAQ.vue'
import Restorelogin from '@/views/Restorelogin.vue'
import Err404 from '@/views/Err404.vue'
import Resetpass from '@/views/reset_pass.vue'
import Admin from '@/views/Admin.vue'
import Staff from '@/views/Staff.vue'
import Nav from '@/views/Nav.vue'
import Shop from '@/views/Shop.vue'
import Bank from '@/views/Bank.vue'
import Community from '@/views/Community.vue'
import jwt_decode from "jwt-decode"
const axios = require('axios')


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    meta: {
      public: true,
    },
    component: Home
  },
  {
    path: '/registration',
    name: 'Register',
    component: Register,
    meta: {
      public: true,
    },
    beforeEnter(to, from, next){
      return tokenCheck(next)
    }
  },
  {
    path: '/referral/:id',
    name: 'Referral',
    component: Referral,
    meta: {
      public: true,
    },
    beforeEnter(to, from, next){
      return tokenCheck(next)
    }
  },
  {
    path: '/login',
    name: 'Login_page',
    component: Login,
    meta: {
      public: true,
    },
    beforeEnter(to, from, next){
      return tokenCheck(next)
    }
  },
  {
    path: '/recoverlogin',
    name: 'Restorelogin',
    meta: {
      public: true,
    },
    component: Restorelogin
  },
  {
    path: '/reset-password/:id/:key',
    name: 'Resetpass',
    meta: {
      public: true,
    },
    component: Resetpass
  },
  {
    path: '/dashboard',
    name: 'Nav',
    meta: {
      public: false,
    },
    component: Nav,
  },
  {
    path: '/admin',
    name: 'Admin',
    meta: {
      public: false,
    },
    component: Admin,
  },
  {
    path: '/staff',
    name: 'Staff',
    meta: {
      public: false,
    },
    component: Staff,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      public: false,
    },
  },
  {
    path: '/community',
    name: 'Community',
    component: Community,
    meta: {
      public: false,
    },
  },
  {
    path: '/bank',
    name: 'Bank',
    component: Bank,
    meta: {
      public: false,
    },
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop,
    meta: {
      public: false,
    },
  },
  {
    path: '/terms-condition-sale',
    name: 'SalesTerms',
    meta: {
      public: true,
    },
    component: SalesTerms
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    meta: {
      public: true,
    },
    component: PrivacyPolicy
  },
  {
    path: '/contact-us',
    name: 'ContactUs',
    meta: {
      public: true,
    },
    component: ContactUs
  },
  {
    path: '/frequent-asked-questions',
    name: 'FAQ',
    meta: {
      public: true,
    },
    component: FAQ
  },
  {
    path: '/:allPath(.*)',
    component: Err404,
    meta: {
      public: true,
    },
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


// checks authorizations between public and private pages
router.beforeEach(async (to, from, next) =>
{
  const  token  = localStorage.getItem('token')

  const tokenData = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  if (!to.meta.public){
    if(!token) {
      localStorage.clear()
      return next('/')
    }
    await axios.post('http://localhost:3000/api/token', {}, tokenData).then(async (res:any) => {
      if(to.path !== '/admin' && to.path !== '/staff') return next()

      interface token_data {
        exp: number,
        iat: number,
        id: string,
        is_admin: boolean,
        is_staff: boolean,
        last_login: string
      }
      const decoded_token :token_data = jwt_decode(token)

      if(to.path === '/admin' && res.status == 200){
        if(!decoded_token.is_admin) return next('/dashboard')
        return next()
      }

      if(to.path === '/staff' && res.status == 200){
        if(!decoded_token.is_staff) return next('/dashboard')
        return next()
      }
    }).catch((err:any) => {
      localStorage.clear()
      return next('/')
    })
  }
  else{
    next()
  }
})



// check if login and registration path are unaccessible if logged
const tokenCheck = async (next:any) => {
  const  token  = localStorage.getItem('token')
  const tokenData = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  if(!token) {
    localStorage.clear()
    return next()
  }

  if(token){
    await axios.post('http://localhost:3000/api/token', {}, tokenData).then((res:any) => {
      if(res.status == 200) return next('/dashboard')
    }).catch((err:any) => {
      localStorage.clear()
      return next()
    })
  }
  return next()
}

export default router
