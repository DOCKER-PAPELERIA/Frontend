import { ActivarMenuDesplegableYUsuario } from "../soloClases/activarMenuDesplegableYUsuario.js";
import { Link } from "../soloClases/links.js";
import { obtenerYActualizarDatosUsuario } from "../soloFunciones/actualizarInfoMenu.js";
import { cerrarSesion } from "../soloFunciones/cerrarSesion.js";
import { verificarTokenYRedirigir } from "../soloFunciones/verificarLogin.js";



const selectorMenu = document.querySelector("#selectorMenu");
const cuerpoMenuDesplegado = document.querySelector("#cuerpoMenuDesplegado");

const activadorUsuario = document.querySelector("#activarUsuario");
const perfilDesactivado = document.querySelector("#perfilDesactivado");

new ActivarMenuDesplegableYUsuario(selectorMenu, cuerpoMenuDesplegado).menu();


new ActivarMenuDesplegableYUsuario(activadorUsuario, perfilDesactivado).usuario();
// Selecciona todos los botones con la clase .button_editar
// Redirección para el botón de editar
new Link("/HTML/_16_productosCambiarInformacion.html", ".button_editar").redireccionar();

// Ventana eliminar producto
const botonesEliminar = document.querySelectorAll(".button_eliminar");
const ventana = document.querySelector(".ventana");
const noEliminar = document.getElementById("btn-not");
const btnCerrar = document.getElementById("btn-close");

// Añade un evento de clic a cada botón de 'Abrir Ventana'
botonesEliminar.forEach(function (button) {
    button.addEventListener("click", function () {
        ventana.style.display = 'block';
    });
});

btnCerrar.addEventListener("click", function () {
    ventana.style.display = 'none';
});

noEliminar.addEventListener("click", function () {
    ventana.style.display = 'none';
});


new Link("../HTML/_7_cambiarInformacionPersonal.html", ".contenedores__boton--gestionarCuenta").redireccionar();

new Link("../HTML/_6_menu.html", ".inicio").redireccionar();

new Link("../HTML/_8_alertas.html", ".alertas").redireccionar();

new Link("../HTML/_10_facturas.html", ".facturas").redireccionar();

new Link("../HTML/_13_productos.html", ".productos").redireccionar();

new Link("../HTML/_17_categorias.html", ".categorias").redireccionar();

new Link("../HTML/_23_comprobarExistencias.html", ".comprobarExistencias").redireccionar();

document.addEventListener('DOMContentLoaded', function() {
    obtenerYActualizarDatosUsuario()
        .catch(error => {
            console.error('Error al obtener y actualizar datos del usuario:', error);
        });

    const botonCerrarSesion = document.getElementById('boton--cerrarSesion');
    if (botonCerrarSesion) {
        botonCerrarSesion.addEventListener('click', cerrarSesion);
    }

    verificarTokenYRedirigir();


});