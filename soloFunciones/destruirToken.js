/**
 * Función para eliminar un token de autenticación después de cierto tiempo.
 * @param {number} tiempoEnMinutos Tiempo en minutos después del cual se eliminará el token.
 */
export function eliminarTokenDespuesDeTiempo(tiempoEnMinutos) {
    try {
        const token = localStorage.getItem('authToken'); // Obtener el token del localStorage
        if (token) {
            const tiempoEnMilisegundos = tiempoEnMinutos * 60 * 1000; // Convertir minutos a milisegundos
            setTimeout(() => {
                localStorage.removeItem('authToken'); // Eliminar el token del localStorage después del tiempo especificado
            }, tiempoEnMilisegundos);
        } else {
            throw new Error('No se encontró ningún token en el localStorage.');
        }
    } catch (error) {
        console.error('Error al eliminar el token:', error);
        alert('Ha ocurrido un error. Por favor, inicie sesión nuevamente.'); // Alerta en caso de error
        window.location.href = '../HTML/index.html'; // Redirige a la página de inicio de sesión
    }
}
