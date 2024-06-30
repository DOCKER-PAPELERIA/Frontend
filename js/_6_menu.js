import { ActivarMenuDesplegableYUsuario } from "../soloClases/activarMenuDesplegableYUsuario.js";
import { Link } from "../soloClases/links.js";

/**
 * Selector del menú
 * @type {HTMLElement}
 */
const selectorMenu = document.querySelector("#selectorMenu");

/**
 * Cuerpo del menú desplegado
 * @type {HTMLElement}
 */
const cuerpoMenuDesplegado = document.querySelector("#cuerpoMenuDesplegado");

/**
 * Activador del usuario
 * @type {HTMLElement}
 */
const activadorUsuario = document.querySelector("#activarUsuario");

/**
 * Perfil desactivado
 * @type {HTMLElement}
 */
const perfilDesactivado = document.querySelector("#perfilDesactivado");

/**
 * Instancia de la clase ActivarMenuDesplegableYUsuario para controlar el menú
 */
new ActivarMenuDesplegableYUsuario(selectorMenu, cuerpoMenuDesplegado).menu();

/**
 * Instancia de la clase ActivarMenuDesplegableYUsuario para controlar el usuario
 */
new ActivarMenuDesplegableYUsuario(activadorUsuario, perfilDesactivado).usuario();

/**
 * Instancia de la clase Link para redirigir a la página de gestión de cuenta
 */
new Link("../HTML/_7_cambiarInformacionPersonal.html", ".contenedores__boton--gestionarCuenta").redireccionar();

new Link("../HTML/_6_menu.html", ".inicio").redireccionar();

new Link("../HTML/_8_alertas.html", ".alertas").redireccionar();

new Link("../HTML/_10_facturas.html", ".facturas").redireccionar();

new Link("../HTML/_13_productos.html", ".productos").redireccionar();

new Link("../HTML/_17_categorias.html", ".categorias").redireccionar();

new Link("../HTML/_23_comprobarExistencias.html", ".comprobarExistencias").redireccionar();


