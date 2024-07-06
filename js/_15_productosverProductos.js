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
const url = "https://ms-inventario-api-mi-angel-1.onrender.com/api/producto";
let productos = []; // Array para almacenar los productos

// Función para obtener y mostrar los productos
async function mostrarProductos() {
    try {
        const response = await fetch(url, { method: 'GET' });
        if (!response.ok) {
            throw new Error('No se pudo obtener la lista de productos');
        }
        const data = await response.json();
        console.log('Datos recibidos del servidor:', data); // Verifica la respuesta del servidor

        // Verifica que la respuesta sea un array
        if (!Array.isArray(data)) {
            throw new TypeError('La respuesta no es un array');
        }

        productos = data; // Almacena los productos en el array
        mostrarProductosFiltrados(productos); // Muestra todos los productos inicialmente

    } catch (error) {
        console.error('Error al obtener la lista de productos:', error);
    }
}

// Función para mostrar los productos filtrados
function mostrarProductosFiltrados(productosFiltrados) {
    const listaProductos = document.querySelector('.caja__lista');
    listaProductos.innerHTML = ''; // Limpia la lista antes de agregar nuevos productos

    productosFiltrados.forEach(producto => {
        const productoHTML = `
            <li>
                <div class="caja">
                    <div class="imagen"><img class="img" src="${producto.imagen}" alt="no hay imagen para mostrar"></div>
                    <div class="nombre">${producto.nombre_product}</div>
                    <div class="codigo">Código: ${producto.codigo_producto}</div>
                    <div class="categoria">Categoría: ${producto.Categoria}</div>
                    <div class="unidades">Unidades: ${producto.stock}</div>
                    <div class="precio">Precio: $${producto.precio}</div>
                    <div class="container__button">
                        <button class="button_editar" data-id="${producto.idProducto}">Editar</button>
                        <button class="button_eliminar" data-id="${producto.idProducto}">Eliminar</button>
                    </div>
                </div>
            </li>
        `;
        listaProductos.insertAdjacentHTML('beforeend', productoHTML);
    });

    // Añadir event listeners a los botones de editar y eliminar
    document.querySelectorAll('.button_editar').forEach(button => {
        button.addEventListener('click', redireccionarEditar);
    });

    document.querySelectorAll('.button_eliminar').forEach(button => {
        button.addEventListener('click', confirmarEliminacion);
    });
}

// Función para redirigir a la página de edición
function redireccionarEditar(event) {
    const idProducto = event.target.dataset.id;
    window.location.href = `/HTML/_16_productosCambiarInformacion.html?id=${idProducto}`;
}

// Función para confirmar la eliminación de un producto
function confirmarEliminacion(event) {
    const idProducto = event.target.dataset.id;
    const ventanaEliminarProducto = document.getElementById('ventanaEliminarProducto');
    ventanaEliminarProducto.style.display = 'block';

    // Manejar la confirmación de la eliminación
    const btnSiEliminar = document.getElementById('btn-yes');
    btnSiEliminar.onclick = () => eliminarProducto(idProducto);

    const btnNoEliminar = document.getElementById('btn-not');
    btnNoEliminar.onclick = () => {
        ventanaEliminarProducto.style.display = 'none'; // Oculta la ventana emergente
    };
}

const url2 = "https://ms-inventario-api-mi-angel-1.onrender.com/api/producto";
// Función para eliminar un producto
async function eliminarProducto(id) {
    try {
        const response = await fetch(`${url2}/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": authToken
            }
        });
        if (!response.ok) {
            throw new Error('No se pudo eliminar el producto');
        }
        // Recargar la lista de productos después de eliminar
        mostrarProductos();
        ventanaEliminarProducto.style.display = 'none';
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
    }
}

// Función para filtrar los productos
function filtrarProductos(event) {
    const terminoBusqueda = event.target.value.toLowerCase();
    const productosFiltrados = productos.filter(producto => 
        String(producto.nombre_product).toLowerCase().includes(terminoBusqueda) ||
        String(producto.codigo_producto).toLowerCase().includes(terminoBusqueda) ||
        String(producto.Categoria).toLowerCase().includes(terminoBusqueda)
    );
    mostrarProductosFiltrados(productosFiltrados);
}

// Inicializa la carga de productos al cargar la página
document.addEventListener('DOMContentLoaded', mostrarProductos);

// Añadir event listener al campo de búsqueda
document.getElementById('buscador').addEventListener('input', filtrarProductos);








































/**
 * Instancia de la clase Link para redirigir a la página de cambiar información personal.
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
