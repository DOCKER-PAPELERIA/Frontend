const botones = document.querySelectorAll('.button__verproducto');

// Itera sobre cada botón
botones.forEach((boton) => {
  // Agrega un evento de clic a cada botón
  boton.addEventListener('click', () => {
    window.location.href = "categorias_visualizarproductos.html";
  });
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
