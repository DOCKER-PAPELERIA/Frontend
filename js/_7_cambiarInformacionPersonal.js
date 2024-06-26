import { Link } from "../soloClases/links.js";

document.addEventListener("DOMContentLoaded", () => {
    const form__activador = document.querySelector("#idForm__activador");
    const ventanaActivada = document.querySelector("#idVentanaActivada");
    const ventanaActivada2 = document.querySelector("#idVentanaActivada2");
    const cerrarVentana = document.querySelector("#idDivImg");
    const cerrarVentana2 = document.querySelector("#idVentanaActivada2__img");

    form__activador.addEventListener("click", (event) => {
        event.preventDefault(); // Para evitar el comportamiento predeterminado del botón
        ventanaActivada.style.display = "flex"; 
    }); 

    cerrarVentana.addEventListener("click", () => {
        ventanaActivada.style.display = "none";
    }); 

    cerrarVentana2.addEventListener("click", () => {
        ventanaActivada2.style.display = "none";
    });
});

new Link("../HTML/_6_menu.html", ".contenedorFormulario__retroceder").redireccionar();
