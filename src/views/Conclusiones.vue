<script setup>
import PaginaInformativa from '../components/PaginaInformativa.vue';

import {
    Fuel,
    TrendingDown,
    CheckCircle,
    Leaf,
    Calculator,
    Target
} from 'lucide-vue-next';
</script>

<template>

    <PaginaInformativa
        numero="06"
        etiqueta="RESULTADOS DEL PROYECTO"
        titulo="Conclusiones"
        descripcion="Evaluación de los resultados obtenidos mediante la aplicación del algoritmo de asignación."
    >

        <div class="resumen">

            <div class="resultado-card">
                <Fuel :size="35" />
                <span>Consumo de referencia</span>
                <h2>101 L</h2>
            </div>

            <div class="resultado-card">
                <Target :size="35" />
                <span>Consumo óptimo</span>
                <h2>50 L</h2>
            </div>

            <div class="resultado-card">
                <TrendingDown :size="35" />
                <span>Ahorro simulado de combustible</span>
                <h2>51 L</h2>
            </div>

            <div class="resultado-card">
                <Leaf :size="35" />
                <span>Reducción estimada</span>
                <h2>50,50%</h2>
            </div>

        </div>

        <p class="nota">
            Resultados correspondientes al escenario
            simulado de cinco camiones y cinco zonas.
        </p>

        <article class="info-card">

            <h2>Conclusión general</h2>

            <p>
                Mediante el desarrollo de ResiduX se
                demostró que el algoritmo de asignación,
                utilizando el método húngaro de minimización,
                permite determinar una distribución óptima
                de camiones recolectores entre diferentes
                zonas de la ciudad de El Alto.
            </p>

            <p>
                En el escenario simulado, el consumo
                de combustible se redujo de 101 litros
                a 50 litros, obteniendo un ahorro de
                51 litros, equivalente al 50,50 %
                respecto a la asignación de referencia.
            </p>

            <p>
                Los resultados demuestran la utilidad
                de los algoritmos de optimización como
                herramientas de apoyo a la toma de
                decisiones y a la administración
                eficiente de recursos.
            </p>

        </article>

        <h2 class="section-title">
            Beneficios potenciales
        </h2>

        <div class="info-grid">

            <div class="info-item">
                <Fuel :size="35" />
                <h3>Beneficio económico</h3>
                <p>
                    Reducción potencial de los gastos
                    asociados al consumo de combustible.
                </p>
            </div>

            <div class="info-item">
                <CheckCircle :size="35" />
                <h3>Beneficio operativo</h3>
                <p>
                    Distribución eficiente de los
                    vehículos recolectores disponibles.
                </p>
            </div>

            <div class="info-item">
                <Leaf :size="35" />
                <h3>Beneficio ambiental</h3>
                <p>
                    Posible reducción de las emisiones
                    asociadas al consumo de diésel.
                </p>
            </div>

            <div class="info-item">
                <Calculator :size="35" />
                <h3>Beneficio académico</h3>
                <p>
                    Aplicación práctica de los conocimientos
                    adquiridos en Análisis de Algoritmos.
                </p>
            </div>

        </div>

        <article class="info-card">

            <h2>Limitaciones del proyecto</h2>

            <p>
                Los resultados obtenidos corresponden
                a datos simulados y no representan
                mediciones oficiales de consumo de
                combustible del municipio de El Alto.
            </p>

            <p>
                El modelo considera una asignación
                individual entre camiones y zonas,
                sin calcular recorridos por calles,
                capacidad de carga ni tiempos de servicio.
            </p>

        </article>

        <article class="info-card">

            <h2>Recomendaciones y trabajos futuros</h2>

            <p>
                Incorporar información real sobre
                rendimiento de los vehículos,
                distancias, cantidad de residuos,
                capacidad de carga y consumo de combustible.
            </p>

            <p>
                Ampliar el sistema mediante herramientas
                de geolocalización, bases de datos y
                algoritmos de optimización de rutas.
            </p>

        </article>

        <div class="info-highlight">

            <strong>ResiduX:</strong>

            Una propuesta tecnológica que demuestra
            cómo la matemática y la informática pueden
            contribuir a resolver problemas de la sociedad.

        </div>

        <RouterLink to="/aplicacion"
                    class="btn btn-primary">

            Volver al simulador →

        </RouterLink>

    </PaginaInformativa>

</template>

<style scoped>

.resumen {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
}

.resultado-card {
    background: white;
    border: 1px solid var(--border);
    padding: 28px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.resultado-card svg {
    color: #10b981;
}

.resultado-card span {
    color: #64748b;
    font-size: 14px;
}

.resultado-card h2 {
    font-size: 38px;
    color: #059669;
}

.nota {
    color: #64748b;
    font-size: 13px;
    margin: 15px 0 30px;
}

</style>