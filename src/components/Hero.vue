<script setup>
import {
    ArrowRight,
    MapPin,
    Truck,
    Fuel,
    Leaf,
    ArrowUpRight,
    Activity
} from 'lucide-vue-next';
</script>

<template>

    <section class="hero">

        <div class="hero-container">

            <div class="hero-content">

                <div class="badge">
                    <MapPin :size="15" />
                    EL ALTO · LA PAZ · BOLIVIA
                </div>

                <h1>
                    Inteligencia que
                    transforma
                    <span>residuos.</span>
                </h1>

                <p class="description">
                    Optimizamos la asignación de camiones
                    recolectores mediante algoritmos matemáticos
                    para reducir el consumo de combustible
                    y construir una ciudad más sostenible.
                </p>

                <div class="actions">

                    <RouterLink
                        to="/aplicacion"
                        class="btn btn-primary"
                    >
                        Iniciar simulación
                        <ArrowRight :size="20" />
                    </RouterLink>

                    <RouterLink
                        to="/problema"
                        class="btn btn-outline"
                    >
                        Conocer el proyecto
                        <ArrowUpRight :size="18" />
                    </RouterLink>

                </div>

                <div class="status">
                    <span class="status-dot"></span>
                    Prototipo académico de optimización urbana
                </div>

            </div>

            <div class="dashboard">

                <div class="dashboard-header">

                    <div>
                        <span class="small-label">
                            RESIDUX ANALYTICS
                        </span>

                        <h3>Gestión inteligente</h3>
                    </div>

                    <Activity :size="28" color="#10b981" />

                </div>

                <div class="metrics">

                    <div class="metric">
                        <Truck :size="25" />
                        <span>Camiones disponibles</span>
                        <strong>05</strong>
                    </div>

                    <div class="metric">
                        <MapPin :size="25" />
                        <span>Zonas de recolección</span>
                        <strong>05</strong>
                    </div>

                    <div class="metric">
                        <Fuel :size="25" />
                        <span>Consumo optimizado</span>
                        <strong>50 L</strong>
                    </div>

                    <div class="metric">
                        <Leaf :size="25" />
                        <span>Ahorro estimado</span>
                        <strong>50,5%</strong>
                    </div>

                </div>

                <div class="chart">

                    <h4>Optimización de combustible</h4>

                    <div class="chart-label">
                        <span>Asignación inicial</span>
                        <strong>101 L</strong>
                    </div>

                    <div class="bar">
                        <div class="bar-before"></div>
                    </div>

                    <div class="chart-label">
                        <span>Asignación optimizada</span>
                        <strong>50 L</strong>
                    </div>

                    <div class="bar">
                        <div class="bar-after"></div>
                    </div>

                </div>

                <div class="dashboard-note">
                    Datos ilustrativos de una simulación académica.
                </div>

            </div>

        </div>

    </section>

</template>

<style scoped>

.hero {
    position: relative;
    overflow: hidden;
    background:
        radial-gradient(
            circle at 85% 20%,
            #065f46 0%,
            transparent 45%
        ),
        #0f172a;

    color: white;
    padding: 110px 0;
}

.hero-container {
    max-width: 1280px;
    margin: auto;
    padding: 0 30px;

    display: grid;
    grid-template-columns: 1.1fr 1fr;
    align-items: center;
    gap: 70px;
}

.badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 9px 15px;
    border-radius: 30px;
    background: #10b98115;
    border: 1px solid #10b98440;
    color: #6ee7b7;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.5px;
}

h1 {
    font-size: clamp(45px, 5vw, 76px);
    line-height: 1.08;
    letter-spacing: -3px;
    font-weight: 800;
    margin: 28px 0;
}

h1 span {
    color: #34d399;
}

.description {
    color: #cbd5e1;
    font-size: 17px;
    line-height: 1.9;
    max-width: 580px;
}

.actions {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 35px;
}

.btn-outline {
    border: 1px solid #64748b;
    color: white;
    background: transparent;
}

.btn-outline:hover {
    background: #ffffff10;
    border-color: #34d399;
}

.status {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #94a3b8;
    font-size: 12px;
    margin-top: 30px;
}

.status-dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: #34d399;
    box-shadow: 0 0 12px #10b981;
}

.dashboard {
    background: #ffffff0d;
    border: 1px solid #ffffff20;
    border-radius: 24px;
    padding: 28px;
    backdrop-filter: blur(15px);
    box-shadow: 0 25px 80px #00000030;
}

.dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
}

.small-label {
    color: #6ee7b7;
    font-size: 10px;
    letter-spacing: 2px;
    font-weight: 700;
}

.dashboard-header h3 {
    font-size: 22px;
    margin-top: 6px;
}

.metrics {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 15px;
}

.metric {
    background: #ffffff08;
    border: 1px solid #ffffff15;
    padding: 20px;
    border-radius: 14px;

    display: flex;
    flex-direction: column;
    gap: 10px;

    transition: 0.3s;
}

.metric:hover {
    transform: translateY(-4px);
    border-color: #10b981;
}

.metric svg {
    color: #34d399;
}

.metric span {
    font-size: 12px;
    color: #94a3b8;
}

.metric strong {
    font-size: 30px;
    font-weight: 800;
}

.chart {
    margin-top: 25px;
    background: #ffffff08;
    padding: 20px;
    border-radius: 14px;
}

.chart h4 {
    margin-bottom: 20px;
    font-size: 14px;
}

.chart-label {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #cbd5e1;
    margin: 12px 0 8px;
}

.bar {
    height: 10px;
    background: #ffffff15;
    border-radius: 20px;
    overflow: hidden;
}

.bar-before {
    height: 100%;
    width: 100%;
    background: #f59e0b;
    border-radius: 20px;
}

.bar-after {
    height: 100%;
    width: 49.5%;
    background: #10b981;
    border-radius: 20px;
}

.dashboard-note {
    margin-top: 18px;
    font-size: 11px;
    color: #94a3b8;
    text-align: center;
}

@media (max-width: 900px) {

    .hero {
        padding: 65px 0;
    }

    .hero-container {
        grid-template-columns: 1fr;
        gap: 45px;
    }

    h1 {
        letter-spacing: -2px;
    }
}

@media (max-width: 480px) {

    .hero-container {
        padding: 0 18px;
    }

    .dashboard {
        padding: 16px;
    }

    .metric {
        padding: 14px;
    }

    .metric strong {
        font-size: 24px;
    }
}

</style>