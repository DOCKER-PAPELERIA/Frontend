import { Link } from "../soloClases/links.js";

/**
 * Redirige a la página de inicio de sesión.
 */
new Link("../HTML/_1_login.html", "#linkInicioSesion").redireccionar();

/**
 * Redirige a la página de registro.
 */
new Link("../HTML/_2_registro.html", "#linkRegistrarse").redireccionar(); 

/**
 * Agrega un evento al formulario de inicio de sesión para manejar el proceso de autenticación.
 * 
 * @param {Event} event - El evento de envío del formulario.
 */
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;

    /**
     * Envía una solicitud de inicio de sesión al servidor.
     * 
     * @returns {Promise<void>}
     */
    fetch('http://localhost:3000/user/login', {
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
            throw new Error('Inicio de sesión fallido. Credenciales incorrectas.');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        if (!data.error) {
            localStorage.setItem('authToken', data.body); 
            window.location.href = '../HTML/_6_menu.html'; 
        } else {
            alert('Inicio de sesión fallido. Credenciales incorrectas.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ocurrió un error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.');
    });
});

/**
 * Actualiza la URL sin recargar la página.
 * 
 * @type {string}
 */
const nuevaURL = "login"; // Sin la extensión .html
history.pushState({}, "", nuevaURL);
