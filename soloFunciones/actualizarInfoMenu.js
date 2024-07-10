/**
 * Función asíncrona para obtener y actualizar los datos del usuario desde el servidor.
 * Se espera que el token de autenticación esté almacenado en localStorage.
 * @returns {Promise<object>} Objeto con los datos del usuario recibidos desde el servidor.
 * @throws {Error} Si no se encuentra el token de autenticación en localStorage.
 * @throws {Error} Si ocurre un error al obtener los datos del usuario desde el servidor.
 */
export async function obtenerYActualizarDatosUsuario() {
    try {
        const authToken = localStorage.getItem('authToken');
        
        if (!authToken) {
            throw new Error('No se encontró el token de autenticación en localStorage');
        }

        const response = await fetch('https://ms-inventario-api-mi-angel-1.onrender.com/user/usuario-perfil', {
            method: 'GET',
            headers: {
                'x-access-token': authToken
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener datos del usuario desde el servidor');
        }

        const data = await response.json();
        console.log('Datos del usuario recibidos:', data);
        
        actualizarInterfazUsuario(data); // Actualizar interfaz como lo hacías antes

        return data.body; // Devolver los datos del usuario recibidos
    } catch (error) {
        console.error('Error al obtener y actualizar datos del usuario:', error);
        throw error; // Propagar el error para manejarlo donde se llame esta función
    }
}



/**
 * Función para actualizar la interfaz de usuario con los datos proporcionados.
 * @param {object} usuario - Objeto que contiene los datos del usuario recibidos desde el servidor.
 * @param {string} usuario.body.nombres - Nombre completo del usuario.
 * @throws {Error} Si no se encuentra el elemento con ID "nombre1" en el DOM.
 * @throws {Error} Si no se encuentra el elemento con ID "nombre2" en el DOM.
 */
function actualizarInterfazUsuario(usuario) {
    try {
        const nombreUsuarioElemento = document.getElementById('nombre1');
        const nombreUsuarioSaludo = document.getElementById('nombre2');

        if (nombreUsuarioElemento) {
            nombreUsuarioElemento.textContent = usuario.body.nombres;
        } else {
            throw new Error('No se encontró el elemento con ID "nombre1" en el DOM');
        }

        if (nombreUsuarioSaludo) {
            const splitNombre = usuario.body.nombres.split(' ');
            nombreUsuarioSaludo.textContent = `¡HOLA, ${splitNombre[0]}!`;
        } else {
            throw new Error('No se encontró el elemento con ID "nombre2" en el DOM');
        }
    } catch (error) {
        console.error('Error al actualizar la interfaz de usuario:', error);
    }
}
