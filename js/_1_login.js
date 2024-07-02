import { Link } from "../soloClases/links.js";

new Link("../HTML/index.html", "#linkInicioSesion").redireccionar();
new Link("../HTML/_2_registro.html", "#linkRegistrarse").redireccionar(); 

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;

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
                throw new Error(data.message || 'Inicio de sesión fallido. Credenciales incorrectas.');
            });
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        if (!data.error) {
            localStorage.setItem('authToken', data.body);
            window.location.href = '../HTML/_6_menu.html';
        } else {
            alert(data.message || 'Inicio de sesión fallido. Credenciales incorrectas.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert(error.message || 'Ocurrió un error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.');
    });
});

