document.getElementById("nuevaFacturaBtn").addEventListener("click", function() {
    window.location.href = "facturas_nuevafactura.html";
});
document.getElementById("verFacturaBtn").addEventListener("click", function() {
    window.location.href = "facturas_verfactura.html";
});


import { ActivarMenuDesplegableYUsuario } from "../_1_caro/soloClases/activarMenuDesplegableYUsuario.js";

const selectorMenu = document.querySelector("#selectorMenu");
const cuerpoMenuDesplegado = document.querySelector("#cuerpoMenuDesplegado");

const activadorUsuario = document.querySelector("#activarUsuario");
const perfilDesactivado = document.querySelector("#perfilDesactivado");


new ActivarMenuDesplegableYUsuario(selectorMenu, cuerpoMenuDesplegado).menu();


new ActivarMenuDesplegableYUsuario(activadorUsuario, perfilDesactivado).usuario();


