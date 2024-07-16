/**
 * @fileoverview Script para manejar la activación y cierre de ventanas modales,
 * y la redirección de enlaces en la interfaz de usuario.
 */
import { eliminarTokenDespuesDeTiempo } from "../soloFunciones/destruirToken.js";
import { Link } from "../soloClases/links.js";

/**
 * Se ejecuta cuando el contenido del DOM ha sido cargado.
 * @listens DOMContentLoaded
 */
document.addEventListener("DOMContentLoaded", () => {
    /**
     * Activador del formulario.
     * @type {HTMLElement}
     */
    const form__activador = document.querySelector("#idForm__activador");

    /**
     * Primera ventana activada.
     * @type {HTMLElement}
     */
    const ventanaActivada = document.querySelector("#idVentanaActivada");

    /**
     * Segunda ventana activada.
     * @type {HTMLElement}
     */
    const ventanaActivada2 = document.querySelector("#idVentanaActivada2");

    /**
     * Elemento para cerrar la primera ventana.
     * @type {HTMLElement}
     */
    const cerrarVentana = document.querySelector("#idDivImg");

    /**
     * Elemento para cerrar la segunda ventana.
     * @type {HTMLElement}
     */
    const cerrarVentana2 = document.querySelector("#idVentanaActivada2__img");

    /**
     * Maneja el evento de clic en el activador del formulario para mostrar la primera ventana.
     * @param {Event} event - El evento de clic.
     */
    form__activador.addEventListener("click", (event) => {
        event.preventDefault(); // Para evitar el comportamiento predeterminado del botón
        ventanaActivada.style.display = "flex";
    });

    /**
     * Maneja el evento de clic en el elemento de cierre de la primera ventana.
     */
    cerrarVentana.addEventListener("click", () => {
        ventanaActivada.style.display = "none";
    });

    /**
     * Maneja el evento de clic en el elemento de cierre de la segunda ventana.
     */
    cerrarVentana2.addEventListener("click", () => {
        ventanaActivada2.style.display = "none";
    });

    // Obtener el token de localStorage
    const authToken = localStorage.getItem("authToken");

    // Obtener elementos del formulario
    const identificacionInput = document.querySelector("#identificacion");
    const nombreCompletoInput = document.querySelector("#nombre_completo");
    const contrasenaInput = document.querySelector("#contrasena");
    const confirmarContrasenaInput = document.querySelector("#confirmar_contrasena");
    const telefonoInput = document.querySelector("#telefono");
    const fechaNacimientoInput = document.querySelector("#fecha_nacimiento");

    // Obtener el correo electrónico del token en localStorage
    const correo = JSON.parse(atob(authToken.split('.')[1])).correo;

    // Establecer el valor del correo electrónico y deshabilitar el campo
    const correoInput = document.getElementById("correoElectronico");
    correoInput.value = correo;
    correoInput.disabled = true; // Para hacer el campo ineditable

    /**
     * Función para validar la contraseña.
     * @param {string} contrasena - La contraseña a validar.
     * @returns {string} - Mensaje de error si la contraseña no cumple con los requisitos, vacío si es válida.
     */
    function validarContrasena(contrasena) {
        const minLength = 8;
        const maxLength = 20;
        const hasUpperCase = /[A-Z]/.test(contrasena);
        const hasLowerCase = /[a-z]/.test(contrasena);
        const hasDigit = /\d/.test(contrasena);

        if (contrasena.length < minLength || contrasena.length > maxLength) {
            return `La contraseña debe tener entre ${minLength} y ${maxLength} caracteres.`;
        }
        if (!hasUpperCase) {
            return "La contraseña debe contener al menos una letra mayúscula.";
        }
        if (!hasLowerCase) {
            return "La contraseña debe contener al menos una letra minúscula.";
        }
        if (!hasDigit) {
            return "La contraseña debe contener al menos un número.";
        }
        return "";
    }

    /**
     * Maneja el evento de envío del formulario para actualizar datos del usuario.
     */
    const miForm = document.getElementById("miForm");
    miForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Validar que todos los campos obligatorios están completos
        if (!identificacionInput.value || !nombreCompletoInput.value || !telefonoInput.value || !fechaNacimientoInput.value) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        // Validar formato de correo electrónico
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        if (!emailPattern.test(correo)) {
            alert("El correo electrónico no tiene un formato válido.");
            return;
        }

        // Validar contraseña
        const contrasena = contrasenaInput.value;
        const mensajeError = validarContrasena(contrasena);
        if (mensajeError) {
            alert(mensajeError);
            return;
        }

        // Validar confirmación de la contraseña
        if (contrasena !== confirmarContrasenaInput.value) {
            alert("Las contraseñas no coinciden");
            return;
        }

        // Datos a enviar en la solicitud PUT
        const datos = {
            identificacion: identificacionInput.value,
            nombres: nombreCompletoInput.value,
            telefono: telefonoInput.value,
            fecha_naci: fechaNacimientoInput.value,
            correo: correo, // Añadir el campo de correo
            contrasena: contrasena,
            estado: "Activo" // Agregar el estado necesario
        };

        try {
            const response = await fetch("https://ms-inventario-api-mi-angel-1.onrender.com/user/usuario", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": authToken
                },
                body: JSON.stringify(datos)
            });

            const result = await response.json();
            if (response.ok) {
                console.log("Usuario modificado:", result);
                // Mostrar ventana de confirmación
                ventanaActivada.style.display = "none";
                ventanaActivada2.style.display = "flex";
                setTimeout(() => {
                    ventanaActivada2.style.display = "none";
                }, 3000); // Ocultar ventana de confirmación después de 3 segundos
            } else {
                console.error("Error al modificar usuario:", result);
                alert("Error al modificar usuario");
            }
        } catch (error) {
            console.error("Error al enviar solicitud:", error);
            alert("Error al enviar solicitud");
        }
    });
});

/**
 * Instancia de la clase Link para redirigir a la página del menú.
 */
new Link("../HTML/_6_menu.html", ".contenedorFormulario__retroceder").redireccionar();

eliminarTokenDespuesDeTiempo(60);
