// Selecciona todos los botones con la clase .btn
const botones = document.querySelectorAll('.button__editar');
a
// Itera sobre cada botón
botones.forEach((boton) => {
  // Agrega un evento de clic a cada botón
  boton.addEventListener('click', () => {
    window.location.href = "productos_cambiarinformacion.html";
  });
});


//ventana eliminar producto
const buttonEliminar = document.querySelectorAll(".button__eliminar");
const ventana = document.querySelector(".ventana ");
const noEliminar = document.getElementById("btn-not");
const btnCerrar = document.getElementById("btn-close");

// Añade un evento de clic a cada botón de 'Abrir Ventana'
buttonEliminar.forEach(function (button) {
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



// Importación de las clases necesarias desde los módulos locales
import { ActivarMenuDesplegableYUsuario } from "../_1_caro/soloClases/activarMenuDesplegableYUsuario.js";

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
