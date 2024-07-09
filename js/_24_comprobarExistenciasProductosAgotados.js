/**
 * @fileoverview Script para manejar la activación del menú desplegable, la gestión del usuario,
 * la redirección de enlaces y las funciones relacionadas con la sesión de usuario.
 */

import { ActivarMenuDesplegableYUsuario } from "../soloClases/activarMenuDesplegableYUsuario.js";
import { Link } from "../soloClases/links.js";
import { obtenerYActualizarDatosUsuario } from "../soloFunciones/actualizarInfoMenu.js";
import { cerrarSesion } from "../soloFunciones/cerrarSesion.js";
import { verificarTokenYRedirigir } from "../soloFunciones/verificarLogin.js";

/**
 * Selector del menú desplegable.
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






document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('http://localhost:3000/api/producto-agotadoWeb');
        if (!response.ok) {
            throw new Error('No se pudo obtener la lista de productos agotados');
        }
        const datosRespuesta = await response.json();
        const datosBody = datosRespuesta.body;
        console.log(datosBody);

        const containerLista = document.querySelector('.caja__lista');

        if (datosBody === "No hay productos agotados.") {
            alert('No hay productos agotados.');
        } else {
            datosBody.forEach(element => {
                const item = document.createElement('li');
                item.innerHTML = `
                    <div class="caja">
                        <div class="imagen"><img src="${element.imagen}" class="imagen__imagen" alt="producto agotado"></div>
                        <div class="nombre">${element.nombre_product}</div>
                        <div class="categoria">Categoría: ${element.Categoria}</div>
                        <div class="proveedor">Proveedor: ${element.nombre_proveedor}</div>
                        <div class="unidades">Unidades: ${element.stock}</div>
                        <div class="precio">Precio: $${element.precio}</div>
                        <div class="container__button">
                            <button class="button__existencia" id="visualizarBtn3">Producto agotado</button>
                        </div>
                    </div>
                `;
                containerLista.appendChild(item);
            });
        }

        const botonEnviar = document.querySelector('.botonEnviar');
        botonEnviar.addEventListener('click', async () => {
            try {
                const response = await fetch('http://localhost:3000/api/enviar-correo-productos-agotados', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ productosAgotados: datosBody })
                });
                if (!response.ok) {
                    throw new Error('Error al enviar el correo.');
                }
                const resultado = await response.json();
                alert(`datos enviados correctamente`);
            } catch (e) {
                console.error(`Error: ${e}`);
                alert('Hubo un error al enviar el correo.');
            }
        });

    } catch (e) {
        console.error(`El error: ${e}`);
    }
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























// const urls = window.location.href; // Obtiene la URL actual
// const nuevaUrl = urls.split('.html')[0]; // Elimina la extensión .html
// window.history.replaceState(null, null, nuevaUrl);
