import { ActivarMenuDesplegableYUsuario } from "../soloClases/activarMenuDesplegableYUsuario.js";
import { Link } from "../soloClases/links.js";

const selectorMenu = document.querySelector("#selectorMenu");
const cuerpoMenuDesplegado = document.querySelector("#cuerpoMenuDesplegado");

const activadorUsuario = document.querySelector("#activarUsuario");
const perfilDesactivado = document.querySelector("#perfilDesactivado");

new ActivarMenuDesplegableYUsuario(selectorMenu, cuerpoMenuDesplegado).menu();

new ActivarMenuDesplegableYUsuario(activadorUsuario, perfilDesactivado).usuario();

new Link("../HTML/_11_facturasNuevaFactura.html","#nuevaFacturaBtn").redireccionar();

new Link("../HTML/_12_facturasVerFactura.html","#verFacturaBtn").redireccionar();


