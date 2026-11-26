<script setup>
import { Recycle, ArrowRight, Truck, Fuel, Calculator } from "lucide-vue-next";
</script>

<template>
  <section class="hero">
    <div class="container hero-content">
      <div class="hero-icon">
        <Recycle :size="45" />
      </div>

      <span class="etiqueta"> OPTIMIZACIÓN INTELIGENTE </span>

      <h1>Residu<span>X</span></h1>

      <h2>Inteligencia que transforma residuos.</h2>

      <p>
        Propuesta tecnológica para evaluar la asignación de camiones
        recolectores de residuos sólidos en la ciudad de El Alto mediante el
        método húngaro de minimización.
      </p>

      <div class="acciones">
        <RouterLink to="/aplicacion" class="btn btn-primary">
          Iniciar simulación
          <ArrowRight :size="20" />
        </RouterLink>

        <RouterLink to="/introduccion" class="btn btn-outline">
          Conocer el proyecto
        </RouterLink>
      </div>
    </div>
  </section>

  <section class="container beneficios">
    <div class="beneficio">
      <Truck :size="32" />

      <h3>Asignación eficiente</h3>

      <p>
        Evaluación de alternativas de distribución de los camiones recolectores.
      </p>
    </div>

    <div class="beneficio">
      <Fuel :size="32" />

      <h3>Ahorro de combustible</h3>

      <p>
        Estimación del posible ahorro de combustible mediante escenarios
        simulados.
      </p>
    </div>

    <div class="beneficio">
      <Calculator :size="32" />

      <h3>Método húngaro</h3>

      <p>Aplicación de algoritmos de optimización matemática.</p>
    </div>
  </section>
</template>

<style scoped>
.hero {
  background: linear-gradient(135deg, #0f172a, #064e3b);
  color: white;
  padding: 90px 0;
  text-align: center;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-icon {
  display: grid;
  place-items: center;
  width: 85px;
  height: 85px;
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 24px;
  color: #6ee7b7;
  margin-bottom: 25px;
}

.etiqueta {
  color: #6ee7b7;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 3px;
}

.hero h1 {
  font-size: clamp(65px, 10vw, 110px);
  font-weight: 800;
  letter-spacing: -5px;
  margin: 10px 0;
}

.hero h1 span {
  color: #10b981;
}

.hero h2 {
  font-size: clamp(20px, 3vw, 30px);
  font-weight: 500;
  margin-bottom: 20px;
}

.hero p {
  max-width: 650px;
  color: #cbd5e1;
  font-size: 17px;
  line-height: 1.8;
}

.acciones {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin-top: 35px;
}

.btn-outline {
  color: white;
  border: 1px solid #64748b;
  background: transparent;
}

.btn-outline:hover {
  background: rgba(255, 255, 255, 0.08);
}

.beneficios {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding-top: 45px;
  padding-bottom: 45px;
}

.beneficio {
  text-align: center;
  padding: 25px;
}

.beneficio svg {
  color: #059669;
  margin-bottom: 15px;
}

.beneficio h3 {
  font-size: 19px;
  margin-bottom: 10px;
}

.beneficio p {
  color: #64748b;
  line-height: 1.7;
  font-size: 15px;
}

@media (max-width: 768px) {
  .hero {
    padding: 60px 0;
  }

  .beneficios {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .hero h1 {
    letter-spacing: -3px;
  }
}
</style>
