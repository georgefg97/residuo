<script setup>
import PaginaInformativa from "../components/PaginaInformativa.vue";

import {
  Target,
  Database,
  Calculator,
  ChartNoAxesCombined,
  Monitor,
  Fuel,
} from "lucide-vue-next";
</script>

<template>
  <PaginaInformativa
    numero="03"
    etiqueta="PROPÓSITO DEL PROYECTO"
    titulo="Objetivos"
    descripcion="Aplicar herramientas matemáticas y tecnológicas para optimizar la distribución de los camiones recolectores."
  >
    <article class="objetivo-general">
      <Target :size="50" />

      <span>OBJETIVO GENERAL</span>

      <h2>
        Desarrollar un prototipo web que permita evaluar alternativas de
        asignación de camiones recolectores de residuos sólidos a las diferentes
        zonas de la ciudad de El Alto, mediante el método húngaro de
        minimización, considerando el consumo de combustible en escenarios
        simulados.
      </h2>
    </article>

    <h2 class="section-title">Objetivos específicos</h2>

    <div class="info-grid">
      <div class="info-item">
        <Database :size="35" />
        <h3>01. Modelar el problema</h3>
        <p>
          Representar los consumos estimados de combustible mediante una matriz
          de costos.
        </p>
      </div>

      <div class="info-item">
        <Calculator :size="35" />
        <h3>02. Implementar el algoritmo</h3>
        <p>
          Aplicar el método húngaro de minimización para determinar las
          asignaciones óptimas.
        </p>
      </div>

      <div class="info-item">
        <Monitor :size="35" />
        <h3>03. Desarrollar el simulador</h3>
        <p>
          Construir una aplicación web interactiva que permita introducir datos
          y visualizar la resolución matemática.
        </p>
      </div>

      <div class="info-item">
        <ChartNoAxesCombined :size="35" />
        <h3>04. Comparar resultados</h3>
        <p>
          Comparar el consumo de referencia con el consumo obtenido mediante la
          optimización.
        </p>
      </div>

      <div class="info-item">
        <Fuel :size="35" />
        <h3>05. Evaluar el ahorro</h3>
        <p>
          Estimar el posible ahorro de combustible, el porcentaje de reducción y
          el beneficio económico en escenarios simulados.
        </p>
      </div>
    </div>

    <RouterLink to="/marco-teorico" class="btn btn-primary">
      Explorar el marco teórico →
    </RouterLink>
  </PaginaInformativa>
</template>

<style scoped>
.objetivo-general {
  background: linear-gradient(135deg, #064e3b, #0f172a);
  color: white;
  padding: 45px;
  border-radius: 20px;
  margin-bottom: 45px;
}

.objetivo-general svg {
  color: #6ee7b7;
  margin-bottom: 20px;
}

.objetivo-general span {
  display: block;
  color: #6ee7b7;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 2px;
  margin-bottom: 20px;
}

.objetivo-general h2 {
  font-size: clamp(20px, 3vw, 30px);
  line-height: 1.7;
  font-weight: 500;
}
</style>
