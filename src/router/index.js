import { createRouter, createWebHistory } from 'vue-router';

import Inicio from '../views/Inicio.vue';
import Introduccion from '../views/Introduccion.vue';
import Problema from '../views/Problema.vue';
import Objetivo from '../views/Objetivo.vue';
import MarcoTeorico from '../views/MarcoTeorico.vue';
import Aplicacion from '../views/Aplicacion.vue';
import Conclusiones from '../views/Conclusiones.vue';

const routes = [
    {
        path: '/',
        name: 'Inicio',
        component: Inicio
    },
    {
        path: '/introduccion',
        name: 'Introduccion',
        component: Introduccion
    },
    {
        path: '/problema',
        name: 'Problema',
        component: Problema
    },
    {
        path: '/objetivo',
        name: 'Objetivo',
        component: Objetivo
    },
    {
        path: '/marco-teorico',
        name: 'MarcoTeorico',
        component: MarcoTeorico
    },
    {
        path: '/aplicacion',
        name: 'Aplicacion',
        component: Aplicacion
    },
    {
        path: '/conclusiones',
        name: 'Conclusiones',
        component: Conclusiones
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 };
    }
});

export default router;