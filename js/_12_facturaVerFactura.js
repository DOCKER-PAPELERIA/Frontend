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


// Importación de las clases necesarias desde los módulos locales
import { ActivarMenuDesplegableYUsuario } from "../soloClases/activarMenuDesplegableYUsuario.js";

// Selección de elementos del DOM para el menú desplegable
const selectorMenu = document.querySelector("#selectorMenu");
const cuerpoMenuDesplegado = document.querySelector("#cuerpoMenuDesplegado");

// Selección de elementos del DOM para el perfil del usuario
const activadorUsuario = document.querySelector("#activarUsuario");
const perfilDesactivado = document.querySelector("#perfilDesactivado");

// Creación de una instancia de ActivarMenuDesplegableYUsuario para manejar el menú desplegable
new ActivarMenuDesplegableYUsuario(selectorMenu, cuerpoMenuDesplegado).menu();

// Creación de una instancia de ActivarMenuDesplegableYUsuario para manejar el perfil del usuario
new ActivarMenuDesplegableYUsuario(activadorUsuario, perfilDesactivado).usuario();


// __________________________________________________________________
// Opciones del menú desplegable
// ___________________________________________________________________

// Selección de elementos del DOM para las diferentes opciones del menú desplegable
// const inicio = document.querySelector(".inicio");
// const estadisticas = document.querySelector(".estadisticas");
// const alertas = document.querySelector(".alertas");
// const analisisVentas = document.querySelector(".analisisVentas");
// const compras = document.querySelector(".ventas");
// const facturas = document.querySelector(".facturas");
// const productos = document.querySelector(".productos");
// const categorias = document.querySelector(".categorias");
// const comprobarExistencias = document.querySelector(".comprobarExistencias");

// Creación de una instancia de Link para manejar el redireccionamiento de enlaces
// new Link("../HTML/_1_login.html", ".contenedorOpciones__opciones").redireccionar();

// continuar al acabar todas las vistas
