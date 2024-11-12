import { createRouter, createWebHistory } from 'vue-router'

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
            path: "/dom",
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
                    path: "createPost",
                    component: () => import('../views/forum/CreatePost.vue')
                }
            ]
        }
    ]
})
