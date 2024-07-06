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
 * Botones para abrir la ventana emergente de nuevo producto.
 * @type {NodeList}
 */
const buttonNuevoProducto = document.querySelectorAll(".boton__nuevoproducto");

/**
 * Ventana emergente de nuevo producto.
 * @type {HTMLElement}
 */
const ventanaNuevoProducto = document.querySelector(".ventana");

/**
 * Botón de confirmar en la ventana emergente de nuevo producto.
 * @type {HTMLElement}
 */
const btnConfirmarNuevoProducto = document.getElementById("btn-yes");

/**
 * Botón para cancelar en la ventana emergente de nuevo producto.
 * @type {HTMLElement}
 */
const btnCancelarNuevoProducto = document.getElementById("btn-not");

/**
 * Botón para cerrar la ventana emergente de nuevo producto.
 * @type {HTMLElement}
 */
const btnCerrarNuevoProducto = document.getElementById("btn-close");

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
 * Cierra la ventana emergente de nuevo producto al hacer clic en el botón de cancelar.
 */
btnCancelarNuevoProducto.addEventListener("click", function () {
    ventanaNuevoProducto.style.display = 'none';
});





document.getElementById('miformulario').addEventListener('submit', async function (event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const idCategorias = document.getElementById('categoria').value;
    const imagen = document.getElementById('url-imagen').value;
    const idProveedor = document.getElementById('proveedor').value;
    const stock = document.getElementById('unidades').value;
    const precio = document.getElementById('precio').value;
    const codigo = document.getElementById('codigo').value;
    const fecha = document.getElementById('fecha').value;

    const producto = {
        idCategorias,
        idProveedor,
        nombre_product: nombre,
        stock,
        codigo_producto: codigo,
        imagen,
        precio,
        fecha,
        estado: 'activo' // Asigna el estado deseado, por ejemplo, 'activo'
    };

    try {
        const response = await fetch('https://ms-inventario-api-mi-angel-1.onrender.com/api/producto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });

        const responseData = await response.json();

        if (response.ok) {
            alert('Producto creado correctamente.');
            // Aquí podrías redirigir o actualizar la página si lo deseas
        } else {
            alert(`Error al crear producto: ${responseData.message}`);
        }
    } catch (error) {
        console.error('Error al crear producto:', error);
        alert('Hubo un error al crear el producto. Intenta nuevamente.');
    }
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



document.addEventListener('DOMContentLoaded', function () {
    cargarCategorias();
    cargarProveedores();
});
































/**
 * Instancia de la clase Link para redirigir a la página de ver productos.
 */
new Link("../HTML/_15_productosVerProductos.html", "#btn-yes").redireccionar();

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
