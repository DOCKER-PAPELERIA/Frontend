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
    const listaProductos = document.querySelector(".caja__lista");
    const nombreCategoria = document.querySelector(".nombre_categoria");
    const imagenCategoria = document.querySelector(".imagen_categoria img");
    const filtroSelect = document.getElementById("filtro");
    const buscadorInput = document.querySelector(".container_buscador_cuadro");

    const urlParams = new URLSearchParams(window.location.search);
    const idCategoria = urlParams.get('idCategoria');

    const fetchProductos = async (filtro = 'sin filtro', idCategoria = '') => {
        try {
            const respuesta = await fetch(`http://localhost:3000/api/productos/${idCategoria}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ filtro })
            });

            if (!respuesta.ok) {
                throw new Error("Error en la solicitud");
            }

            const data = await respuesta.json();
            const productos = data.body;
            console.log(data);

            listaProductos.innerHTML = ""; // Limpiar la lista antes de renderizar

            productos.forEach(producto => {
                const itemHTML = `
                    <li>
                        <div class="caja">
                            <div class="imagen"><img src="${producto.imagen}" alt="${producto.nombre_producto}"></div>
                            <div class="nombre">${producto.nombre_producto}</div>
                            <div class="codigo">Código: ${producto.codigo}</div>
                            <div class="categoria">Categoría: ${producto.categoria}</div>
                            <div class="unidades">Unidades: ${producto.unidades}</div>
                            <div class="precio">Precio: $${producto.precio}</div>
                        </div>
                    </li>
                `;
                listaProductos.insertAdjacentHTML("beforeend", itemHTML);
            });

            // Actualizar nombre e imagen de la categoría
            nombreCategoria.textContent = data.categoriaNombre;
            imagenCategoria.src = data.categoriaImagen;
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        }
    };

    // Fetch inicial
    fetchProductos('sin filtro', idCategoria);

    // Event listener para el filtro
    filtroSelect.addEventListener("change", () => {
        fetchProductos(filtroSelect.value, idCategoria);
    });

    // Event listener para el buscador
    buscadorInput.addEventListener("input", () => {
        fetchProductos(filtroSelect.value, idCategoria);
    });
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
