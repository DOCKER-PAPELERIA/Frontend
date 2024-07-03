import { Link } from "../soloClases/links.js";



document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = {
                idRol: 1, // Esto podría cambiar según tu lógica de negocio
                identificacion: document.getElementById('identificacion').value,
                nombres: document.getElementById('nombreCompleto').value,
                telefono: document.getElementById('telefono').value,
                fecha_naci: document.getElementById('fechaNacimiento').value,
                correo: document.getElementById('correoElectronico').value,
                contrasena: document.getElementById('contrasena').value,
                estado: 'activo'
            };

            // Validar que todos los campos tienen valores
            for (const key in formData) {
                if (!formData[key]) {
                    alert(`El campo ${key} es obligatorio.`);
                    return;
                }
            }

            try {
                const response = await fetch('http://localhost:3000/user/usuario', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // Incluye otros encabezados si es necesario, como tokens de autenticación
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    const errorMessage = await response.json();
                    console.error('Error:', errorMessage);
                    alert(`Error: ${errorMessage.message || 'Error desconocido'}`);
                    return;
                }

                const result = await response.json();
                console.log(result);
                // Aquí puedes manejar la respuesta del servidor, como mostrar un mensaje al usuario
                alert('Usuario creado correctamente.');
            } catch (error) {
                console.error('Error:', error);
                alert('Ocurrió un error al crear el usuario.');
                // Aquí puedes manejar los errores, como mostrar un mensaje de error al usuario
            }
        });
    }
});



































// links de redireccionamiento.
new Link("../HTML/index.html", "#linkInicioSesion").redireccionar();
new Link("../HTML/_2_registro.html", "#linkRegistrarse").redireccionar();


