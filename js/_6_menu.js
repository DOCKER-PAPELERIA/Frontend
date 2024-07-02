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


document.addEventListener('DOMContentLoaded', function() {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
        fetch('http://localhost:3000/user/usuario-perfil', {
            method: 'GET',
            headers: {
                'x-access-token': authToken
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener datos del usuario');
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos recibidos:', data); // Verificar que los datos son los esperados

            // Asegurarse de que la estructura de datos es correcta
            if (data && data.body) {
                actualizarInterfazUsuario(data.body); // Asegurarse de que se pasa el objeto usuario correcto
            } else if (data && !data.body) {
                console.warn('La estructura esperada no se encontró. Usando data directamente.');
                actualizarInterfazUsuario(data);
            } else {
                console.error('Respuesta inesperada:', data); // Verificar si la respuesta es inesperada
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        console.error('No se encontró el token de autenticación');
    }
});

function actualizarInterfazUsuario(usuario) {
    console.log('Actualizando interfaz con:', usuario);

    const nombreUsuarioElemento = document.querySelector('.contenedores__nombre');
    const nombreUsuarioSaludo = document.querySelector('.contenedores__saludo');

    if (nombreUsuarioElemento) {
        console.log('Elemento .contenedores__nombre encontrado');
        nombreUsuarioElemento.textContent = usuario.nombres; // Verifica que 'nombres' es correcto
    } else {
        console.error('No se encontró el elemento .contenedores__nombre');
    }

    if (nombreUsuarioSaludo) {
        console.log('Elemento .contenedores__saludo encontrado');
        nombreUsuarioSaludo.textContent = `¡HOLA, ${usuario.nombres}!`; // Verifica que 'nombres' es correcto
    } else {
        console.error('No se encontró el elemento .contenedores__saludo');
    }
}

// Botón para cerrar sesión
const botonCerrarSesion = document.getElementById('boton--cerrarSesion');
if (botonCerrarSesion) {
    botonCerrarSesion.addEventListener('click', function() {
        // Elimina el token de autenticación del localStorage
        localStorage.removeItem('authToken');

        // Redirige al usuario a la página de inicio de sesión
        window.location.href = '../HTML/_1_index.html'; // Reemplaza con tu URL de inicio de sesión
    });
}



















































