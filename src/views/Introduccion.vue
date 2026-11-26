<script setup>
import PaginaInformativa from "../components/PaginaInformativa.vue";

import { Truck, Fuel, Leaf, Calculator } from "lucide-vue-next";
</script>

<template>
  <PaginaInformativa
    numero="01"
    etiqueta="CONTEXTO DEL PROYECTO"
    titulo="Introducción"
    descripcion="Aplicación de algoritmos de optimización para mejorar la gestión de residuos sólidos en la ciudad de El Alto."
  >
    <article class="info-card">
      <h2>Contexto general</h2>

      <p>
        La recolección de residuos sólidos constituye uno de los servicios
        fundamentales para el funcionamiento de una ciudad. Su correcta
        ejecución contribuye a la salud pública, la protección del medio
        ambiente y la calidad de vida de la población.
      </p>

      <p>
        En la ciudad de El Alto, la distribución de camiones recolectores
        representa un desafío operativo debido a la extensión territorial, las
        características de sus diferentes zonas y la necesidad de administrar
        eficientemente los recursos disponibles.
      </p>

      <p>
        Ante escenarios de disponibilidad limitada de combustible, resulta
        importante desarrollar alternativas tecnológicas que permitan optimizar
        la asignación de vehículos y reducir los costos operativos.
      </p>
    </article>

    <article class="info-card">
      <h2>¿Qué es ResiduX?</h2>

      <p>
        ResiduX es un prototipo web de carácter académico que propone la
        aplicación del algoritmo de asignación para evaluar alternativas de
        distribución de camiones recolectores en la ciudad de El Alto.
      </p>

      <p>
        El sistema utiliza datos simulados de consumo de combustible para
        analizar posibles escenarios de optimización y apoyar el estudio de
        alternativas de asignación.
      </p>
    </article>

    <div class="info-grid">
      <div class="info-item">
        <Truck :size="35" />
        <h3>Distribución eficiente</h3>
        <p>Asignación óptima de los vehículos recolectores disponibles.</p>
      </div>

      <div class="info-item">
        <Fuel :size="35" />
        <h3>Ahorro de combustible</h3>
        <p>Minimización del consumo total de diésel.</p>
      </div>

      <div class="info-item">
        <Leaf :size="35" />
        <h3>Sostenibilidad</h3>
        <p>
          Uso responsable de los recursos y potencial reducción del impacto
          ambiental.
        </p>
      </div>

      <div class="info-item">
        <Calculator :size="35" />
        <h3>Optimización matemática</h3>
        <p>Aplicación práctica del algoritmo de asignación.</p>
      </div>
    </div>

    <div class="info-highlight">
      <strong>Propósito del proyecto:</strong>

      Demostrar cómo los algoritmos de optimización pueden contribuir a la
      solución de problemas operativos mediante herramientas tecnológicas.
    </div>

    <RouterLink to="/problema" class="btn btn-primary">
      Conocer la problemática →
    </RouterLink>
  </PaginaInformativa>
</template>
