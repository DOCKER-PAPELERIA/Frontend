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



























// Función para obtener parámetros de la URL
function obtenerParametroUrl(parametro) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parametro);
}

// Variables globales para almacenar los productos originales y filtrados
let productosOriginales = [];

// Función para cargar productos dinámicamente en el HTML
function cargarProductos(productos) {
    const listaProductos = document.querySelector('.caja__lista');

    // Limpiar la lista de productos existentes antes de agregar nuevos
    listaProductos.innerHTML = '';

    productos.forEach(producto => {
        // Crear elementos HTML para cada producto
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="caja">
                <div class="imagen"><img src="${producto.imagen}" alt="${producto.nombre_product}"></div>
                <div class="nombre">${producto.nombre_product}</div>
                <div class="codigo">Código: ${producto.codigo_producto}</div>
                <div class="categoria">Categoría: ${producto.idCategorias}</div>
                <div class="unidades">Unidades: ${producto.stock}</div>
                <div class="precio">Precio: $${producto.precio}</div>
            </div>
        `;
        // Agregar el elemento li a la lista de productos
        listaProductos.appendChild(li);
    });

    document.getElementById("nombreeCategoria").textContent = productos[0].Categoria;
    // Establecer la URL de la imagen de categoría
    const imgCategoria = document.getElementById('img_categoria');
    imgCategoria.src = productos[0].foto;

    // Actualizar productosOriginales con la nueva lista de productos
    productosOriginales = [...productos];
}

// Función para filtrar productos según el filtro y la categoría
async function filtrarProductos(filtro, busqueda = '') {
    const categoria = obtenerParametroUrl('id'); // Obtener el parámetro 'id' de la URL

    // Construir el cuerpo de la solicitud
    const body = {
        filtro: filtro,
        categoria: categoria
    };

    try {
        const response = await fetch('http://localhost:3000/api/productos-por-categoria', {
            method: 'POST', // Cambiado a POST
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error('Error al obtener productos');
        }

        const data = await response.json();
        if (data.error === false && (data.status === 200 || data.status === 201)) {
            console.log("datos recibidos", data.body);
            // Filtrar productos según la búsqueda actual
            const productosFiltrados = filtrarPorBusqueda(data.body, busqueda);
            cargarProductos(productosFiltrados); // Llamar a la función para cargar los productos en el HTML
        } else {
            console.error('Error al obtener productos:', data.body);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}

// Función para filtrar productos por búsqueda
function filtrarPorBusqueda(productos, busqueda) {
    return productos.filter(producto =>
        producto.nombre_product.toLowerCase().includes(busqueda.toLowerCase())
    );
}

// Evento para escuchar cambios en el select de filtro
const selectFiltro = document.getElementById('filtro');
selectFiltro.addEventListener('change', () => {
    const filtroSeleccionado = selectFiltro.value;
    const inputBusqueda = document.querySelector('.container_buscador_cuadro');
    filtrarProductos(filtroSeleccionado, inputBusqueda.value);
});

// Evento para escuchar cambios en el campo de búsqueda
const inputBusqueda = document.querySelector('.container_buscador_cuadro');
inputBusqueda.addEventListener('input', () => {
    const filtroSeleccionado = selectFiltro.value;
    filtrarProductos(filtroSeleccionado, inputBusqueda.value);
});

// Función para inicializar la carga de productos al cargar la página (opcional)
function inicializar() {
    const filtroInicial = 'sin filtro'; // Opción inicial del filtro
    filtrarProductos(filtroInicial); // Llamar a filtrarProductos con filtro inicial
}

// Llamar a la función inicializar cuando se cargue la página
document.addEventListener('DOMContentLoaded', inicializar);













                // <li>
                //     <div class="caja">
                //         <div class="imagen"><img src="${producto.imagen}" alt="${producto.nombre_producto}"></div>
                //         <div class="nombre">${producto.nombre_producto}</div>
                //         <div class="codigo">Código: ${producto.codigo}</div>
                //         <div class="categoria">Categoría: ${producto.categoria}</div>
                //         <div class="unidades">Unidades: ${producto.unidades}</div>
                //         <div class="precio">Precio: $${producto.precio}</div>
                //     </div>
                // </li>

















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
