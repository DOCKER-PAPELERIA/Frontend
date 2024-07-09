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













const authToken = localStorage.getItem("authToken");

document.addEventListener("DOMContentLoaded", () => {
    const guardarCambiosBtn = document.getElementById("guardar-cambios");

    guardarCambiosBtn.addEventListener("click", async () => {
        const idCategoria = new URLSearchParams(window.location.search).get("id"); // Obtener el ID de la categoría desde la URL
        const nombreCategoria = document.getElementById("nombre-categoria").value;
        const descripcionCategoria = document.getElementById("descripcion-categoria").value;
        const urlImagen = document.getElementById("url-imagen").value;
        const fechaCategoria = document.getElementById("fecha-categoria").value;

        const datos = {
            idCategorias: idCategoria,
            Categoria: nombreCategoria,
            descripcion_categoria: descripcionCategoria,
            imagen: urlImagen,
            fecha: fechaCategoria
        };

        
        try {
            const response = await fetch("http://localhost:3000/api/categoria", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": authToken // Incluir el token de autenticación en el header
                },
                body: JSON.stringify(datos)
            });

            const result = await response.json();
            if (result.status === 201 || result.status === 200) {
                alert("La categoría ha sido modificada.");
            } else {
                alert("La categoría no se modificó. Vuelve a intentarlo.");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Ocurrió un error al modificar la categoría.");
        }
    });
});





































/**
 * Maneja el evento de clic en el botón con ID 'atras' para redirigir a 'categorias_cambiarinformacion.html'.
 */
document.getElementById("atras").addEventListener("click", function() {
    window.location.href = "../HTML/_21_categoriasCambiarInformacion.html";
});

/**
 * Botones para abrir la ventana emergente.
 * @type {NodeList}
 */
const buttonGuardar = document.querySelectorAll(".boton__guardarcambios");

/**
 * Ventana emergente.
 * @type {HTMLElement}
 */
const ventana = document.querySelector(".ventana");

/**
 * Botón para cerrar la ventana emergente.
 * @type {HTMLElement}
 */
const btnCerrar = document.getElementById("btn-close");

// Añade un evento de clic a cada botón de 'Abrir Ventana'
buttonGuardar.forEach(function (button) {
    button.addEventListener("click", function () {
        ventana.style.display = 'block';
    });
});

// Evento para cerrar la ventana emergente al hacer clic en el botón de cerrar
btnCerrar.addEventListener("click", function () {
    ventana.style.display = 'none';
});

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

























// const urls = window.location.href; // Obtiene la URL actual
// const nuevaUrl = urls.split('.html')[0]; // Elimina la extensión .html
// window.history.replaceState(null, null, nuevaUrl);
