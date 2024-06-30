import { ActivarMenuDesplegableYUsuario } from "../soloClases/activarMenuDesplegableYUsuario.js";
import { Link } from "../soloClases/links.js";

const selectorMenu = document.querySelector("#selectorMenu");
const cuerpoMenuDesplegado = document.querySelector("#cuerpoMenuDesplegado");

const activadorUsuario = document.querySelector("#activarUsuario");
const perfilDesactivado = document.querySelector("#perfilDesactivado");


new ActivarMenuDesplegableYUsuario(selectorMenu, cuerpoMenuDesplegado).menu();


new ActivarMenuDesplegableYUsuario(activadorUsuario, perfilDesactivado).usuario();


const botones = document.querySelectorAll('.button__verproducto');

// Redirección para los botones con la clase 'button__verproducto'
document.querySelectorAll('.button__verproducto').forEach((boton) => {
  new Link("../HTML/_19_categoriasVisualizarProductos.html", '.button__verproducto').redireccionar();
});

