<script setup>
import { Truck, MapPin, CheckCircle } from 'lucide-vue-next';

defineProps({
    resultado: Object
});
</script>

<template>
    <div class="card resultados">

        <h2>
            <CheckCircle :size="24" />
            Asignaciones óptimas
        </h2>

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Camión</th>
                        <th>Zona asignada</th>
                        <th>Consumo</th>
                        <th>Estado</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="asignacion in resultado.asignaciones"
                        :key="asignacion.rowIdx">

                        <td>
                            <Truck :size="18" />
                            {{ asignacion.origen }}
                        </td>

                        <td>
                            <MapPin :size="18" />
                            {{ asignacion.destino }}
                        </td>

                        <td>{{ asignacion.costo }} L</td>

                        <td>
                            <span class="badge">Asignado</span>
                        </td>
                    </tr>
                </tbody>

                <tfoot>
                    <tr>
                        <td colspan="2">Consumo total óptimo</td>
                        <td colspan="2">
                            {{ resultado.costoTotal }} L
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>

    </div>
</template>

<style scoped>
.resultados {
    padding: 28px;
}

h2 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 25px;
}

h2 svg {
    color: var(--primary);
}

.table-container {
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    padding: 16px;
    text-align: left;
    border-bottom: 1px solid var(--border);
}

thead {
    background: #f1f5f9;
}

td svg {
    vertical-align: middle;
    margin-right: 6px;
    color: var(--primary);
}

.badge {
    background: #d1fae5;
    color: #047857;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
}

tfoot {
    background: #ecfdf5;
    font-weight: bold;
    color: #047857;
}
</style>