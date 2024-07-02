export async function verificarTokenYRedirigir() {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        // No se encontró el token: Mostrar mensaje y redirigir al usuario
        alert('Por favor, regístrese para acceder.');
        window.location.href = '../HTML/index.html'; // Reemplaza con tu URL de inicio de sesión
    }
}
