/**
 * @fileoverview Script para manejar la recuperación de cuentas.
 * Este script proporciona funcionalidad para enviar una solicitud de recuperación de cuenta a la API y manejar la respuesta.
 */

document.getElementById('recuperarCuentaForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    /**
     * @type {string}
     * @description El correo electrónico ingresado por el usuario para la recuperación de la cuenta.
     */
    const email = document.getElementById('emailInput').value;

    try {
        /**
         * Envía una solicitud de recuperación de cuenta al servidor.
         * @returns {Promise<void>}
         */
        const response = await fetch('https://ms-inventario-api-mi-angel-1.onrender.com/user/usuario-nueva-contrsena', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo: email })
        });

        if (!response.ok) {
            /**
             * Maneja errores HTTP.
             * @throws {Error} - Error con el estado HTTP.
             */
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        /**
         * Procesa la respuesta del servidor.
         * @type {Object}
         * @property {boolean} success - Indicador de éxito de la solicitud.
         * @property {string} message - Mensaje del servidor.
         */
        const data = await response.json();
        console.log('Respuesta del servidor:', data);

        // Redireccionar al login u otra página según sea necesario
        alert("Contraseña cambiada correctamente y enviada al correo. Regrese a la página principal para iniciar sesión.");
    } catch (error) {
        /**
         * Maneja errores en la solicitud de recuperación de cuenta.
         * @param {Error} error - El error capturado.
         */
        alert('Correo no existe.', error);
        console.error('Error en la solicitud de recuperación de cuenta:', error);
        // Mostrar un mensaje de error al usuario o registrar el error para depuración
    }
});
