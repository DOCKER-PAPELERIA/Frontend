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


document.addEventListener("DOMContentLoaded", () => {
    const formHistorial = document.getElementById("miFormulario");
    const nuevaHistorialBtn = document.getElementById("boton__nuevohistorial");
    const ventanaConfirmacion = document.getElementById("ventana-confirmacion");
    const btnClose = document.getElementById("btn-close");
    const btnYes = document.getElementById("btn-yes");
    const btnNot = document.getElementById("btn-not");

    nuevaHistorialBtn.addEventListener("click", (event) => {
        event.preventDefault();
        ventanaConfirmacion.style.display = "block";
    });

    btnClose.addEventListener("click", () => {
        ventanaConfirmacion.style.display = "none";
    });

    btnNot.addEventListener("click", () => {
        ventanaConfirmacion.style.display = "none";
    });


    btnYes.addEventListener("click", async () => {
        const formData = new FormData(formHistorial);
        const payload = {
            idUsuario: formData.get("usuario"),
            idProducto: formData.get("nombre"),
            idMetodoPago: formData.get("metodo-pago"),
            cantidad: formData.get("cantidad"),
            fecha: formData.get("fecha")
        };

        try {
            const response = await fetch('http://localhost:3000/api/historial', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': authToken
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



    async function cargarProductos() {
        try {
            const response = await fetch('http://localhost:3000/api/producto');
            if (!response.ok) {
                throw new Error('No se pudo obtener la lista de productos');
            }
            const responseData = await response.json();
            console.log('Datos recibidos del servidor:', responseData);
    
            // No es necesario verificar `body` ya que la respuesta es directamente un array
            if (!Array.isArray(responseData)) {
                throw new TypeError('La respuesta no es un array');
            }
    
            const productos = responseData;
            const selectProducto = document.getElementById('nombre');
            selectProducto.innerHTML = '';
    
            productos.forEach(producto => {
                const option = document.createElement('option');
                option.value = producto.idProducto;
                option.textContent = producto.nombre_product;
                selectProducto.append(option);
            });
        } catch (error) {
            console.error('Error al obtener la lista de productos:', error);
        }
    }


    async function cargarMetodo() {
        try {
            const response = await fetch('http://localhost:3000/api/metopago');
            if (!response.ok) {
                throw new Error('No se pudo obtener la lista de productos');
            }
            const responseData = await response.json();
            console.log('Datos recibidos del servidor:', responseData);
    
            // Verificamos que responseData.body sea un array
            if (!Array.isArray(responseData.body)) {
                throw new TypeError('La propiedad body de la respuesta no es un array');
            }
    
            const metodos = responseData.body;
            const selectMetodos = document.getElementById('metodo-pago');
            selectMetodos.innerHTML = '';
            
            metodos.forEach(metodo => {
                const option = document.createElement('option');
                option.value = metodo.idMetodoPago;
                option.textContent = metodo.tipopago;
                selectMetodos.append(option);
            });
        } catch (error) {
            console.error('Error al obtener la lista de productos:', error);
        }
    }
    
    cargarProductos(); 
    cargarMetodo();   
    

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
new Link("../HTML/_12_historialVerHistorial.html", "#btn-yes").redireccionar();

/**
 * Instancia de la clase Link para redirigir a la página de historial.
 */
new Link("../HTML/_10_historial.html", "#atras").redireccionar();

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
