import { ActivarMenuDesplegableYUsuario } from "../soloClases/activarMenuDesplegableYUsuario.js";
import { Link } from "../soloClases/links.js";

const selectorMenu = document.querySelector("#selectorMenu");
const cuerpoMenuDesplegado = document.querySelector("#cuerpoMenuDesplegado");

const activadorUsuario = document.querySelector("#activarUsuario");
const perfilDesactivado = document.querySelector("#perfilDesactivado");

new ActivarMenuDesplegableYUsuario(selectorMenu, cuerpoMenuDesplegado).menu();

new ActivarMenuDesplegableYUsuario(activadorUsuario, perfilDesactivado).usuario();

// Redirección para el botón 'vercategBtn'
new Link("../HTML/_18_categoriasVisualizarCategorias.html", "#vercategBtn").redireccionar();

// Redirección para el botón 'nuevacategBtn'
new Link("../HTML/_20_categoriasNuevaCategoria.html", "#nuevacategBtn").redireccionar();

// Redirección para el botón 'cambiarinfoBtn'
new Link("../HTML/_21_categoriasCambiarInformacion.html", "#cambiarinfoBtn").redireccionar();

