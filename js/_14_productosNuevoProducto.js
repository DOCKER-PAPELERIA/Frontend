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























 



document.addEventListener("DOMContentLoaded", () => {
    const formProducto = document.getElementById("miFormulario");
    const nuevaProductoBtn = document.getElementById("nueva-producto-btn");
    const ventanaConfirmacion = document.querySelector(".ventana");
    const btnClose = document.getElementById("btn-close");
    const btnYes = document.getElementById("btn-yes");
    const btnNot = document.getElementById("btn-not");

    nuevaProductoBtn.addEventListener("click", () => {
        ventanaConfirmacion.style.display = "block";
    });

    btnClose.addEventListener("click", () => {
        ventanaConfirmacion.style.display = "none";
    });

    btnNot.addEventListener("click", () => {
        ventanaConfirmacion.style.display = "none";
    });

    btnYes.addEventListener("click", async () => {
        const formData = new FormData(formProducto);
        const payload = {
            nombre_product: formData.get("nombre"),
            idCategorias: formData.get("categoria"),
            imagen: formData.get("url-imagen"),
            idProveedor: formData.get("proveedor"),
            stock: formData.get("unidades"),
            precio: formData.get("precio"),
            codigo_producto: formData.get("codigo"),
            fecha: formData.get("fecha"),
            estado: 'activo' // Asigna el estado deseado, por ejemplo, 'activo'
        };

        try {
            const response = await fetch('https://ms-inventario-api-mi-angel-1.onrender.com/api/producto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (response.ok) {
                alert('Producto creado correctamente.');
                // Aquí podrías redirigir o actualizar la página si lo deseas
            } else {
                alert(`Error al crear producto: ${result.message}`);
            }
        } catch (error) {
            console.error('Error al crear producto:', error);
            alert('Hubo un error al crear el producto. Intenta nuevamente.');
        }

        ventanaConfirmacion.style.display = "none";
    });

    async function cargarCategorias() {
        try {
            const response = await fetch('https://ms-inventario-api-mi-angel-1.onrender.com/api/categoria');
            if (!response.ok) {
                throw new Error('No se pudo obtener la lista de categorías');
            }
            const responseData = await response.json();
            console.log('Datos recibidos del servidor:', responseData);

            if (!Array.isArray(responseData.body)) {
                throw new TypeError('La propiedad body no es un array');
            }

            const categorias = responseData.body;
            const selectCategoria = document.getElementById('categoria');
            selectCategoria.innerHTML = '';

            categorias.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria.idCategorias;
                option.textContent = categoria.Categoria;
                selectCategoria.append(option);
            });
        } catch (error) {
            console.error('Error al obtener la lista de categorías:', error);
        }
    }

    async function cargarProveedores() {
        try {
            const response = await fetch('https://ms-inventario-api-mi-angel-1.onrender.com/api/proveedor');
            if (!response.ok) {
                throw new Error('No se pudo obtener la lista de proveedores');
            }
            const responseData = await response.json();
            console.log('Datos recibidos del servidor (proveedores):', responseData);

            if (!Array.isArray(responseData.body)) {
                throw new TypeError('La propiedad body no es un array');
            }

            const proveedores = responseData.body;
            const selectProveedor = document.getElementById('proveedor');
            selectProveedor.innerHTML = '';

            proveedores.forEach(proveedor => {
                const option = document.createElement('option');
                option.value = proveedor.idProveedor;
                option.textContent = proveedor.nombre_proveedor;
                selectProveedor.appendChild(option);
            });
        } catch (error) {
            console.error('Error al obtener la lista de proveedores:', error);
        }
    }

    cargarCategorias();
    cargarProveedores();
});


































/**
 * Instancia de la clase Link para redirigir a la página de ver productos.
 */
// new Link("../HTML/_15_productosVerProductos.html", "#btn-yes").redireccionar();

/**
 * Instancia de la clase Link para redirigir a la página de productos.
 */
new Link("../HTML/_13_productos.html", "#container__imagenX").redireccionar();

/**
 * Instancia de la clase Link para redirigir a la página de gestión de cuenta.
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
