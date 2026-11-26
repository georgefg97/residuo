export const camiones = Array.from(
    { length: 10 },
    (_, index) => ({
        id: `C${index + 1}`,
        nombre: `Camión ${index + 1}`,
        codigo: `REC-${String(index + 1).padStart(3, '0')}`
    })
);