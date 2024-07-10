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


















document.addEventListener("DOMContentLoaded", async () => {
    const listaProductosCarta = document.querySelector(".caja_lista");
    const inputBuscar = document.querySelector(".container__buscador__cuadro");

    try {
        const respuesta = await fetch('https://ms-inventario-api-mi-angel-1.onrender.com/api/categoria', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!respuesta.ok) {
            throw new Error("Error en la solicitud");
        }

        const data = await respuesta.json();
        const categorias = data.body; // Asegúrate de que data.body contiene el array de categorías
        console.log(categorias);

      // Función para renderizar las categorías
        const renderizarCategorias = (categorias) => {
            listaProductosCarta.innerHTML = ""; // Limpiar la lista antes de renderizar

            categorias.forEach(categoria => {
                const itemHTML = `
                    <li class="container__lista__productos__carta" data-id="${categoria.id}">
                        <div class="imagenes">
                            <img src="${categoria.imagen}" alt="imagen categoria">
                        </div>
                        <div class="contenido">
                            <div class="nombre">${categoria.Categoria}</div>
                            <textarea class="descripcion" readonly>${categoria.descripcion_categoria}</textarea>
                        </div>
                        <div class="container__button">
                            <button class="button__verproducto" data-id="${categoria.idCategorias}">Editar Categoria</button>
                        </div>
                    </li>
                `;
                listaProductosCarta.insertAdjacentHTML("beforeend", itemHTML);
            });

          // Agregar evento de clic a los botones "Ver Producto"
            const botonesVerProducto = document.querySelectorAll(".button__verproducto");
            botonesVerProducto.forEach(boton => {
                boton.addEventListener("click", (e) => {
                    const idCategoria = e.target.getAttribute("data-id");
                    console.log(idCategoria);
                    window.location.href = `../HTML/_22_categoriasCambiarInformacion2.html?id=${idCategoria}`;
                });
            });
        };

        renderizarCategorias(categorias); // Renderizar todas las categorías al inicio

      // Evento de input para buscar categorías
        inputBuscar.addEventListener("input", () => {
          const filtro = inputBuscar.value.toLowerCase(); // Convertir el texto a minúsculas para comparación

            const categoriasFiltradas = categorias.filter(categoria =>
                categoria.Categoria.toLowerCase().includes(filtro)
            );

          renderizarCategorias(categoriasFiltradas); // Renderizar categorías filtradas
        });

    } catch (error) {
        console.error("Error al obtener las categorías:", error);
    }
});




































































/**
 * Instancia de la clase Link para redirigir a los botones con la clase 'button__editar'.
 */
new Link("../HTML/_22_categoriasCambiarInformacion2.html", '.button__editar').redireccionar();

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
