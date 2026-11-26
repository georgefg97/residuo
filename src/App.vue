<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>

<template>
    <Navbar />

    <main class="main-content">
        <RouterView />
    </main>

    <Footer />
</template>

<style scoped>
.main-content {
    flex: 1;
}
</style>