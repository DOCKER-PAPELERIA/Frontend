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
 * Instancia de la clase Link para redirigir a la página de ver productos.
 */
new Link("../HTML/_15_productosVerProductos.html", "#container__imagenX").redireccionar();

/**
 * Botones para abrir la ventana emergente de guardar cambios.
 * @type {NodeList}
 */
const botonesGuardar = document.querySelectorAll(".boton__guardarcambios");

/**
 * Ventana emergente de guardar cambios.
 * @type {HTMLElement}
 */
const ventanaGuardarCambios = document.querySelector(".ventana");

/**
 * Botón para cerrar la ventana emergente de guardar cambios.
 * @type {HTMLElement}
 */
const btnCerrarVentanaGuardar = document.getElementById("btn-close");

// Añade un evento de clic a cada botón de 'Abrir Ventana'
botonesGuardar.forEach(function (button) {
    button.addEventListener("click", function () {
        ventanaGuardarCambios.style.display = 'block';
    });
});

/**
 * Cierra la ventana emergente de guardar cambios al hacer clic en el botón de cerrar.
 */
btnCerrarVentanaGuardar.addEventListener("click", function () {
    ventanaGuardarCambios.style.display = 'none';
});

// Obtener el token de autenticación
const authToken = localStorage.getItem("authToken");

// Función para guardar los cambios
async function guardarCambios() {
    const idProducto = new URLSearchParams(window.location.search).get('id');
    const nombre_product = document.getElementById('nombre').value;
    const idCategorias = document.getElementById('categoria').value;
    const imagen = document.getElementById('url-imagen').value;
    const idProveedor = document.getElementById('proveedor').value;
    const stock = document.getElementById('unidades').value;
    const precio = document.getElementById('precio').value;
    const codigo_producto = document.getElementById('codigo').value;
    const fecha = document.getElementById('fecha').value;
    const estado = "activo"; // o el valor que corresponda

    const producto = {
        idCategorias,
        idProveedor,
        nombre_product,
        stock,
        codigo_producto,
        imagen,
        precio,
        fecha,
        estado
    };

    try {
        const response = await fetch(`https://ms-inventario-api-mi-angel-1.onrender.com/api/producto/${idProducto}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": authToken
            },
            body: JSON.stringify(producto)
        });

        if (!response.ok) {
            throw new Error('No se pudo modificar el producto');
        }

        const data = await response.json();
        console.log('Respuesta del servidor:', data);

        // Mostrar la ventana emergente si la modificación fue exitosa
        ventanaGuardarCambios.style.display = 'block';

    } catch (error) {
        console.error('Error al modificar el producto:', error);
    }
}

// Añade un evento de clic al botón de 'Guardar Cambios'
document.querySelector('.boton__guardarcambios').addEventListener('click', guardarCambios);

// Función para cargar categorías
async function cargarCategorias() {
    try {
        const response = await fetch('https://ms-inventario-api-mi-angel-1.onrender.com/api/categoria');
        if (!response.ok) {
            throw new Error('No se pudo obtener la lista de categorías');
        }
        const responseData = await response.json();
        console.log('Datos recibidos del servidor:', responseData); // Verifica la respuesta del servidor

        // Verifica que la propiedad 'body' sea un array
        if (!Array.isArray(responseData.body)) {
            throw new TypeError('La propiedad body no es un array');
        }

        const categorias = responseData.body; // Obtén el array de categorías

        // Procesa cada categoría recibida
        const selectCategoria = document.getElementById('categoria');
        selectCategoria.innerHTML = ''; // Limpia el select antes de agregar nuevas opciones

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


// Función para cargar proveedores
async function cargarProveedores() {
    try {
        const response = await fetch('https://ms-inventario-api-mi-angel-1.onrender.com/api/proveedor');
        if (!response.ok) {
            throw new Error('No se pudo obtener la lista de proveedores');
        }
        const responseData = await response.json();
        console.log('Datos recibidos del servidor (proveedores):', responseData); // Verifica la respuesta del servidor

        // Verifica que la propiedad 'body' sea un array
        if (!Array.isArray(responseData.body)) {
            throw new TypeError('La propiedad body no es un array');
        }

        const proveedores = responseData.body; // Obtén el array de proveedores

        // Procesa cada proveedor recibido
        const selectProveedor = document.getElementById('proveedor');
        selectProveedor.innerHTML = ''; // Limpia el select antes de agregar nuevas opciones

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


// Inicializa la carga de proveedores al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarProveedores();
    cargarCategorias();
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
