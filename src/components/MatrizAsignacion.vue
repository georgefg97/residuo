<script setup>
defineProps({
    matriz: Array,
    camiones: Array,
    zonas: Array
});

const emit = defineEmits(['actualizar']);
</script>

<template>
    <div class="card matriz-card">

        <h2>Matriz de consumo de combustible</h2>

        <p>
            Introduce el consumo estimado de diésel
            para cada posible asignación.
        </p>

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Camiones / Zonas</th>

                        <th v-for="zona in zonas" :key="zona.id">
                            {{ zona.nombre }}
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(camion, i) in camiones"
                        :key="camion.id">

                        <th>{{ camion.nombre }}</th>

                        <td v-for="(zona, j) in zonas"
                            :key="zona.id">

                            <input
                                type="number"
                                min="0"
                                max="1000000"
                                step="1"
                                :value="matriz[i][j]"
                                @input="emit('actualizar', {
                                    fila: i,
                                    columna: j,
                                    valor: $event.target.valueAsNumber
                                })"
                            />

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <small>Unidad de medida: litros de diésel (L).</small>

    </div>
</template>

<style scoped>
.matriz-card {
    padding: 28px;
}

h2 {
    margin-bottom: 8px;
}

p, small {
    color: var(--text-secondary);
}

.table-container {
    overflow-x: auto;
    margin: 24px 0;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    padding: 14px;
    border: 1px solid var(--border);
    text-align: center;
}

thead th {
    background: #0f172a;
    color: white;
    font-size: 13px;
}

tbody th {
    background: #f1f5f9;
    white-space: nowrap;
}

input {
    width: 75px;
    padding: 10px;
    text-align: center;
    border: 1px solid var(--border);
    border-radius: 8px;
    font-size: 15px;
    outline: none;
}

input:focus {
    border-color: var(--primary);
    background: #ecfdf5;
}
</style>