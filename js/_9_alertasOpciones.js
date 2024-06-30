import { ActivarMenuDesplegableYUsuario } from "../soloClases/activarMenuDesplegableYUsuario.js";
import { Link } from "../soloClases/links.js";

const selectorMenu = document.querySelector("#selectorMenu");
const cuerpoMenuDesplegado = document.querySelector("#cuerpoMenuDesplegado");

const activadorUsuario = document.querySelector("#activarUsuario");
const perfilDesactivado = document.querySelector("#perfilDesactivado");

new ActivarMenuDesplegableYUsuario(selectorMenu, cuerpoMenuDesplegado).menu();

new ActivarMenuDesplegableYUsuario(
    activadorUsuario,
    perfilDesactivado
).usuario();


const inicio = document.querySelector(".inicio");
const estadisticas = document.querySelector(".estadisticas");
const alertas = document.querySelector(".alertas");
const analisisVentas = document.querySelector(".analisisVentas");
const compras = document.querySelector(".ventas");
const facturas = document.querySelector(".facturas");
const productos = document.querySelector(".productos");
const categorias = document.querySelector(".categorias");
const comprobarExistencias = document.querySelector(".comprobarExistencias");
const gestionarCuenta = document.querySelector(".perfilActivado__contenedores");

new Link(
    "../HTML/_7_cambiarInformacionPersonal.html",
    ".contenedores__boton--gestionarCuenta"
).redireccionar();

new Link("../HTML/_6_menu.html", ".contenedor1__icono2").redireccionar();

