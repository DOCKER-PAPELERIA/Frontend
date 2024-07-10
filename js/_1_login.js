

/**
 * @fileoverview Script para manejar la redirección de enlaces y el inicio de sesión de usuario.
 * Este script proporciona funcionalidad para redirigir a los usuarios a las páginas de inicio de sesión y registro,
 * y para manejar el proceso de inicio de sesión mediante una solicitud a la API.
 */

import { Link } from "../soloClases/links.js";

/**
 * Redirecciona a la página de inicio de sesión.
 * @type {Link}
 */
new Link("../HTML/index.html", "#linkInicioSesion").redireccionar();

/**
 * Redirecciona a la página de registro.
 * @type {Link}
 */
new Link("../HTML/_2_registro.html", "#linkRegistrarse").redireccionar();

/**
 * Maneja el evento de envío del formulario de inicio de sesión.
 * @param {Event} event - El evento de envío del formulario.
 */
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;

    /**
     * Realiza la solicitud de inicio de sesión al servidor.
     * @returns {Promise<void>}
     */
    fetch('https://ms-inventario-api-mi-angel-1.onrender.com/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            correo: correo,
            contrasena: contrasena
        })
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    /**
                     * Maneja errores de respuesta.
                     * @throws {Error} - Error con mensaje específico o genérico.
                     */
                    throw new Error(data.message || 'Inicio de sesión fallido. Credenciales incorrectas.');
                });
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            if (!data.error) {
                /**
                 * Almacena el token de autenticación en localStorage y redirige al menú principal.
                 */
                localStorage.setItem('authToken', data.body);
                window.location.href = '../HTML/_6_menu.html';
            } else {
                /**
                 * Muestra un mensaje de error si las credenciales son incorrectas.
                 */
                
                // alert(data.message || 'Inicio de sesión fallido. Credenciales incorrectas.');
                Swal.fire({
                    icon: "warning",
                    title: "Inicio de sesión fallido. Credenciales incorrectas.",
                    showConfirmButton: false,
                    timer: 2500
                });
            }
        })
        .catch(error => {
            /**
             * Maneja errores de solicitud y muestra un mensaje de alerta.
             * @param {Error} error - El error capturado.
             */
            console.error('Error:', error);
            // alert(error.message || 'Ocurrió un error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.');
            Swal.fire({
                icon: "error",
                title: "Ocurrió un error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.",
                showConfirmButton: false,
                timer: 2500
            });
        });
});




const urls = window.location.href; // Obtiene la URL actual
const nuevaUrl = urls.split('.html')[0]; // Elimina la extensión .html
window.history.replaceState(null, null, nuevaUrl);
