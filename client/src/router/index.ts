import NotFound from '@/views/NotFound.vue'
import { createRouter, createWebHistory } from 'vue-router'
import PostDetail from '../views/forum/PostDetail.vue'
import UserLogin from '../views/user/UserLogin.vue'
import UserRegister from '../views/user/UserRegister.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            redirect: "/home"
        },
        {
            path: "/home",
            name: "home",
            component: () => import('../views/Home.vue'),
        },
        {
            // 咨询
            path: "/consultation",
            children: [
                {
                    name: "search",
                    path: "search",
                    component: () => import('../views/consultation/Search.vue')
                },
                {
                    name: "register",
                    path: "register",
                    component: () => import('../views/consultation/Register.vue')
                },
                {
                    name: "medication",
                    path: "medication",
                    component: () => import('../views/consultation/Chat.vue')
                }
            ]
        },
        {
            // 活动
            path: "/activities",
            children: [
                {
                    name: "recent",
                    path: "recent",
                    component: () => import('../views/activities/Recent.vue')
                },
                {
                    name: "past",
                    path: "past",
                    component: () => import('../views/activities/Past.vue')
                }
            ]
        },
        {
            path: '/article',
            name: 'Article',
            component: () => import('../views/Article.vue')
        },
        {
            path: "/doc",
            children: [
                {
                    name: "forum",
                    path: "forum",
                    component: () => import('../views/forum/Forum.vue')
                },
                {
                    name: "literature",
                    path: "literature",
                    component: () => import('../views/forum/Literature.vue')
                },
                {
                    name: "createPost",
                    path: "create",
                    component: () => import('../views/forum/CreatePost.vue')
                }
            ]
        },
        {
            path: '/forum/post/:id',
            name: 'post-detail',
            component: PostDetail
        },
        {
            path: '/user',
            name: 'user',
            component: () => import('../views/user/index.vue'),
            redirect: '/user/login',
            children: [
                {
                    path: 'login',
                    name: 'login',
                    component: UserLogin
                },
                {
                    path: 'register',
                    name: 'register',
                    component: UserRegister
                },
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: NotFound
        },
    ]
})
