document.getElementById('recuperarCuentaForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const email = document.getElementById('emailInput').value;

    try {
        const response = await fetch('https://ms-inventario-api-mi-angel-1.onrender.com/user/usuario-nueva-contrasena', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo: email })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Respuesta del servidor:', data);
        // Redireccionar al login u otra página según sea necesario
        alert("contraseña cambiada correctamente y enviada al correo. regrese a la pagina principal para iniciar sesion ");
    } catch (error) {
        alert('Correo no existe.', error);
        // Mostrar un mensaje de error al usuario o registrar el error para depuración
    }
});
