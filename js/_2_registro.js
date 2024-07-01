import { Link } from "../soloClases/links.js";



document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Obtener valores del formulario
    const nombreCompleto = document.getElementById('nombreCompleto').value;
    const identificacion = document.getElementById('identificacion').value;
    const correoElectronico = document.getElementById('correoElectronico').value;
    const contrasena = document.getElementById('contrasena').value;
    const confirmarContrasena = document.getElementById('confirmarContrasena').value;
    const telefono = document.getElementById('telefono').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;

    // Validar que las contraseñas coincidan
    if (contrasena !== confirmarContrasena) {
        alert('Las contraseñas no coinciden');
        return;
    }

    // Crear el objeto de datos
    const datosUsuario = {
        idRol: 1,
        identificacion: identificacion,
        nombres: nombreCompleto,
        telefono: telefono,
        fecha_naci: fechaNacimiento,
        correo: correoElectronico,
        contrasena: contrasena,
        estado: "activo"
    };

    try {
        // Enviar solicitud POST
        const respuesta = await fetch('http://localhost:3000/user/usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosUsuario)
        });

        // Manejar la respuesta del servidor
        const resultado = await respuesta.json();
        if (respuesta.ok) {
            alert('Registro exitoso');
            // Redireccionar o realizar alguna acción adicional
        } else {
            alert(`Error: ${resultado.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Ocurrió un error al registrar el usuario');
    }
});



































// links de redireccionamiento.
new Link("../HTML/_1_index.html", "#linkInicioSesion").redireccionar();
new Link("../HTML/_2_registro.html", "#linkRegistrarse").redireccionar();


