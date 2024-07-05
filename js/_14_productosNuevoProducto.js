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



document.getElementById("miFormulario").addEventListener("submit", async function(event) {

    event.preventDefault();

    /**miFormulario
 * Envía los datos del formulario al controlador para crear un nuevo producto.
 */
btnConfirmarNuevoProducto.addEventListener("click", async function () {
    const nombre = document.getElementById('nombre').value;
    const categoria = document.getElementById('categoria').value;
    const urlImagen = document.getElementById('url-imagen').value;
    const proveedor = document.getElementById('proveedor').value;
    const unidades = document.getElementById('unidades').value;
    const precio = document.getElementById('precio').value;
    const codigo = document.getElementById('codigo').value;
    const fecha = document.getElementById('fecha').value;

    try {
        


        const response = await fetch('http://localhost:3000/api/producto-agotado', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idCategorias: categoria,
                idProveedor: proveedor,
                nombre_product: nombre,
                stock: unidades,
                codigo_producto: codigo,
                imagen: urlImagen,
                precio: precio,
                fecha: fecha,
                estado: 'activo' // Ajustar según sea necesario
            })
        });

        const data = await response.json();
        if (response.ok) {
            alert('Producto creado correctamente.');
            // Aquí puedes redirigir o realizar alguna acción adicional después de crear el producto
        } else {
            alert('Error al crear el producto: ' + data.message);
        }
    } catch (error) {
        console.error('Error al crear el producto:', error);
        alert('Error al crear el producto. Intenta más tarde.');
    } finally {
        ventanaNuevoProducto.style.display = 'none';
    }
});

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
