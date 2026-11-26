<script setup>
import PaginaInformativa from '../components/PaginaInformativa.vue';

import {
    Calculator,
    Network,
    Grid3X3,
    CheckCircle
} from 'lucide-vue-next';

const pasos = [
    {
        numero: '01',
        titulo: 'Construcción de la matriz',
        descripcion: 'Representar los costos de cada posible asignación mediante una matriz cuadrada.'
    },
    {
        numero: '02',
        titulo: 'Vector Alfa (α)',
        descripcion: 'Encontrar el menor valor de cada fila y restarlo a todos los elementos de dicha fila.'
    },
    {
        numero: '03',
        titulo: 'Vector Beta (β)',
        descripcion: 'Encontrar el menor valor de cada columna y restarlo a todos sus elementos.'
    },
    {
        numero: '04',
        titulo: 'Ceros independientes',
        descripcion: 'Utilizar el algoritmo de Kuhn para encontrar ceros que no compartan filas ni columnas.'
    },
    {
        numero: '05',
        titulo: 'Cobertura mínima de ceros',
        descripcion: 'Aplicar el teorema de König cuando todavía no exista una asignación completa.'
    },
    {
        numero: '06',
        titulo: 'Ajuste Gamma (γ)',
        descripcion: 'Restar el menor valor descubierto a las celdas no cubiertas y sumarlo a las intersecciones.'
    },
    {
        numero: '07',
        titulo: 'Asignación óptima',
        descripcion: 'Seleccionar una asignación completa de ceros independientes y calcular el costo utilizando la matriz original.'
    }
];
</script>

<template>

    <PaginaInformativa
        numero="04"
        etiqueta="FUNDAMENTOS MATEMÁTICOS"
        titulo="Marco teórico"
        descripcion="Conceptos y fundamentos del algoritmo de asignación aplicado a la optimización de recursos."
    >

        <article class="info-card">

            <h2>1. Investigación de operaciones</h2>

            <p>
                La investigación de operaciones es una
                disciplina que utiliza modelos matemáticos,
                algoritmos y técnicas de optimización
                para apoyar la toma de decisiones.
            </p>

            <p>
                Su finalidad es encontrar soluciones
                eficientes a problemas que involucran
                recursos limitados y diferentes
                alternativas de decisión.
            </p>

        </article>

        <article class="info-card">

            <h2>2. Algoritmo de asignación</h2>

            <p>
                El problema de asignación consiste en
                distribuir un conjunto de recursos entre
                un conjunto de tareas, de manera que
                se minimice un costo total o se maximice
                un beneficio.
            </p>

            <p>
                En ResiduX, los recursos corresponden
                a los camiones recolectores, las tareas
                corresponden a las zonas de El Alto y
                los costos representan litros de combustible.
            </p>

            <div class="info-grid">

                <div class="info-item">
                    <Calculator :size="30" />
                    <h3>Minimización</h3>
                    <p>
                        Encontrar la asignación que produzca
                        el menor costo total posible.
                    </p>
                </div>

                <div class="info-item">
                    <Calculator :size="30" />
                    <h3>Maximización</h3>
                    <p>
                        Encontrar la asignación que produzca
                        el mayor beneficio posible.
                    </p>
                </div>

            </div>

            <div class="info-highlight">
                ResiduX utiliza exclusivamente la modalidad
                de minimización.
            </div>

        </article>

        <article class="info-card">

            <h2>3. Modelo matemático</h2>

            <p>
                Sea Cij el consumo de combustible del
                camión i al atender la zona j.
            </p>

            <div class="formula">

                Minimizar Z = Σᵢ Σⱼ Cᵢⱼ Xᵢⱼ

            </div>

            <p>Donde:</p>

            <div class="variables">

                <p><strong>Z:</strong> consumo total de combustible.</p>

                <p><strong>Cij:</strong> costo de asignar el camión i a la zona j.</p>

                <p><strong>Xij = 1:</strong> si el camión i es asignado a la zona j.</p>

                <p><strong>Xij = 0:</strong> si no existe dicha asignación.</p>

            </div>

            <h3>Restricciones</h3>

            <div class="formula">
                Σⱼ Xᵢⱼ = 1, para todo camión i
            </div>

            <p>
                Cada camión debe atender una única zona.
            </p>

            <div class="formula">
                Σᵢ Xᵢⱼ = 1, para toda zona j
            </div>

            <p>
                Cada zona debe recibir un único camión.
            </p>

            <div class="formula">
                Xᵢⱼ ∈ {0, 1}
            </div>

        </article>

        <article class="info-card">

            <h2>4. Método húngaro</h2>

            <p>
                El método húngaro es un procedimiento
                matemático que permite resolver problemas
                de asignación mediante transformaciones
                sucesivas de una matriz de costos,
                conservando la solución óptima.
            </p>

            <div class="pasos">

                <div v-for="paso in pasos"
                     :key="paso.numero"
                     class="paso">

                    <span class="paso-numero">
                        {{ paso.numero }}
                    </span>

                    <div>
                        <h3>{{ paso.titulo }}</h3>
                        <p>{{ paso.descripcion }}</p>
                    </div>

                </div>

            </div>

            <div class="info-highlight">
                Los pasos de cobertura y ajuste Gamma
                se repiten cuando sea necesario hasta
                obtener una asignación completa.
            </div>

        </article>

        <article class="info-card">

            <h2>5. Algoritmos complementarios</h2>

            <div class="info-grid">

                <div class="info-item">

                    <Network :size="35" />

                    <h3>Algoritmo de Kuhn</h3>

                    <p>
                        Permite encontrar un emparejamiento
                        máximo en un grafo bipartito.
                        En nuestro sistema se utiliza
                        para seleccionar ceros independientes.
                    </p>

                </div>

                <div class="info-item">

                    <Grid3X3 :size="35" />

                    <h3>Teorema de König</h3>

                    <p>
                        Establece que, en un grafo bipartito,
                        el tamaño del emparejamiento máximo
                        es igual al tamaño de una cobertura
                        mínima de vértices.
                    </p>

                </div>

                <div class="info-item">

                    <CheckCircle :size="35" />

                    <h3>Optimalidad</h3>

                    <p>
                        Una asignación completa de ceros
                        independientes en la matriz
                        transformada permite obtener
                        una solución óptima del problema.
                    </p>

                </div>

            </div>

        </article>

        <article class="info-card">

            <h2>6. Grafos bipartitos</h2>

            <p>
                Un grafo bipartito divide sus vértices
                en dos conjuntos, de manera que las
                aristas conectan vértices pertenecientes
                a conjuntos diferentes.
            </p>

            <div class="grafo-teorico">

                <div class="nodo">Camión 1</div>
                <div class="arista">10 L ─────→</div>
                <div class="nodo zona">Zona 2</div>

                <div class="nodo">Camión 2</div>
                <div class="arista">9 L ─────→</div>
                <div class="nodo zona">Zona 1</div>

                <div class="nodo">Camión 3</div>
                <div class="arista">8 L ─────→</div>
                <div class="nodo zona">Zona 3</div>

            </div>

        </article>

        <RouterLink to="/aplicacion"
                    class="btn btn-primary">

            Probar el algoritmo →

        </RouterLink>

    </PaginaInformativa>

</template>

<style scoped>

.formula {
    background: #0f172a;
    color: #6ee7b7;
    padding: 25px;
    border-radius: 12px;
    text-align: center;
    font-size: clamp(18px, 3vw, 27px);
    font-weight: 600;
    margin: 20px 0;
}

.variables {
    background: #f8fafc;
    padding: 20px;
    border-radius: 12px;
    margin: 20px 0;
}

.pasos {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 30px;
}

.paso {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    background: #f8fafc;
    padding: 24px;
    border-radius: 12px;
}

.paso-numero {
    background: #d1fae5;
    color: #047857;
    min-width: 50px;
    height: 50px;
    display: grid;
    place-items: center;
    border-radius: 12px;
    font-size: 20px;
    font-weight: 800;
}

.paso h3 {
    margin-bottom: 8px;
}

.paso p {
    margin-bottom: 0;
}

.grafo-teorico {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    gap: 20px;
    padding: 25px 0;
}

.nodo {
    background: #0f172a;
    color: white;
    padding: 20px 10px;
    border-radius: 12px;
    text-align: center;
    font-weight: 600;
}

.zona {
    background: #059669;
}

.arista {
    color: #059669;
    font-weight: bold;
    text-align: center;
}

</style>