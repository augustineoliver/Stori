import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LandingPage from "@/views/LandingPage";
import Login from "@/views/auth/Login";
import SignUp from "@/views/auth/SignUp";
import Editor from "@/views/editor/Editor";
import Upload from "@/views/Upload";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/editor',
    name: 'Editor',
    component: Editor
  },
  {
    path: '/upload',
    name: 'Upload',
    component: Upload
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && to.name !== 'SignUp' && !localStorage.getItem('authToken')) {
    next({ name: 'Login' });
  }
  else if ((to.name === 'Login' || to.name === 'SignUp' || to.name === 'LandingPage') && localStorage.getItem('authToken')) {
    next({ name: 'Editor' });
  } else next()
})

export default router
