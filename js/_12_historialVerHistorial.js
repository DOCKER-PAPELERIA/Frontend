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
    const listaProductosCarta = document.getElementById("contenido_factura");
    const buscador = document.getElementById("buscador");
    const ventanaModal = document.getElementById("ventanaModal");
    const btnClose = document.getElementById("btn-close");
    const btnYes = document.getElementById("btn-yes");
    const contrasenaInput = document.getElementById("contrasena");
    let facturaData = [];
    let facturaSeleccionada = null;

    // Función para renderizar las facturas
    const renderizarFactura = (facturas) => {
        listaProductosCarta.innerHTML = ""; // Limpiar la lista antes de renderizar

        facturas.forEach(factura => {
            // Convertir la fecha a un formato legible
            const fecha = new Date(factura.Fecha);
            const fechaFormateada = fecha.toLocaleDateString();

            const itemHTML = `
                <tr>
                    <th scope="row">${factura.ID}</th>
                    <td class="nombre_producto">${factura.Nombre_Producto}</td>
                    <td class="nombre_usuario">${factura.Usuario}</td>
                    <td class="cantidad">${factura.Cantidad_llevar}</td>
                    <td class="precio_producto">${factura.Precio}</td>
                    <td class="fecha">${fechaFormateada}</td>
                    <td class="tipo_pago">${factura.Pago}</td>
                    <td class="valor_pagar">${factura.Total_pagar}</td>
                    <td scope="btn">
                        <button class="act-icon red btn-trash-open" data-id="${factura.ID}">
                            <i class='bx bx-trash' title="Eliminar Factura"></i>
                        </button>
                    </td>
                </tr>
            `;
            listaProductosCarta.insertAdjacentHTML("beforeend", itemHTML);
        });

        // Agregar event listener a los botones de eliminar
        document.querySelectorAll(".btn-trash-open").forEach(button => {
            button.addEventListener("click", (e) => {
                facturaSeleccionada = e.currentTarget.getAttribute("data-id");
                ventanaModal.style.display = 'block';
            });
        });
    };

    try {
        const respuesta = await fetch('http://localhost:3000/api/historial', {
            method: "GET"
        });

        if (!respuesta.ok) {
            throw new Error("Error en la solicitud");
        }

        const data = await respuesta.json();
        facturaData = data.body;
        console.log(facturaData);

        renderizarFactura(facturaData);

    } catch (error) {
        console.error("Error al obtener las categorías:", error);
    }

    // Agregar evento input al buscador
    buscador.addEventListener("input", () => {
        const textoBusqueda = buscador.value.toLowerCase();
        const facturasFiltradas = facturaData.filter(factura => {
            return factura.Nombre_Producto.toLowerCase().includes(textoBusqueda) ||
                factura.Usuario.toLowerCase().includes(textoBusqueda) ||
                factura.Pago.toLowerCase().includes(textoBusqueda);
        });
        renderizarFactura(facturasFiltradas);
    });

    // Cerrar la ventana modal
    btnClose.addEventListener("click", () => {
        ventanaModal.style.display = 'none';
    });

    // Confirmar eliminación
    btnYes.addEventListener("click", async () => {
        const contrasena = contrasenaInput.value;
        const correo = localStorage.getItem("correo"); // Asume que el correo está almacenado en localStorage

        try {
            const respuesta = await fetch(`http://localhost:3000/api/historial/${facturaSeleccionada}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem("token") // Asume que el token está almacenado en localStorage
                },
                body: JSON.stringify({
                    correo: correo,
                    contrasena: contrasena
                })
            });

            const data = await respuesta.json();

            if (respuesta.ok) {
                alert("Historial eliminado exitosamente.");
                // Volver a cargar las facturas
                const nuevaRespuesta = await fetch('http://localhost:3000/api/historial', {
                    method: "GET"
                });

                if (!nuevaRespuesta.ok) {
                    throw new Error("Error en la solicitud");
                }

                const nuevoData = await nuevaRespuesta.json();
                facturaData = nuevoData.body;
                renderizarFactura(facturaData);
            } else {
                alert(data.message || "Error al eliminar el historial.");
            }
        } catch (error) {
            console.error("Error al eliminar el historial:", error);
            alert("Error en el servidor, por favor intente nuevamente.");
        }

        ventanaModal.style.display = 'none';
    });
});
























/**
 * Botones para abrir la ventana emergente de eliminación.
 * @type {NodeList}
 */
const buttoneliminar = document.querySelectorAll(".bx-trash");

/**
 * Ventana emergente de eliminación.
 * @type {HTMLElement}
 */
const ventana = document.querySelector(".ventana");

/**
 * Botón de confirmar eliminación en la ventana emergente.
 * @type {HTMLElement}
 */
const btnconfirmar = document.getElementById("btn-yes");

/**
 * Botón para cerrar la ventana emergente de eliminación.
 * @type {HTMLElement}
 */
const btnCerrar = document.getElementById("btn-close");


/**
 * Cierra la ventana emergente de eliminación al hacer clic en el botón de cerrar.
 */
btnCerrar.addEventListener("click", function () {
    ventana.style.display = 'none';
});

/**
 * Cierra la ventana emergente de eliminación al confirmar la acción.
 */
btnconfirmar.addEventListener("click", function () {
    ventana.style.display = 'none';
});


/**
 * Botones para abrir la ventana emergente de impresión.
 * @type {NodeList}
 */
const buttonimprimir = document.querySelectorAll(".bxs-printer");

/**
 * Ventana emergente de impresión.
 * @type {HTMLElement}
 */
const ventana2 = document.querySelector(".ventana2");



// Añade un evento de clic a cada botón de 'Abrir Ventana'
buttonimprimir.forEach(function (button) {
    button.addEventListener("click", function () {
        ventana2.style.display = 'block';
    });
});

/**
 * Cierra la ventana emergente de impresión al hacer clic en el botón de cerrar.
 */


/**
 * Cierra la ventana emergente de impresión al confirmar la acción.
 */
btnconfirmar2.addEventListener("click", function () {
    ventana2.style.display = 'none';
});


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







// const urls = window.location.href; // Obtiene la URL actual
// const nuevaUrl = urls.split('.html')[0]; // Elimina la extensión .html
// window.history.replaceState(null, null, nuevaUrl);
