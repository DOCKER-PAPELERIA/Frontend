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
    
    if (registerForm) {
        /**
         * Maneja el evento de envío del formulario de registro.
         * @param {Event} event - El evento de envío del formulario.
         */
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            /**
             * Datos del formulario de registro.
             * @type {Object}
             * @property {number} idRol - ID del rol del usuario, predeterminado a 1.
             * @property {string} identificacion - Identificación del usuario.
             * @property {string} nombres - Nombre completo del usuario.
             * @property {string} telefono - Teléfono del usuario.
             * @property {string} fecha_naci - Fecha de nacimiento del usuario.
             * @property {string} correo - Correo electrónico del usuario.
             * @property {string} contrasena - Contraseña del usuario.
             * @property {string} estado - Estado del usuario, predeterminado a 'activo'.
             */
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


const url = window.location.href; // Obtiene la URL actual
const nuevaUrl = url.split('.html')[0]; // Elimina la extensión .html
window.history.replaceState(null, null, nuevaUrl);
