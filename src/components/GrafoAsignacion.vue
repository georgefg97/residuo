<script setup>
import { computed } from 'vue';

const props = defineProps({
    camiones: Array,
    zonas: Array,
    resultado: Object
});

const altura = computed(() =>
    Math.max(props.camiones.length, props.zonas.length) * 85 + 70
);

function posicionY(i) {
    return 70 + i * 85;
}
</script>

<template>
    <div class="card grafo">

        <h2>Grafo de asignación óptima</h2>

        <p>
            Representación gráfica de los camiones y sus zonas asignadas.
        </p>

        <div class="svg-container">
            <svg :viewBox="`0 0 900 ${altura}`">

                <defs>
                    <marker
                        id="flecha"
                        markerWidth="10"
                        markerHeight="10"
                        refX="9"
                        refY="3"
                        orient="auto">

                        <path d="M0,0 L0,6 L9,3 z"
                              fill="#10b981" />
                    </marker>
                </defs>

                <text x="140" y="25" text-anchor="middle"
                      class="titulo">
                    CAMIONES
                </text>

                <text x="740" y="25" text-anchor="middle"
                      class="titulo">
                    ZONAS
                </text>

                <!-- Aristas óptimas -->

                <g v-for="a in resultado.asignaciones"
                   :key="a.rowIdx">

                    <line
                        x1="230"
                        :y1="posicionY(a.rowIdx)"
                        x2="640"
                        :y2="posicionY(a.colIdx)"
                        stroke="#10b981"
                        stroke-width="3"
                        marker-end="url(#flecha)"
                    />

                    <rect
                        x="405"
                        :y="posicionY(a.rowIdx) - 13"
                        width="60"
                        height="26"
                        rx="8"
                        fill="#ecfdf5"
                    />

                    <text
                        x="435"
                        :y="posicionY(a.rowIdx) + 5"
                        text-anchor="middle"
                        fill="#047857">

                        {{ a.costo }} L

                    </text>

                </g>

                <!-- Nodos de camiones -->

                <g v-for="(camion, i) in camiones"
                   :key="camion.id">

                    <rect
                        x="50"
                        :y="posicionY(i) - 25"
                        width="180"
                        height="50"
                        rx="12"
                        fill="#0f172a"
                    />

                    <text
                        x="140"
                        :y="posicionY(i) + 5"
                        text-anchor="middle"
                        fill="white">

                        {{ camion.nombre }}

                    </text>

                </g>

                <!-- Nodos de zonas -->

                <g v-for="(zona, j) in zonas"
                   :key="zona.id">

                    <rect
                        x="640"
                        :y="posicionY(j) - 25"
                        width="200"
                        height="50"
                        rx="12"
                        fill="#059669"
                    />

                    <text
                        x="740"
                        :y="posicionY(j) + 5"
                        text-anchor="middle"
                        fill="white">

                        {{ zona.nombre }}

                    </text>

                </g>

            </svg>
        </div>

    </div>
</template>

<style scoped>
.grafo {
    padding: 28px;
}

p {
    color: var(--text-secondary);
    margin-top: 10px;
}

.svg-container {
    overflow-x: auto;
    margin-top: 25px;
}

svg {
    width: 100%;
    min-width: 650px;
}

text {
    font-size: 15px;
    font-weight: 600;
}

.titulo {
    fill: #64748b;
    font-weight: 800;
}
</style>