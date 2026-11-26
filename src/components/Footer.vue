<script setup>
import { Recycle, MapPin } from 'lucide-vue-next';
</script>

<template>
    <footer class="footer">

        <div class="container footer-content">

            <div>
                <div class="brand">
                    <Recycle :size="30" />
                    Residu<span>X</span>
                </div>

                <p>Inteligencia que transforma residuos.</p>
            </div>

            <div>
                <h4>Proyecto académico</h4>
                <p>Investigación de operaciones</p>
                <p>Algoritmo de asignación</p>
            </div>

            <div>
                <h4>Ubicación</h4>

                <p class="location">
                    <MapPin :size="18" />
                    El Alto, La Paz, Bolivia
                </p>
            </div>

        </div>

        <div class="copyright">
            © {{ new Date().getFullYear() }} ResiduX.
            Proyecto académico.
        </div>

    </footer>
</template>

<style scoped>
.footer {
    background: var(--dark);
    color: white;
    padding-top: 50px;
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 40px;
    padding-bottom: 40px;
}

.brand {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 28px;
    font-weight: 800;
    color: var(--primary);
}

.brand span {
    color: white;
}

h4 {
    margin-bottom: 15px;
}

p {
    color: #94a3b8;
    font-size: 14px;
    margin-top: 8px;
}

.location {
    display: flex;
    align-items: center;
    gap: 8px;
}

.copyright {
    text-align: center;
    border-top: 1px solid #334155;
    padding: 20px;
    font-size: 13px;
    color: #94a3b8;
}
</style>