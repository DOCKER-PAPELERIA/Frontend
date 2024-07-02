/**
 * Función para cerrar sesión del usuario
 */
export function cerrarSesion() {
    localStorage.removeItem('authToken');
    window.location.href = '../HTML/_1_index.html'; // Redirige a la página de inicio de sesión
}

