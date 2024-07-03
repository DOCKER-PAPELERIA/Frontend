// Función para eliminar un token después de cierto tiempo
export function eliminarTokenDespuesDeTiempo(tiempoEnMinutos) {
    const token = localStorage.getItem('authToken'); // Obtener el token del localStorage
    if (token) {
      const tiempoEnMilisegundos = tiempoEnMinutos * 60 * 1000;
        setTimeout(() => {
        localStorage.removeItem('authToken');
        }, tiempoEnMilisegundos);
    } else {
        alert('No se encontró ningún token en el localStorage.');
        window.location.href = '../HTML/index.html'; // Redirige a la página de inicio de sesión


    }
}


