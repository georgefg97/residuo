<script setup>
import { ref } from 'vue';

import {
    Recycle,
    Menu,
    X,
    ArrowUpRight
} from 'lucide-vue-next';

const menuAbierto = ref(false);

const enlaces = [
    { nombre: 'Inicio', ruta: '/' },
    { nombre: 'Introducción', ruta: '/introduccion' },
    { nombre: 'Problema', ruta: '/problema' },
    { nombre: 'Objetivo', ruta: '/objetivo' },
    { nombre: 'Marco teórico', ruta: '/marco-teorico' },
    { nombre: 'Conclusiones', ruta: '/conclusiones' },

];

function cerrarMenu() {
    menuAbierto.value = false;
}
</script>

<template>
    <header class="navbar">

        <div class="nav-container">

            <RouterLink
                to="/"
                class="logo"
                @click="cerrarMenu"
            >
                <div class="logo-icon">
                    <Recycle :size="25" />
                </div>

                <span>Residu<span class="logo-x">X</span></span>
            </RouterLink>

            <nav :class="['nav-links', { abierto: menuAbierto }]">

                <RouterLink
                    v-for="enlace in enlaces"
                    :key="enlace.ruta"
                    :to="enlace.ruta"
                    @click="cerrarMenu"
                >
                    {{ enlace.nombre }}
                </RouterLink>

                <RouterLink
                    to="/aplicacion"
                    class="nav-button"
                    @click="cerrarMenu"
                >
                    Simulador
                    <ArrowUpRight :size="17" />
                </RouterLink>

            </nav>

            <button
                class="menu-button"
                @click="menuAbierto = !menuAbierto"
                :aria-expanded="menuAbierto"
                aria-label="Abrir o cerrar menú"
            >
                <X v-if="menuAbierto" />
                <Menu v-else />
            </button>

        </div>

    </header>
</template>

<style scoped>
.navbar {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: #ffffffee;
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
}

.nav-container {
    max-width: 1440px;
    min-height: 80px;
    margin: auto;
    padding: 0 30px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 25px;
}

.logo {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 27px;
    font-weight: 800;
    letter-spacing: -1.5px;
}

.logo-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: var(--primary);
    color: white;

    display: grid;
    place-items: center;
}

.logo-x {
    color: var(--primary);
}

.nav-links {
    display: flex;
    align-items: center;
    gap: 20px;
}

.nav-links a {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-secondary);
    transition: color 0.2s;
}

.nav-links a:hover,
.nav-links a.router-link-exact-active {
    color: var(--primary-dark);
}

.nav-links .nav-button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 18px;
    border-radius: 9px;
    background: var(--dark);
    color: white;
}

.nav-links .nav-button:hover,
.nav-links .nav-button.router-link-exact-active {
    background: var(--primary-dark);
    color: white;
}

.menu-button {
    display: none;
    background: transparent;
    border: none;
    color: var(--dark);
}

@media (max-width: 1150px) {
    .menu-button {
        display: block;
    }

    .nav-links {
        display: none;
        position: absolute;
        top: 80px;
        left: 0;
        right: 0;
        background: white;
        padding: 25px;
        border-bottom: 1px solid var(--border);
        flex-direction: column;
        align-items: stretch;
    }

    .nav-links.abierto {
        display: flex;
    }

    .nav-links a {
        padding: 8px;
    }
}
</style>