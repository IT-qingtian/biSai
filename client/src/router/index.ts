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
            // component: () => import('@/views/Home.vue'),
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
                    component: () => import('../views/consultation/Medication.vue')
                }

            ]
        }
    ]
})
