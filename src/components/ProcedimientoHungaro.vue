<script setup>
import { ref, computed, watch } from 'vue';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';

const props = defineProps({
    pasos: {
        type: Array,
        default: () => []
    }
});

const indice = ref(0);

const paso = computed(() => props.pasos[indice.value]);

watch(() => props.pasos, () => {
    indice.value = 0;
});

function esAsignacion(i, j) {
    return paso.value?.asignaciones?.some(
        a => a.rowIdx === i && a.colIdx === j
    );
}
</script>

<template>
    <div v-if="paso" class="card procedimiento">

        <div class="encabezado">
            <h2>Resolución paso a paso</h2>

            <span>
                Paso {{ indice + 1 }} de {{ pasos.length }}
            </span>
        </div>

        <div class="descripcion">
            <h3>{{ paso.titulo }}</h3>
            <p>{{ paso.descripcion }}</p>
        </div>

        <div class="table-container">
            <table>

                <thead>
                    <tr>
                        <th>Filas / Columnas</th>

                        <th v-for="col in paso.colLabels" :key="col">
                            {{ col }}
                        </th>

                        <th v-if="paso.alpha">Vector α</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(fila, i) in paso.matrix" :key="i">

                        <th>{{ paso.rowLabels[i] }}</th>

                        <td v-for="(valor, j) in fila"
                            :key="j"
                            :class="{
                                cero: valor === 0,
                                seleccionado: esAsignacion(i, j),
                                cubierto: paso.coveredRows?.[i] ||
                                          paso.coveredCols?.[j]
                            }">

                            {{ valor }}

                        </td>

                        <td v-if="paso.alpha" class="alpha">
                            {{ paso.alpha[i] }}
                        </td>
                    </tr>
                </tbody>

                <tfoot v-if="paso.beta">
                    <tr>
                        <th>Vector β</th>

                        <td v-for="(valor, j) in paso.beta"
                            :key="j"
                            class="beta">

                            {{ valor }}

                        </td>
                    </tr>
                </tfoot>

            </table>
        </div>

        <div class="controles">

            <button
                :disabled="indice === 0"
                @click="indice--">

                <ChevronLeft :size="18" />
                Anterior

            </button>

            <button
                :disabled="indice === pasos.length - 1"
                @click="indice++">

                Siguiente
                <ChevronRight :size="18" />

            </button>

        </div>

    </div>
</template>

<style scoped>
.procedimiento {
    padding: 28px;
}

.encabezado {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 15px;
}

.encabezado span {
    background: #d1fae5;
    color: #047857;
    padding: 8px 14px;
    border-radius: 20px;
}

.descripcion {
    background: #f8fafc;
    padding: 20px;
    border-radius: 12px;
    margin: 25px 0;
}

.descripcion p {
    color: var(--text-secondary);
    margin-top: 10px;
}

.table-container {
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
}

td, th {
    padding: 16px;
    border: 1px solid var(--border);
    text-align: center;
}

thead {
    background: #0f172a;
    color: white;
}

.cero {
    color: #059669;
    font-weight: bold;
}

.alpha {
    background: #fef3c7;
    color: #92400e;
    font-weight: bold;
}

.beta {
    background: #dbeafe;
    color: #1d4ed8;
    font-weight: bold;
}

.cubierto {
    background: #fee2e2;
}

.seleccionado {
    background: #10b981;
    color: white;
    font-weight: bold;
}

.controles {
    display: flex;
    justify-content: space-between;
    margin-top: 25px;
}

button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    background: var(--dark);
    color: white;
    cursor: pointer;
}

button:disabled {
    opacity: .4;
    cursor: not-allowed;
}
</style>