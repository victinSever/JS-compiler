import { createRouter, createWebHashHistory } from 'vue-router'


import Home from '@/views/home'
import Document from '@/views/document'
const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/document',
        component: Document,
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    next()
})

export default router