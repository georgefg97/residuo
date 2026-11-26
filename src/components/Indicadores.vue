<script setup>
import {
    Fuel,
    TrendingDown,
    Percent,
    Wallet
} from 'lucide-vue-next';

defineProps({
    inicial: Number,
    optimo: Number,
    ahorro: Number,
    porcentaje: Number
});
</script>

<template>
    <div class="indicadores">

        <div class="card indicador">
            <Fuel :size="26" />
            <span>Consumo de referencia</span>
            <h2>{{ inicial }} L</h2>
        </div>

        <div class="card indicador">
            <TrendingDown :size="26" />
            <span>Consumo optimizado</span>
            <h2>{{ optimo }} L</h2>
        </div>

        <div class="card indicador">
            <Wallet :size="26" />
            <span>Combustible ahorrado</span>
            <h2>{{ ahorro }} L</h2>
        </div>

        <div class="card indicador">
            <Percent :size="26" />
            <span>Porcentaje de ahorro</span>
            <h2>{{ porcentaje.toFixed(2) }}%</h2>
        </div>

    </div>
</template>

<style scoped>
.indicadores {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    gap: 20px;
}

.indicador {
    padding: 25px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.indicador svg {
    color: var(--primary);
}

.indicador span {
    color: var(--text-secondary);
    font-size: 14px;
}

.indicador h2 {
    font-size: 32px;
    color: var(--dark);
}
</style>