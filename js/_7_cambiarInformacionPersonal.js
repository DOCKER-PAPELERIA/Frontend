/**
 * @fileoverview Script para manejar la activación y cierre de ventanas modales,
 * y la redirección de enlaces en la interfaz de usuario.
 */

import { Link } from "../soloClases/links.js";

/**
 * Se ejecuta cuando el contenido del DOM ha sido cargado.
 * @listens DOMContentLoaded
 */
document.addEventListener("DOMContentLoaded", () => {
    /**
     * Activador del formulario.
     * @type {HTMLElement}
     */
    const form__activador = document.querySelector("#idForm__activador");

    /**
     * Primera ventana activada.
     * @type {HTMLElement}
     */
    const ventanaActivada = document.querySelector("#idVentanaActivada");

    /**
     * Segunda ventana activada.
     * @type {HTMLElement}
     */
    const ventanaActivada2 = document.querySelector("#idVentanaActivada2");

    /**
     * Elemento para cerrar la primera ventana.
     * @type {HTMLElement}
     */
    const cerrarVentana = document.querySelector("#idDivImg");

    /**
     * Elemento para cerrar la segunda ventana.
     * @type {HTMLElement}
     */
    const cerrarVentana2 = document.querySelector("#idVentanaActivada2__img");

    /**
     * Maneja el evento de clic en el activador del formulario para mostrar la primera ventana.
     * @param {Event} event - El evento de clic.
     */
    form__activador.addEventListener("click", (event) => {
        event.preventDefault(); // Para evitar el comportamiento predeterminado del botón
        ventanaActivada.style.display = "flex";
    });

    /**
     * Maneja el evento de clic en el elemento de cierre de la primera ventana.
     */
    cerrarVentana.addEventListener("click", () => {
        ventanaActivada.style.display = "none";
    });

    /**
     * Maneja el evento de clic en el elemento de cierre de la segunda ventana.
     */
    cerrarVentana2.addEventListener("click", () => {
        ventanaActivada2.style.display = "none";
    });
});

/**
 * Instancia de la clase Link para redirigir a la página del menú.
 */
new Link("../HTML/_6_menu.html", ".contenedorFormulario__retroceder").redireccionar();

/**
 * Se ejecuta cuando el contenido del DOM ha sido cargado.
 * @listens DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', function() {
    /**
     * Obtiene y actualiza los datos del usuario.
     * @returns {Promise<void>}
     */
    obtenerYActualizarDatosUsuario()
        .catch(error => {
            console.error('Error al obtener y actualizar datos del usuario:', error);
        });

    /**
     * Botón para cerrar sesión.
     * @type {HTMLElement}
     */
    const botonCerrarSesion = document.getElementById('boton--cerrarSesion');
    if (botonCerrarSesion) {
        botonCerrarSesion.addEventListener('click', cerrarSesion);
    }

    /**
     * Verifica el token y redirige si es necesario.
     */
    verificarTokenYRedirigir();
});
