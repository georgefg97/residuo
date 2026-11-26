export const INF = Number.MAX_SAFE_INTEGER;

// ==========================================
// ALGORITMO DE ASIGNACIÓN - MÉTODO HÚNGARO
// ==========================================

export function solveAlgorithm(nodes, edges, mode = 'minimize') {

    const sourceIds = [...new Set(edges.map(e => e.sourceId))];
    const targetIds = [...new Set(edges.map(e => e.targetId))];

    const sourceNodes = nodes.filter(n => sourceIds.includes(n.id));
    const targetNodes = nodes.filter(n => targetIds.includes(n.id));

    const N = sourceNodes.length;

    if (N === 0 || N !== targetNodes.length) {
        throw new Error('La matriz debe ser cuadrada.');
    }

    const rowLabels = sourceNodes.map(n => n.label);
    const colLabels = targetNodes.map(n => n.label);

    const rawCostMatrix = Array.from(
        { length: N },
        () => Array(N).fill(null)
    );

    const edgeMatrix = Array.from(
        { length: N },
        () => Array(N).fill(null)
    );

    edges.forEach(edge => {

        const i = sourceNodes.findIndex(
            n => n.id === edge.sourceId
        );

        const j = targetNodes.findIndex(
            n => n.id === edge.targetId
        );

        if (i !== -1 && j !== -1) {
            rawCostMatrix[i][j] = Number(edge.weight);
            edgeMatrix[i][j] = edge;
        }
    });

    if (rawCostMatrix.some(fila =>
        fila.some(valor =>
            !Number.isSafeInteger(valor) ||
            valor < 0 ||
            valor > 1000000
        )
    )) {
        throw new Error('La matriz contiene consumos inválidos.');
    }

    const pasos = [];

    // PASO 1: MATRIZ INICIAL

    pasos.push({
        titulo: '1. Matriz de Trabajo Inicial',
        descripcion: 'Matriz original de consumo de combustible.',
        rowLabels,
        colLabels,
        matrix: rawCostMatrix.map(r => [...r])
    });

    // PASO 2: VECTOR ALFA

    let alpha;
    let workingMatrix;

    if (mode === 'maximize') {

        alpha = Array.from(
            { length: N },
            (_, j) => Math.max(...rawCostMatrix.map(r => r[j]))
        );

        workingMatrix = rawCostMatrix.map(
            row => row.map((val, j) => alpha[j] - val)
        );

    } else {

        alpha = rawCostMatrix.map(
            row => Math.min(...row)
        );

        workingMatrix = rawCostMatrix.map(
            (row, i) => row.map(val => val - alpha[i])
        );
    }

    pasos.push({
        titulo: mode === 'maximize'
            ? '2. Máximos por Columnas (Alpha)'
            : '2. Reducción por Filas (Alpha)',
        descripcion: `Vector Alpha: [${alpha.join(', ')}].`,
        rowLabels,
        colLabels,
        matrix: workingMatrix.map(r => [...r]),
        ...(mode === 'minimize' ? { alpha } : {})
    });

    // PASO 3: VECTOR BETA

    const beta = Array.from(
        { length: N },
        (_, j) => Math.min(...workingMatrix.map(r => r[j]))
    );

    let finalMatrix = workingMatrix.map(
        row => row.map((val, j) => val - beta[j])
    );

    pasos.push({
        titulo: '3. Reducción por Columnas (Beta)',
        descripcion: `Vector Beta: [${beta.join(', ')}].`,
        rowLabels,
        colLabels,
        matrix: finalMatrix.map(r => [...r]),
        beta
    });

    // PASO 4: COBERTURA Y AJUSTE HÚNGARO

    let matchTargetToSource = findZeroMatching(
        finalMatrix, N, N
    );

    let matchedCount = countMatches(matchTargetToSource);
    let iteration = 1;

    while (matchedCount < N) {

        const cover = findMinimumZeroCover(
            finalMatrix, N, N
        );

        const lineCount = countCoveredLines(cover);

        pasos.push({
            titulo: `4.${iteration} Cobertura de Ceros`,
            descripcion: `Líneas: ${lineCount}. Ceros independientes: ${matchedCount}/${N}.`,
            rowLabels,
            colLabels,
            matrix: finalMatrix.map(r => [...r]),
            coveredRows: [...cover.coveredRows],
            coveredCols: [...cover.coveredCols]
        });

        const minUncovered = findMinUncovered(
            finalMatrix,
            cover.coveredRows,
            cover.coveredCols,
            N,
            N
        );

        if (minUncovered === INF || minUncovered <= 0) {
            throw new Error('No se pudo completar el ajuste húngaro.');
        }

        finalMatrix = applyHungarianAdjustment(
            finalMatrix,
            cover.coveredRows,
            cover.coveredCols,
            minUncovered
        );

        pasos.push({
            titulo: `4.${iteration} Ajuste Húngaro (γ = ${minUncovered})`,
            descripcion: `Se resta ${minUncovered} a las celdas descubiertas y se suma a las intersecciones.`,
            rowLabels,
            colLabels,
            matrix: finalMatrix.map(r => [...r]),
            coveredRows: [...cover.coveredRows],
            coveredCols: [...cover.coveredCols]
        });

        matchTargetToSource = findZeroMatching(
            finalMatrix, N, N
        );

        matchedCount = countMatches(matchTargetToSource);

        iteration++;
    }

    // PASO 5: ASIGNACIÓN ÓPTIMA

    const asignaciones = [];
    const optimalEdgeIds = [];

    let totalCost = 0;

    for (let j = 0; j < N; j++) {

        const i = matchTargetToSource[j];

        if (i === -1) {
            throw new Error('Asignación incompleta.');
        }

        const costo = rawCostMatrix[i][j];

        totalCost += costo;

        optimalEdgeIds.push(edgeMatrix[i][j].id);

        asignaciones.push({
            origen: rowLabels[i],
            destino: colLabels[j],
            costo,
            rowIdx: i,
            colIdx: j,
            esFicticio: false
        });
    }

    asignaciones.sort(
        (a, b) => a.rowIdx - b.rowIdx
    );

    pasos.push({
        titulo: '5. Asignación Óptima Final',
        descripcion: `Consumo total óptimo: ${totalCost} litros.`,
        rowLabels,
        colLabels,
        matrix: finalMatrix.map(r => [...r]),
        asignaciones
    });

    return {
        metodo: `Asignación (Método Húngaro - ${mode === 'maximize' ? 'Maximizar' : 'Minimizar'})`,
        costoTotal: totalCost,
        asignaciones,
        optimalEdgeIds,
        pasos,
        INF
    };
}


// ==========================================
// ALGORITMO DE KUHN
// ==========================================

function findZeroMatching(matrix, numRows, numCols) {

    const matchTargetToSource = Array(numCols).fill(-1);

    function dfsKuhn(u, visited) {

        for (let v = 0; v < numCols; v++) {

            if (matrix[u][v] === 0 && !visited[v]) {

                visited[v] = true;

                if (
                    matchTargetToSource[v] < 0 ||
                    dfsKuhn(matchTargetToSource[v], visited)
                ) {

                    matchTargetToSource[v] = u;

                    return true;
                }
            }
        }

        return false;
    }

    for (let u = 0; u < numRows; u++) {

        const visited = Array(numCols).fill(false);

        dfsKuhn(u, visited);
    }

    return matchTargetToSource;
}


function countMatches(matchTargetToSource) {

    return matchTargetToSource.filter(
        s => s !== -1
    ).length;
}


function countCoveredLines(cover) {

    return cover.coveredRows.filter(Boolean).length +
           cover.coveredCols.filter(Boolean).length;
}


// ==========================================
// TEOREMA DE KÖNIG
// ==========================================

function findMinimumZeroCover(matrix, numRows, numCols) {

    const matchTargetToSource = findZeroMatching(
        matrix, numRows, numCols
    );

    const matchedRows = Array(numRows).fill(false);
    const markedRows = Array(numRows).fill(false);
    const markedCols = Array(numCols).fill(false);

    matchTargetToSource.forEach(s => {

        if (s !== -1) {
            matchedRows[s] = true;
        }
    });

    for (let i = 0; i < numRows; i++) {

        if (!matchedRows[i]) {
            markedRows[i] = true;
        }
    }

    let changed = true;

    while (changed) {

        changed = false;

        for (let i = 0; i < numRows; i++) {

            if (!markedRows[i]) continue;

            for (let j = 0; j < numCols; j++) {

                if (matrix[i][j] === 0 && !markedCols[j]) {

                    markedCols[j] = true;
                    changed = true;
                }
            }
        }

        for (let j = 0; j < numCols; j++) {

            const matchedRow = matchTargetToSource[j];

            if (
                markedCols[j] &&
                matchedRow !== -1 &&
                !markedRows[matchedRow]
            ) {

                markedRows[matchedRow] = true;
                changed = true;
            }
        }
    }

    return {
        coveredRows: markedRows.map(m => !m),
        coveredCols: markedCols
    };
}


// ==========================================
// ENCONTRAR VECTOR GAMMA
// ==========================================

function findMinUncovered(
    matrix,
    coveredRows,
    coveredCols,
    numRows,
    numCols
) {

    let min = INF;

    for (let i = 0; i < numRows; i++) {

        if (coveredRows[i]) continue;

        for (let j = 0; j < numCols; j++) {

            if (!coveredCols[j] && matrix[i][j] < min) {

                min = matrix[i][j];
            }
        }
    }

    return min;
}


// ==========================================
// AJUSTE HÚNGARO
// ==========================================

function applyHungarianAdjustment(
    matrix,
    coveredRows,
    coveredCols,
    minUncovered
) {

    return matrix.map((row, i) =>

        row.map((value, j) => {

            if (value === INF) {
                return INF;
            }

            if (!coveredRows[i] && !coveredCols[j]) {
                return value - minUncovered;
            }

            if (coveredRows[i] && coveredCols[j]) {
                return value + minUncovered;
            }

            return value;
        })
    );
}


// ==========================================
// ADAPTADOR PARA RESIDUX
// ==========================================

export function resolverAsignacion(matriz, camiones, zonas) {

    const n = matriz.length;

    if (
        n === 0 ||
        camiones.length !== n ||
        zonas.length !== n ||
        matriz.some(fila => fila.length !== n)
    ) {

        throw new Error(
            'La matriz debe ser cuadrada y completa.'
        );
    }

    if (
        matriz.some(fila =>
            fila.some(valor =>
                !Number.isSafeInteger(valor) ||
                valor < 0 ||
                valor > 1000000
            )
        )
    ) {

        throw new Error(
            'Introduce consumos enteros entre 0 y 1000000.'
        );
    }

    const nodes = [

        ...camiones.map((camion, i) => ({
            id: `camion-${i}`,
            label: camion.nombre
        })),

        ...zonas.map((zona, j) => ({
            id: `zona-${j}`,
            label: zona.nombre
        }))
    ];

    const edges = [];

    matriz.forEach((fila, i) => {

        fila.forEach((valor, j) => {

            edges.push({
                id: `arista-${i}-${j}`,
                sourceId: `camion-${i}`,
                targetId: `zona-${j}`,
                weight: valor
            });
        });
    });

    const resultado = solveAlgorithm(
        nodes,
        edges,
        'minimize'
    );

    if (resultado.asignaciones.length !== n) {

        throw new Error(
            'No se encontró una asignación completa.'
        );
    }

    return resultado;
}