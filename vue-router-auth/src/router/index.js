import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: () => import('../components/HelloWorld.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../components/Register.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/dashboard',
    name: 'userboard',
    component: () => import('../components/UserBoard.vue'),
    meta: {
      registerAuth: true
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../components/Admin.vue'),
    meta: {
      registerAuth: true,
      is_admin: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.registerAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      const user = JSON.parse(localStorage.getItem('user'))
      if (to.matched.some(record => record.meta.is_admin)) {
        if (user.is_admin === 1) {
          next()
        } else {
          next({ name: 'userboard' })
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('jwt') == null) {
      next()
    } else {
      next({ name: 'userboard' })
    }
  } else {
    next()
  }
})

export default router
