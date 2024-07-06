/**
 * Añade un event listener al formulario de recuperación de cuenta.
 * Escucha el evento 'submit' y realiza una solicitud asíncrona al servidor para recuperar la cuenta.
 */
document.getElementById('recuperarCuentaForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    /** 
     * Obtiene el valor del campo de entrada del correo electrónico.
     * @type {string}
     */
    const email = document.getElementById('emailInput').value;

    try {
        /** 
         * Realiza una solicitud POST al servidor para cambiar la contraseña.
         * @type {Response}
         */
        const response = await fetch('http://localhost:3000/user/usuario-nueva-contrasena', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo: email })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        /**
         * Obtiene la respuesta del servidor en formato JSON.
         * @type {Object}
         */
        const data = await response.json();
        console.log('Respuesta del servidor:', data);
        // Redireccionar al login u otra página según sea necesario
        alert("Contraseña cambiada correctamente y enviada al correo. Regrese a la página principal para iniciar sesión.");
    } catch (error) {
        alert('Correo no existe.', error);
        // Mostrar un mensaje de error al usuario o registrar el error para depuración
    }
});
