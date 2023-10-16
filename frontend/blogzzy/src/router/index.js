import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PostView from '../views/PostView.vue'
import AllCategoriesView from '../views/AllCategoriesView.vue'
import CategoryView from '../views/CategoryView.vue'
import TagView from '../views/TagView.vue'
import AllTagsView from '../views/AllTagsView.vue'
import SignUpView from '../views/SignUpView.vue'
import SignInView from '@/views/SignInView.vue'
import UploadFile from '@/components/UploadFile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUpView
    },
    {
      path: '/login',
      name: 'SignIn',
      component: SignInView
    },
    {
      path: '/category/:category',
      name: 'Category',
      component: CategoryView
    },
    {
      path: '/categories',
      name: 'Categories',
      component: AllCategoriesView
    },
    {
      path: '/post/:slug',
      name: 'Post',
      component: PostView
    },
    {
      path: '/tag',
      name: 'Tag',
      component: TagView
    },
    {
      path: '/add-post',
      name: 'AddPost',
      component: () => import("../views/AddPost.vue")
    },
    {
      path: '/tags',
      name: 'Tags',
      component: AllTagsView
    },
    {
      path: '/file',
      name: 'FileInput',
      component: UploadFile
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
