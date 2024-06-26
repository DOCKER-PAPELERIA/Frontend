import { Link } from "../soloClases/links.js";

// Links de redireccionamiento.
new Link("../HTML/_1_login.html", "#linkInicioSesion").redireccionar();
new Link("../HTML/_2_registro.html", "#linkRegistrarse").redireccionar();

// Código para manejar el formulario de inicio de sesión
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const contrasena = document.getElementById('contrasena').value;

    fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usuario: usuario,
            contrasena: contrasena
        })
    })
    .then(response => response.json())
    .then(data => {
        // Maneja la respuesta del servidor
        console.log(data);
        if (!data.error && data.status === 200) {
            // Almacena el token en el almacenamiento local
            localStorage.setItem('authToken', data.body);
            // Redirigir a la página principal o mostrar mensaje de éxito
            window.location.href = '../HTML/_6_menu.html';
        } else {
            // Mostrar mensaje de error
            alert('Inicio de sesión fallido.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ocurrió un error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.');
    });
});
