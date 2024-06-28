import { Link } from "../soloClases/links.js";

// links de redireccionamiento.
new Link("../HTML/_1_login.html", "#linkInicioSesion").redireccionar();
new Link("../HTML/_2_registro.html", "#linkRegistrarse").redireccionar();


const nuevaURL = "registro"; // Sin la extensión .html
history.pushState({}, "", nuevaURL);