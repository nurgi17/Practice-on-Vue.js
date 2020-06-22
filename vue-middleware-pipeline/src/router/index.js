import Vue from 'vue'
import VueRouter from 'vue-router'
import guest from './middleware/guest'
import auth from './middleware/auth'
import isSubscribed from './middleware/IsSubscribeed'
import middlewarePipeline from './middlewarePipeline'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: {
      middleware: [
        guest
      ]
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      middleware: [
        auth
      ]
    },
    children: [
      {
        path: '/dashboard/movies',
        name: 'dashboard.movies',
        component: () => import('../views/Movies.vue'),
        meta: {
          middleware: [
            auth,
            isSubscribed
          ]
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware
  const context = {
    to,
    from,
    next,
    store
  }
  return middleware[0]({
    ...context,
    nextMiddleware: middlewarePipeline(context, middleware, 1)
  })
})

export default router
