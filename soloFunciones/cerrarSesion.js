/**
 * Función para cerrar sesión del usuario.
 * Elimina el token de autenticación almacenado en localStorage y redirige a la página de inicio de sesión.
 */
export function cerrarSesion() {
    try {
        localStorage.removeItem('authToken'); // Elimina el token de autenticación
        window.location.href = '../HTML/index.html'; // Redirige a la página de inicio de sesión
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
}
