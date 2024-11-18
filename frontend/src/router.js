import {createRouter, createWebHistory} from 'vue-router'
import HomePage from '@/views/Home.vue'
import NotFound from '@/views/errors/NotFound.vue'
import List from '@/views/List.vue'

const routes = [
    {
        path: '/home',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: "/list",
        name: "List",
        component: List
    }
];


routes.push({
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
})


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router