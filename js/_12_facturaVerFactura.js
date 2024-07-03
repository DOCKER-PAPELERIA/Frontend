/**
 * @fileoverview Script para manejar la activación del menú desplegable, la gestión del usuario,
 * la apertura y cierre de ventanas emergentes, y la redirección de enlaces en la interfaz de usuario.
 */

import { ActivarMenuDesplegableYUsuario } from "../soloClases/activarMenuDesplegableYUsuario.js";
import { Link } from "../soloClases/links.js";
import { obtenerYActualizarDatosUsuario } from "../soloFunciones/actualizarInfoMenu.js";
import { cerrarSesion } from "../soloFunciones/cerrarSesion.js";
import { verificarTokenYRedirigir } from "../soloFunciones/verificarLogin.js";

/**
 * Selector del menú.
 * @type {HTMLElement}
 */
const selectorMenu = document.querySelector("#selectorMenu");

/**
 * Cuerpo del menú desplegado.
 * @type {HTMLElement}
 */
const cuerpoMenuDesplegado = document.querySelector("#cuerpoMenuDesplegado");

/**
 * Activador del usuario.
 * @type {HTMLElement}
 */
const activadorUsuario = document.querySelector("#activarUsuario");

/**
 * Perfil desactivado.
 * @type {HTMLElement}
 */
const perfilDesactivado = document.querySelector("#perfilDesactivado");

/**
 * Instancia de la clase ActivarMenuDesplegableYUsuario para controlar el menú desplegable.
 */
new ActivarMenuDesplegableYUsuario(selectorMenu, cuerpoMenuDesplegado).menu();

/**
 * Instancia de la clase ActivarMenuDesplegableYUsuario para controlar el perfil de usuario.
 */
new ActivarMenuDesplegableYUsuario(activadorUsuario, perfilDesactivado).usuario();

/**
 * Botones para abrir la ventana emergente de eliminación.
 * @type {NodeList}
 */
const buttoneliminar = document.querySelectorAll(".bx-trash");

/**
 * Ventana emergente de eliminación.
 * @type {HTMLElement}
 */
const ventana = document.querySelector(".ventana");

/**
 * Botón de confirmar eliminación en la ventana emergente.
 * @type {HTMLElement}
 */
const btnconfirmar = document.getElementById("btn-yes");

/**
 * Botón para cerrar la ventana emergente de eliminación.
 * @type {HTMLElement}
 */
const btnCerrar = document.getElementById("btn-close");

// Añade un evento de clic a cada botón de 'Abrir Ventana'
buttoneliminar.forEach(function (button) {
    button.addEventListener("click", function () {
        ventana.style.display = 'block';
    });
});

/**
 * Cierra la ventana emergente de eliminación al hacer clic en el botón de cerrar.
 */
btnCerrar.addEventListener("click", function () {
    ventana.style.display = 'none';
});

/**
 * Cierra la ventana emergente de eliminación al confirmar la acción.
 */
btnconfirmar.addEventListener("click", function () {
    ventana.style.display = 'none';
});


/**
 * Botones para abrir la ventana emergente de impresión.
 * @type {NodeList}
 */
const buttonimprimir = document.querySelectorAll(".bxs-printer");

/**
 * Ventana emergente de impresión.
 * @type {HTMLElement}
 */
const ventana2 = document.querySelector(".ventana2");

/**
 * Botón de confirmar impresión en la ventana emergente.
 * @type {HTMLElement}
 */
const btnconfirmar2 = document.getElementById("btn-yes2");

/**
 * Botón para cerrar la ventana emergente de impresión.
 * @type {HTMLElement}
 */
const btnCerrar2 = document.getElementById("btn-close2");

// Añade un evento de clic a cada botón de 'Abrir Ventana'
buttonimprimir.forEach(function (button) {
    button.addEventListener("click", function () {
        ventana2.style.display = 'block';
    });
});

/**
 * Cierra la ventana emergente de impresión al hacer clic en el botón de cerrar.
 */
btnCerrar2.addEventListener("click", function () {
    ventana2.style.display = 'none';
});

/**
 * Cierra la ventana emergente de impresión al confirmar la acción.
 */
btnconfirmar2.addEventListener("click", function () {
    ventana2.style.display = 'none';
});


/**
 * Instancia de la clase Link para redirigir a la página de gestión de cuenta.
 */
new Link("../HTML/_7_cambiarInformacionPersonal.html", ".contenedores__boton--gestionarCuenta").redireccionar();

/**
 * Instancia de la clase Link para redirigir a la página del menú.
 */
new Link("../HTML/_6_menu.html", ".inicio").redireccionar();

/**
 * Instancia de la clase Link para redirigir a la página de alertas.
 */
new Link("../HTML/_8_alertas.html", ".alertas").redireccionar();

/**
 * Instancia de la clase Link para redirigir a la página de facturas.
 */
new Link("../HTML/_10_facturas.html", ".facturas").redireccionar();

/**
 * Instancia de la clase Link para redirigir a la página de productos.
 */
new Link("../HTML/_13_productos.html", ".productos").redireccionar();

/**
 * Instancia de la clase Link para redirigir a la página de categorías.
 */
new Link("../HTML/_17_categorias.html", ".categorias").redireccionar();

/**
 * Instancia de la clase Link para redirigir a la página de comprobación de existencias.
 */
new Link("../HTML/_23_comprobarExistencias.html", ".comprobarExistencias").redireccionar();

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
