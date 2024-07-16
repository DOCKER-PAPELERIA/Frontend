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


















const authToken = localStorage.getItem('authToken');

document.addEventListener("DOMContentLoaded", () => {
    const formCategoria = document.getElementById("form-categoria");
    const nuevaCategoriaBtn = document.getElementById("nueva-categoria-btn");
    const ventanaConfirmacion = document.getElementById("ventana-confirmacion");
    const btnClose = document.getElementById("btn-close");
    const btnYes = document.getElementById("btn-yes");
    const btnNot = document.getElementById("btn-not");
    const fechaCategoriaDisplay = document.getElementById("fecha-categoria-display");

    // Obtener la fecha actual y establecerla en el elemento
    const currentDate = new Date().toISOString().split('T')[0];
    fechaCategoriaDisplay.textContent = currentDate;

    nuevaCategoriaBtn.addEventListener("click", (event) => {
        event.preventDefault();
        ventanaConfirmacion.style.display = "block";
    });

    btnClose.addEventListener("click", () => {
        ventanaConfirmacion.style.display = "none";
    });

    btnNot.addEventListener("click", () => {
        ventanaConfirmacion.style.display = "none";
    });

    btnYes.addEventListener("click", async () => {
        const formData = new FormData(formCategoria);
        const payload = {
            Categoria: formData.get("nombre-categoria"),
            descripcion_categoria: formData.get("descripcion-categoria"),
            imagen: formData.get("url-imagen"),
            fecha: currentDate // Usar la fecha actual
        };

        try {
            const response = await fetch('https://ms-inventario-api-mi-angel-1.onrender.com/api/categoria', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': authToken
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message); // La Categoria ha sido Registrada.
            } else {
                alert(result.message); // La Categoria NO se Registro Vuelve a Intentarlo.
            }
        } catch (error) {
            alert("Error al crear la categoría: " + error.message);
        }

        ventanaConfirmacion.style.display = "none";
    });
});















































































/**
 * Instancia de la clase Link para redirigir al botón con ID 'atras'.
 */
new Link("../HTML/_17_categorias.html", '#atras').redireccionar();

/**
 * Ventana emergente.
 * @type {HTMLElement}
 */
const ventana = document.querySelector(".ventana");

/**
 * Botón para no eliminar.
 * @type {HTMLElement}
 */
const noEliminar = document.getElementById("btn-not");

/**
 * Botón para eliminar.
 * @type {HTMLElement}
 */
const siEliminar = document.getElementById("btn-yes");

/**
 * Botón para cerrar la ventana emergente.
 * @type {HTMLElement}
 */
const btnCerrar = document.getElementById("btn-close");

/**
 * Añade un evento de clic a cada botón de 'Abrir Ventana'.
 */
document.querySelectorAll(".boton__nuevacategoria").forEach((button) => {
    button.addEventListener("click", function () {
        ventana.style.display = 'block';
    });
});

/**
 * Cierra la ventana emergente al hacer clic en el botón de cerrar.
 */
btnCerrar.addEventListener("click", function () {
    ventana.style.display = 'none';
});

/**
 * Cierra la ventana emergente al hacer clic en el botón de no eliminar.
 */
noEliminar.addEventListener("click", function () {
    ventana.style.display = 'none';
});

/**
 * Instancia de la clase Link para redirigir al botón con ID 'btn-yes'.
 */
new Link("../HTML/_18_categoriasVisualizarCategorias.html", '#btn-yes').redireccionar();

/**
 * Instancia de la clase Link para redirigir a la página de cambiar información personal.
 */
new Link("../HTML/_7_cambiarInformacionPersonal.html", ".contenedores__boton--gestionarCuenta").redireccionar();

/**
 * Instancia de la clase Link para redirigir a la página del menú.
 */
new Link("../HTML/_6_menu.html", ".inicio").redireccionar();


/**
 * Instancia de la clase Link para redirigir a la página de historial.
 */
new Link("../HTML/_10_historial.html", ".historial").redireccionar();

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


















const urls = window.location.href; // Obtiene la URL actual
const nuevaUrl = urls.split('.html')[0]; // Elimina la extensión .html
window.history.replaceState(null, null, nuevaUrl);
































const urls = window.location.href; // Obtiene la URL actual
const nuevaUrl = urls.split('.html')[0]; // Elimina la extensión .html
window.history.replaceState(null, null, nuevaUrl);
