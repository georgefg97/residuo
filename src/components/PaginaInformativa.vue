<script setup>
defineProps({
    etiqueta: String,
    titulo: String,
    descripcion: String,
    numero: String
});
</script>

<template>
    <section class="page-header">
        <div class="container">

            <span class="etiqueta">
                {{ etiqueta }}
            </span>

            <h1>{{ titulo }}</h1>

            <p>{{ descripcion }}</p>

            <span class="numero">{{ numero }}</span>

        </div>
    </section>

    <section class="container page-content">
        <slot />
    </section>
</template>

<style scoped>
.page-header {
    background: linear-gradient(120deg, #0f172a, #064e3b);
    color: white;
    padding: 80px 0;
    overflow: hidden;
}

.page-header .container {
    position: relative;
}

.etiqueta {
    color: #6ee7b7;
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 2px;
}

h1 {
    font-size: clamp(35px, 5vw, 55px);
    margin: 20px 0;
    position: relative;
    z-index: 1;
}

p {
    color: #cbd5e1;
    max-width: 750px;
    line-height: 1.8;
    position: relative;
    z-index: 1;
}

.numero {
    position: absolute;
    right: 30px;
    top: -65px;
    font-size: 220px;
    font-weight: 900;
    opacity: 0.06;
}

.page-content {
    padding-top: 50px;
    padding-bottom: 70px;
}
</style>