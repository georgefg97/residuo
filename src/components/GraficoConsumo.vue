<script setup>
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';

import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js';

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
);

const props = defineProps({
    inicial: Number,
    optimo: Number
});

const datos = computed(() => ({
    labels: ['Consumo de referencia', 'Consumo optimizado'],

    datasets: [{
        label: 'Litros de diésel',
        data: [props.inicial, props.optimo],
        backgroundColor: ['#64748b', '#10b981'],
        borderRadius: 10,
        maxBarThickness: 100
    }]
}));

const opciones = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
        y: {
            beginAtZero: true
        }
    }
};
</script>

<template>
    <div class="card grafico">
        <h2>Comparación del consumo</h2>

        <div class="chart">
            <Bar :data="datos" :options="opciones" />
        </div>
    </div>
</template>

<style scoped>
.grafico {
    padding: 28px;
}

.chart {
    height: 320px;
    margin-top: 25px;
}
</style>