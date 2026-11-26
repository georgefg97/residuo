<script setup>
import { ref, computed } from "vue";

import { Calculator, Shuffle, RotateCcw, Truck } from "lucide-vue-next";

import { camiones } from "../data/camiones";
import { zonas } from "../data/zonas";

import { resolverAsignacion } from "../algorithms/hungaro";

import MatrizAsignacion from "../components/MatrizAsignacion.vue";
import Indicadores from "../components/Indicadores.vue";
import ResultadosAsignacion from "../components/ResultadosAsignacion.vue";
import ProcedimientoHungaro from "../components/ProcedimientoHungaro.vue";
import GraficoConsumo from "../components/GraficoConsumo.vue";
import GrafoAsignacion from "../components/GrafoAsignacion.vue";

const cantidad = ref(5);

const zonasSeleccionadas = ref(zonas.slice(0, 5).map((zona) => zona.id));

const matrizInicial = [
  [22, 10, 24, 20, 18],
  [9, 25, 15, 22, 16],
  [20, 15, 23, 8, 17],
  [18, 22, 11, 19, 23],
  [17, 20, 16, 24, 12],
];

const matriz = ref(matrizInicial.map((fila) => [...fila]));

const resultado = ref(null);
const error = ref("");
const precioDiesel = ref(0);

const camionesActivos = computed(() => camiones.slice(0, cantidad.value));

const zonasActivas = computed(() =>
  zonasSeleccionadas.value.map((id) => zonas.find((zona) => zona.id === id)),
);

const consumoInicial = computed(() =>
  matriz.value.reduce((total, fila, i) => total + fila[i], 0),
);

const ahorro = computed(() =>
  resultado.value ? consumoInicial.value - resultado.value.costoTotal : 0,
);

const porcentaje = computed(() =>
  consumoInicial.value > 0 ? (ahorro.value / consumoInicial.value) * 100 : 0,
);

const ahorroEconomico = computed(() => ahorro.value * precioDiesel.value);

function invalidarResultado() {
  resultado.value = null;
  error.value = "";
}

function generarMatriz() {
  matriz.value = Array.from({ length: cantidad.value }, () =>
    Array.from(
      { length: cantidad.value },
      () => Math.floor(Math.random() * 23) + 8,
    ),
  );

  invalidarResultado();
}

function cambiarCantidad() {
  zonasSeleccionadas.value = zonas
    .slice(0, cantidad.value)
    .map((zona) => zona.id);

  generarMatriz();
}

function cambiarZona(indice, id) {
  if (zonasSeleccionadas.value.some((zona, i) => zona === id && i !== indice)) {
    return;
  }

  zonasSeleccionadas.value[indice] = id;

  invalidarResultado();
}

function actualizarMatriz({ fila, columna, valor }) {
  matriz.value[fila][columna] = valor;

  invalidarResultado();
}

function optimizar() {
  try {
    error.value = "";

    if (
      matriz.value.some((fila) =>
        fila.some(
          (valor) => !Number.isInteger(valor) || valor < 0 || valor > 1000000,
        ),
      )
    ) {
      throw new Error("Introduce consumos enteros entre 0 y 1000000.");
    }

    resultado.value = resolverAsignacion(
      matriz.value,
      camionesActivos.value,
      zonasActivas.value,
    );
  } catch (e) {
    resultado.value = null;
    error.value = e.message;
  }
}

function reiniciar() {
  cantidad.value = 5;

  zonasSeleccionadas.value = zonas.slice(0, 5).map((zona) => zona.id);

  matriz.value = matrizInicial.map((fila) => [...fila]);

  invalidarResultado();
}
</script>

<template>
  <section class="simulador-header">
    <div class="container">
      <span class="etiqueta">
        <Truck :size="18" />
        OPTIMIZACIÓN DE RECURSOS
      </span>

      <h1>Simulador de asignación</h1>

      <p>
        Simula escenarios de asignación de camiones recolectores mediante el
        método húngaro de minimización.
      </p>
    </div>
  </section>

  <section class="container contenido">
    <!-- Configuración -->

    <div class="card configuracion">
      <h2>Configuración de la simulación</h2>

      <div class="config-grid">
        <div class="campo">
          <label>Cantidad de camiones y zonas</label>

          <select v-model.number="cantidad" @change="cambiarCantidad">
            <option v-for="n in 8" :key="n" :value="n + 2">
              {{ n + 2 }} camiones
            </option>
          </select>
        </div>

        <div class="campo">
          <label>Precio del diésel (Bs/L)</label>

          <input
            v-model.number="precioDiesel"
            type="number"
            min="0"
            step="0.01"
          />
        </div>
      </div>

      <h3>Seleccionar zonas de El Alto</h3>

      <div class="zonas-grid">
        <div class="campo" v-for="(id, i) in zonasSeleccionadas" :key="i">
          <label>Zona {{ i + 1 }}</label>

          <select :value="id" @change="cambiarZona(i, $event.target.value)">
            <option
              v-for="zona in zonas"
              :key="zona.id"
              :value="zona.id"
              :disabled="zonasSeleccionadas.includes(zona.id) && zona.id !== id"
            >
              {{ zona.nombre }}
            </option>
          </select>
        </div>
      </div>

      <div class="acciones">
        <button class="btn btn-secondary" @click="generarMatriz">
          <Shuffle :size="18" />
          Generar datos
        </button>

        <button class="btn btn-secondary" @click="reiniciar">
          <RotateCcw :size="18" />
          Reiniciar
        </button>
      </div>
    </div>

    <!-- Matriz -->

    <MatrizAsignacion
      :matriz="matriz"
      :camiones="camionesActivos"
      :zonas="zonasActivas"
      @actualizar="actualizarMatriz"
    />

    <!-- Ejecutar algoritmo -->

    <div class="ejecutar">
      <button class="btn btn-primary" @click="optimizar">
        <Calculator :size="22" />
        Ejecutar algoritmo de asignación
      </button>
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <!-- Resultados -->

    <template v-if="resultado">
      <h2 class="section-title">Resultados de la optimización</h2>

      <Indicadores
        :inicial="consumoInicial"
        :optimo="resultado.costoTotal"
        :ahorro="ahorro"
        :porcentaje="porcentaje"
      />

      <div class="card ahorro-economico">
        <span>Ahorro económico estimado</span>

        <h2>Bs {{ Number(ahorroEconomico).toFixed(2) }}</h2>
      </div>

      <ResultadosAsignacion :resultado="resultado" />

      <GrafoAsignacion
        :camiones="camionesActivos"
        :zonas="zonasActivas"
        :resultado="resultado"
      />

      <ProcedimientoHungaro :pasos="resultado.pasos" />

      <GraficoConsumo
        :inicial="consumoInicial"
        :optimo="resultado.costoTotal"
      />
    </template>
  </section>
</template>

<style scoped>
.simulador-header {
  background: linear-gradient(120deg, #0f172a, #064e3b);
  color: white;
  padding: 65px 0;
}

.simulador-header h1 {
  font-size: clamp(30px, 5vw, 48px);
  margin: 18px 0;
}

.simulador-header p {
  color: #cbd5e1;
}

.etiqueta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #6ee7b7;
  font-size: 13px;
  font-weight: 700;
}

.contenido {
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding-top: 40px;
  padding-bottom: 70px;
}

.configuracion {
  padding: 28px;
}

.config-grid,
.zonas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 25px 0;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-size: 14px;
  font-weight: 600;
}

select,
input {
  padding: 13px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: white;
  font-size: 14px;
  width: 100%;
}

.acciones {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.btn {
  border: none;
  cursor: pointer;
  font-weight: 600;
}

.btn-secondary {
  background: #f1f5f9;
  color: #0f172a;
}

.ejecutar {
  display: flex;
  justify-content: center;
}

.ahorro-economico {
  padding: 28px;
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  color: #047857;
}

.ahorro-economico h2 {
  font-size: 36px;
  margin-top: 10px;
}

.error {
  padding: 16px;
  background: #fee2e2;
  color: #b91c1c;
  border-radius: 8px;
}
</style>
