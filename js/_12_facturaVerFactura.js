
import { ActivarMenuDesplegableYUsuario } from "../soloClases/activarMenuDesplegableYUsuario.js";
import { Link } from "../soloClases/links.js";




const selectorMenu = document.querySelector("#selectorMenu");
const cuerpoMenuDesplegado = document.querySelector("#cuerpoMenuDesplegado");

const activadorUsuario = document.querySelector("#activarUsuario");
const perfilDesactivado = document.querySelector("#perfilDesactivado");


new ActivarMenuDesplegableYUsuario(selectorMenu, cuerpoMenuDesplegado).menu();


new ActivarMenuDesplegableYUsuario(activadorUsuario, perfilDesactivado).usuario();



// ventana para eliminar
const buttoneliminar = document.querySelectorAll(".bx-trash");
const ventana = document.querySelector(".ventana ");
const btnconfirmar = document.getElementById("btn-yes");
const btnCerrar = document.getElementById("btn-close");

// Añade un evento de clic a cada botón de 'Abrir Ventana'
buttoneliminar.forEach(function (button) {
    button.addEventListener("click", function () {
        ventana.style.display = 'block';
    });
});

btnCerrar.addEventListener("click", function () {
    ventana.style.display = 'none';
});

btnconfirmar.addEventListener("click", function () {
    ventana.style.display = 'none';
});


//Ventana para imprimir
const buttonimprimir = document.querySelectorAll(".bxs-printer");
const ventana2 = document.querySelector(".ventana2 ");
const btnconfirmar2 = document.getElementById("btn-yes2");
const btnCerrar2 = document.getElementById("btn-close2");

// Añade un evento de clic a cada botón de 'Abrir Ventana'
buttonimprimir.forEach(function (button) {
    button.addEventListener("click", function () {
        ventana2.style.display = 'block';
    });
});

btnCerrar2.addEventListener("click", function () {
    ventana2.style.display = 'none';
});

btnconfirmar2.addEventListener("click", function () {
    ventana2.style.display = 'none';
});


new Link("../HTML/_7_cambiarInformacionPersonal.html", ".contenedores__boton--gestionarCuenta").redireccionar();

new Link("../HTML/_6_menu.html", ".inicio").redireccionar();

new Link("../HTML/_8_alertas.html", ".alertas").redireccionar();

new Link("../HTML/_10_facturas.html", ".facturas").redireccionar();

new Link("../HTML/_13_productos.html", ".productos").redireccionar();

new Link("../HTML/_17_categorias.html", ".categorias").redireccionar();

new Link("../HTML/_23_comprobarExistencias.html", ".comprobarExistencias").redireccionar();

