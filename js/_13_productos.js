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
 * Botón para abrir la ventana emergente de nuevo producto.
 * @type {NodeList}
 */
const buttonNuevoProducto = document.querySelectorAll(".boton__nuevoproducto");

/**
 * Ventana emergente de nuevo producto.
 * @type {HTMLElement}
 */
const ventanaNuevoProducto = document.querySelector(".ventanaNuevoProducto");

/**
 * Botón de confirmar nuevo producto en la ventana emergente.
 * @type {HTMLElement}
 */
const btnConfirmarNuevoProducto = document.getElementById("btn-nuevoproducto-confirmar");

/**
 * Botón para cerrar la ventana emergente de nuevo producto.
 * @type {HTMLElement}
 */
const btnCerrarNuevoProducto = document.getElementById("btn-nuevoproducto-cerrar");

// Añade un evento de clic a cada botón de 'Abrir Ventana'
buttonNuevoProducto.forEach(function (button) {
    button.addEventListener("click", function () {
        ventanaNuevoProducto.style.display = 'block';
    });
});

/**
 * Cierra la ventana emergente de nuevo producto al hacer clic en el botón de cerrar.
 */
btnCerrarNuevoProducto.addEventListener("click", function () {
    ventanaNuevoProducto.style.display = 'none';
});

/**
 * Cierra la ventana emergente de nuevo producto al confirmar la acción.
 */
btnConfirmarNuevoProducto.addEventListener("click", function () {
    ventanaNuevoProducto.style.display = 'none';
});


/**
 * Botón para abrir la ventana emergente de ver producto.
 * @type {NodeList}
 */
const buttonVerProducto = document.querySelectorAll(".boton__verproducto");

/**
 * Ventana emergente de ver producto.
 * @type {HTMLElement}
 */
const ventanaVerProducto = document.querySelector(".ventanaVerProducto");

/**
 * Botón de confirmar ver producto en la ventana emergente.
 * @type {HTMLElement}
 */
const btnConfirmarVerProducto = document.getElementById("btn-verproducto-confirmar");

/**
 * Botón para cerrar la ventana emergente de ver producto.
 * @type {HTMLElement}
 */
const btnCerrarVerProducto = document.getElementById("btn-verproducto-cerrar");

// Añade un evento de clic a cada botón de 'Abrir Ventana'
buttonVerProducto.forEach(function (button) {
    button.addEventListener("click", function () {
        ventanaVerProducto.style.display = 'block';
    });
});

/**
 * Cierra la ventana emergente de ver producto al hacer clic en el botón de cerrar.
 */
btnCerrarVerProducto.addEventListener("click", function () {
    ventanaVerProducto.style.display = 'none';
});

/**
 * Cierra la ventana emergente de ver producto al confirmar la acción.
 */
btnConfirmarVerProducto.addEventListener("click", function () {
    ventanaVerProducto.style.display = 'none';
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
