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

export default createRouter({
    history: createWebHashHistory(),
    routes,
})