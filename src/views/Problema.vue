<script setup>
import PaginaInformativa from "../components/PaginaInformativa.vue";

import { Trash2, Fuel, Truck, AlertTriangle } from "lucide-vue-next";
</script>

<template>
  <PaginaInformativa
    numero="02"
    etiqueta="IDENTIFICACIÓN DEL PROBLEMA"
    titulo="Definición del problema"
    descripcion="La necesidad de optimizar los recursos destinados a la recolección de residuos sólidos en El Alto."
  >
    <article class="info-card">
      <h2>Situación problemática</h2>

      <p>
        La recolección de residuos sólidos requiere una adecuada planificación y
        distribución de los vehículos recolectores para atender las diferentes
        zonas de la ciudad de El Alto.
      </p>

      <p>
        En escenarios de escasez de combustible, una asignación inadecuada de
        los camiones puede incrementar los costos operativos y dificultar la
        continuidad del servicio.
      </p>

      <p>
        La problemática consiste en determinar qué camión debe atender cada
        zona, considerando que cada posible asignación presenta un consumo
        diferente de combustible.
      </p>
    </article>

    <h2 class="section-title">Principales dificultades</h2>

    <div class="info-grid">
      <div class="info-item">
        <Trash2 :size="35" />
        <h3>Acumulación de residuos</h3>
        <p>
          Las interrupciones del servicio pueden generar acumulación de basura y
          afectar las condiciones sanitarias.
        </p>
      </div>

      <div class="info-item">
        <Fuel :size="35" />
        <h3>Disponibilidad de combustible</h3>
        <p>
          La disponibilidad limitada de diésel exige una administración
          eficiente de los recursos.
        </p>
      </div>

      <div class="info-item">
        <Truck :size="35" />
        <h3>Distribución de vehículos</h3>
        <p>
          Una asignación inadecuada puede aumentar el consumo total de
          combustible.
        </p>
      </div>

      <div class="info-item">
        <AlertTriangle :size="35" />
        <h3>Costos operativos</h3>
        <p>
          El consumo innecesario de combustible incrementa los gastos asociados
          a la recolección.
        </p>
      </div>
    </div>

    <article class="info-card">
      <h2>Formulación del problema</h2>

      <div class="info-highlight">
        ¿Cómo podría contribuir el algoritmo de asignación a la optimización de
        la distribución de camiones recolectores de residuos sólidos en El Alto,
        considerando la minimización del consumo de combustible?
      </div>
    </article>

    <article class="info-card">
      <h2>Delimitación del problema</h2>

      <p>
        El proyecto considera una cantidad igual de camiones y zonas, donde cada
        camión debe atender una única zona y cada zona debe recibir un único
        camión.
      </p>

      <p>
        Los consumos de combustible son representados mediante una matriz de
        costos con datos simulados para fines académicos.
      </p>
    </article>

    <RouterLink to="/objetivo" class="btn btn-primary">
      Conocer los objetivos →
    </RouterLink>
  </PaginaInformativa>
</template>
