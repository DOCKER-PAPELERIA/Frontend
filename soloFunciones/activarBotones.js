export const activarBoton = (activador, ...clases) => {
    let estadoActivo = true;

    activador.addEventListener("click", () => {
        clases.forEach(clase => {
            clase.style.display = estadoActivo ? "none" : "flex";
        });

        estadoActivo = !estadoActivo;
    });
};


// utils.js

/**
 * Función para obtener y actualizar los datos del usuario
 */
export function obtenerYActualizarDatosUsuario() {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
        return fetch('http://localhost:3000/user/usuario-perfil', {
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
            console.log('Datos recibidos:', data);
            actualizarInterfazUsuario(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        console.error('No se encontró el token de autenticación');
    }
}

/**
 * Función para actualizar la interfaz de usuario con los datos proporcionados
 * @param {object} usuario Objeto con los datos del usuario
 */
function actualizarInterfazUsuario(usuario) {
    const nombreUsuarioElemento = document.querySelector('.contenedores__nombre');
    const nombreUsuarioSaludo = document.querySelector('.contenedores__saludo');

    if (nombreUsuarioElemento) {
        nombreUsuarioElemento.textContent = usuario.nombres;
    } else {
        console.error('No se encontró el elemento .contenedores__nombre');
    }

    if (nombreUsuarioSaludo) {
        nombreUsuarioSaludo.textContent = `¡HOLA, ${usuario.nombres}!`;
    } else {
        console.error('No se encontró el elemento .contenedores__saludo');
    }
}

/**
 * Función para cerrar sesión del usuario
 */
export function cerrarSesion() {
    localStorage.removeItem('authToken');
    window.location.href = '../HTML/_1_index.html'; // Redirige a la página de inicio de sesión
}
