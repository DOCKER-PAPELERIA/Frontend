/**
 * Función para alternar la visibilidad de elementos al hacer clic en un activador.
 * @param {HTMLElement} activador El elemento que activa/desactiva las clases.
 * @param {Array<HTMLElement>} ...clases Elementos sobre los cuales alternar la visibilidad.
 */
export const activarBoton = (activador, ...clases) => {
    let estadoActivo = true;

    activador.addEventListener("click", () => {
        clases.forEach(clase => {
            clase.style.display = estadoActivo ? "none" : "flex";
        });

        estadoActivo = !estadoActivo;
    });
};
