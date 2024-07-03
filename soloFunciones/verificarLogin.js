/**
 * Verifica la existencia de un token de autenticación en el localStorage.
 * Si no se encuentra el token, muestra un mensaje y redirige al usuario a la página de inicio de sesión.
 */
export async function verificarTokenYRedirigir() {
    try {
        const authToken = localStorage.getItem('authToken'); // Obtener el token del localStorage
        if (!authToken) {
            // Si no se encontró el token
            alert('Por favor, regístrese para acceder.'); // Mostrar mensaje al usuario
            window.location.href = '../HTML/index.html'; // Redirigir a la página de inicio de sesión
        }
    } catch (error) {
        console.error('Error al verificar el token:', error); // Registrar error en la consola en caso de fallo
        alert('Ha ocurrido un error. Por favor, regístrese nuevamente.'); // Mostrar alerta al usuario en caso de error
        window.location.href = '../HTML/index.html'; // Redirigir a la página de inicio de sesión en caso de error
    }
}
