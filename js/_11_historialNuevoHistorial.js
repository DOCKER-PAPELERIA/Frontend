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
const nombreQuemado = document.getElementById("nombreQuemado"); // Definir nombreQuemado aquí para acceso global

// Declarar la variable en el ámbito superior
let nombreUsuario;

async function obtenerDatosUsuarioYUsarlos() {
    try {
        const datosUsuario = await obtenerYActualizarDatosUsuario();
        console.log('Datos del usuario:', datosUsuario.nombres);

        // Asignar el valor a la variable global
        nombreUsuario = datosUsuario.nombres;

        nombreQuemado.value = datosUsuario.nombres; // Usar .value para establecer el valor en un input
        nombreQuemado.disabled = true; // Para hacer el campo ineditable
    } catch (error) {
        console.error('Error al obtener y usar los datos del usuario:', error);
    }
}

// Llamar a la función para obtener y usar los datos del usuario
obtenerDatosUsuarioYUsarlos();

// Ahora puedes usar nombreUsuario en cualquier parte del código después de que se haya asignado


// Espera a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener("DOMContentLoaded", () => {
    // Obtiene referencias a los elementos del formulario y los botones por su ID
    const formHistorial = document.getElementById("miFormulario");
    const nuevaHistorialBtn = document.getElementById("boton__nuevohistorial");
    const ventanaConfirmacion = document.getElementById("ventana-confirmacion");
    const btnClose = document.getElementById("btn-close");
    const btnYes = document.getElementById("btn-yes");
    const btnNot = document.getElementById("btn-not");

    // Agrega un event listener al botón para mostrar la ventana de confirmación cuando se hace clic
    nuevaHistorialBtn.addEventListener("click", (event) => {
        event.preventDefault(); // Previene el comportamiento por defecto del botón
        ventanaConfirmacion.style.display = "block"; // Muestra la ventana de confirmación
    });

    // Agrega event listeners a los botones para cerrar la ventana de confirmación
    btnClose.addEventListener("click", () => {
        ventanaConfirmacion.style.display = "none"; // Oculta la ventana de confirmación
    });

    btnNot.addEventListener("click", () => {
        ventanaConfirmacion.style.display = "none"; // Oculta la ventana de confirmación
    });

    // Agrega un event listener al botón de confirmación
    btnYes.addEventListener("click", async () => {
        // Crea un objeto FormData con los datos del formulario
        const formData = new FormData(formHistorial);
        const payload = {
            nombres: nombreUsuario, // Obtiene el valor del campo "usuario"
            nombreProducto: formData.get("nombre"), // Obtiene el valor del campo "nombre"
            tipopago: formData.get("metodo-pago"), // Obtiene el valor del campo "metodo-pago"
            cantidad: parseInt(formData.get("cantidad")), // Obtiene el valor del campo "cantidad"
            fecha: formData.get("fecha") // Obtiene el valor del campo "fecha"
        };

        console.log(payload); // Imprime el payload en la consola
        console.log('Payload a enviar:', JSON.stringify(payload, null, 2)); // Imprime el payload formateado en la consola

        try {
            // Realiza una solicitud POST al servidor con los datos del formulario
            const response = await fetch("https://ms-inventario-api-mi-angel-1.onrender.com/api/historial", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload) // Convierte el payload a JSON y lo envía en el cuerpo de la solicitud
            });

            const result = await response.json(); // Espera la respuesta del servidor y la convierte a JSON

            if (response.ok) {
                alert('Venta creado correctamente.'); // Muestra una alerta si la respuesta es exitosa
                // Aquí podrías redirigir o actualizar la página si lo deseas
            } else {
                alert(`Error al crear la venta: ${result.message}`); // Muestra una alerta si hay un error en la respuesta
            }
        } catch (error) {
            console.error('Error al crear la venta:', error); // Imprime el error en la consola
            alert('Hubo un error al crear la venta. Intenta nuevamente.'); // Muestra una alerta si ocurre un error
        }

        ventanaConfirmacion.style.display = "none"; // Oculta la ventana de confirmación
    });

    // Función para cargar la lista de productos desde el servidor
    async function cargarProductos() {
        try {
            const response = await fetch('https://ms-inventario-api-mi-angel-1.onrender.com/api/producto'); // Realiza una solicitud GET al servidor
            if (!response.ok) {
                throw new Error('No se pudo obtener la lista de productos'); // Lanza un error si la respuesta no es exitosa
            }
            const responseData = await response.json(); // Convierte la respuesta a JSON
            console.log('Datos recibidos del servidor:', responseData); // Imprime los datos recibidos en la consola

            // Verifica que la respuesta sea un array
            if (!Array.isArray(responseData)) {
                throw new TypeError('La respuesta no es un array');
            }

            const productos = responseData; // Asigna los datos recibidos a la variable productos
            const selectProducto = document.getElementById('nombre'); // Obtiene el elemento select para los productos
            selectProducto.innerHTML = ''; // Limpia las opciones existentes

            // Itera sobre los productos y crea una opción para cada uno
            productos.forEach(producto => {
                const option = document.createElement('option');
                option.value = producto.nombre_product; // Asigna el ID del producto como valor de la opción
                option.textContent = producto.nombre_product; // Asigna el nombre del producto como texto de la opción
                selectProducto.append(option); // Agrega la opción al select
            });
        } catch (error) {
            console.error('Error al obtener la lista de productos:', error); // Imprime el error en la consola
        }
    }

    // Función para cargar la lista de métodos de pago desde el servidor 
    
    // Llama a las funciones para cargar los productos y los métodos de pago al cargar la página
    cargarProductos();   
});























/**
 * Botones para abrir la ventana emergente de nuevo historial.
 * @type {NodeList}
 */
const buttonnueva = document.querySelectorAll(".boton__nuevohistorial");

/**
 * Ventana emergente de nuevo historial.
 * @type {HTMLElement}
 */
const ventana = document.querySelector(".ventana");

/**
 * Botón para no eliminar en la ventana emergente.
 * @type {HTMLElement}
 */
const noEliminar = document.getElementById("btn-not");

/**
 * Botón para cerrar la ventana emergente.
 * @type {HTMLElement}
 */
const btnCerrar = document.getElementById("btn-close");

// Añade un evento de clic a cada botón de 'Abrir Ventana'
buttonnueva.forEach(function (button) {
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
 * Instancia de la clase Link para redirigir a la página de ver historial.
 */
// new Link("../HTML/_12_historialVerHistorial.html", "#btn-yes").redireccionar();

/**
 * Instancia de la clase Link para redirigir a la página de historial.
 */

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



















// const urls = window.location.href; // Obtiene la URL actual
// const nuevaUrl = urls.split('.html')[0]; // Elimina la extensión .html
// window.history.replaceState(null, null, nuevaUrl);
