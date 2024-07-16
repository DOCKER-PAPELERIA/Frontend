/**
 * @fileoverview Script para manejar la redirección de enlaces y el registro de usuario.
 * Este script proporciona funcionalidad para redirigir a los usuarios a las páginas de inicio de sesión y registro,
 * y para manejar el proceso de registro mediante una solicitud a la API.
 */

import { Link } from "../soloClases/links.js";

/**
 * Redirecciona a la página de inicio de sesión.
 * @type {Link}
 */
new Link("../HTML/index.html", "#linkInicioSesion").redireccionar();

/**
 * Redirecciona a la página de registro.
 * @type {Link}
 */
new Link("../HTML/_2_registro.html", "#linkRegistrarse").redireccionar();

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const mostrarContrasena = document.getElementById('mostrarContrasena');
    const contrasenaInput = document.getElementById('contrasena');
    const confirmarContrasenaInput = document.getElementById('confirmarContrasena');
    const correoElectronicoInput = document.getElementById('correoElectronico');

    const emailPattern = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/;
    const invalidDomains = ["example.com", "test.com", "invalid.com"];

    if (mostrarContrasena) {
        mostrarContrasena.addEventListener('change', () => {
            const type = mostrarContrasena.checked ? 'text' : 'password';
            contrasenaInput.type = type;
            confirmarContrasenaInput.type = type;
        });
    }

    if (registerForm) {
        /**
         * Maneja el evento de envío del formulario de registro.
         * @param {Event} event - El evento de envío del formulario.
         */
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const identificacion = document.getElementById('identificacion').value;
            const nombreCompleto = document.getElementById('nombreCompleto').value;
            const telefono = document.getElementById('telefono').value;
            const fechaNacimiento = document.getElementById('fechaNacimiento').value;
            let correoElectronico = correoElectronicoInput.value.toLowerCase(); // Convertir a minúsculas
            const contrasena = document.getElementById('contrasena').value;
            const confirmarContrasena = document.getElementById('confirmarContrasena').value;

            // Validar que las contraseñas coinciden
            if (contrasena !== confirmarContrasena) {
                alert('Las contraseñas no coinciden.');
                return;
            }

            // Validar formato de correo electrónico
            if (!emailPattern.test(correoElectronico)) {
                alert('Introduce un correo electrónico válido.');
                return;
            }

            // Validar dominio del correo electrónico
            const correoDomain = correoElectronico.split('@')[1];
            if (invalidDomains.includes(correoDomain)) {
                alert('El dominio del correo electrónico no está permitido.');
                return;
            }

            const formData = {
                idRol: 1, // Esto podría cambiar según tu lógica de negocio
                identificacion,
                nombres: nombreCompleto,
                telefono,
                fecha_naci: fechaNacimiento,
                correo: correoElectronico,
                contrasena,
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
                const response = await fetch('https://ms-inventario-api-mi-angel-1.onrender.com/user/usuario', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
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
