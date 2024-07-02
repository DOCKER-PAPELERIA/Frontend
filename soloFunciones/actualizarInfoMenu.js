/**
 * Función para obtener y actualizar los datos del usuario
 */
export async function obtenerYActualizarDatosUsuario() {
    try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            throw new Error('No se encontró el token de autenticación');
        }

        const response = await fetch('https://ms-inventario-api-mi-angel-1.onrender.com/user/usuario-perfil', {
            method: 'GET',
            headers: {
                'x-access-token': authToken
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener datos del usuario');
        }

        const data = await response.json();
        console.log('Datos recibidos:', data);
        actualizarInterfazUsuario(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

/**
 * Función para actualizar la interfaz de usuario con los datos proporcionados
 * @param {object} usuario Objeto con los datos del usuario
 */
function actualizarInterfazUsuario(usuario) {
    const nombreUsuarioElemento = document.getElementById('nombre1');
    const nombreUsuarioSaludo = document.getElementById('nombre2');
    const split = (usuario.body.nombres).split(' ');
    if (nombreUsuarioElemento) {
        nombreUsuarioElemento.textContent = usuario.body.nombres;
    } else {
        console.error('No se encontró el elemento con ID "nombre1"');
    }

    if (nombreUsuarioSaludo) {
        nombreUsuarioSaludo.textContent = `¡HOLA, ${split[0]}!`;
    } else {
        console.error('No se encontró el elemento con ID "nombre2"');
    }
}

