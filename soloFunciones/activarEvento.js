export const activarBoton = (activador, ...clases) => {
    let estadoActivo = true;

    activador.addEventListener("click", () => {
        clases.forEach(clase => {
            clase.style.display = estadoActivo ? "none" : "flex";
        });

        estadoActivo = !estadoActivo;
    });
};
