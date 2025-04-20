document.addEventListener('DOMContentLoaded', function() {
    const formularioBusquedaDiv = document.getElementById('form-busqueda');
    const inputBuscarMatricula = document.querySelector('input[name="Buscar_tutor"]');
    const botonBuscar = document.getElementById('boton-buscar');
    const infoTutorDiv = document.getElementById('info-tutor');
    const mensajeErrorDiv = document.getElementById('mensaje-error');
    const botonRegresar = document.getElementById('boton-regresar');
    const botonModificar = document.getElementById('boton-modificar');
    const botonCancelarBusqueda = document.getElementById('boton-cancelar-busqueda');

    // Verificar si los elementos existen antes de manipularlos
    if (infoTutorDiv) {
        infoTutorDiv.style.display = 'none';
    }
    if (mensajeErrorDiv) {
        mensajeErrorDiv.style.display = 'none';
    }

    botonBuscar.addEventListener('click', function(event) {
        event.preventDefault();  // Evitar que el formulario se envíe y la página se recargue
        const matricula = inputBuscarMatricula.value;

        // Verificar si la matrícula es válida
        if (!matricula || matricula.length !== 8) {
            mensajeErrorDiv.textContent = "Por favor ingresa una matrícula válida (8 dígitos).";
            mensajeErrorDiv.style.display = "block";
            return;
        }

        // Ocultar la información y mensaje de error al hacer una nueva búsqueda
        if (infoTutorDiv) {
            infoTutorDiv.style.display = 'none';
        }
        if (mensajeErrorDiv) {
            mensajeErrorDiv.style.display = 'none';
        }
        formularioBusquedaDiv.classList.remove('ocultar');

        setTimeout(() => {
            fetch("../php/buscarTutor.php", {
                method: 'POST',
                body: JSON.stringify({ num_empleado: matricula }), // Cambié a num_empleado
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Asignar los valores recibidos al DOM
                    if (document.getElementById('nombre-tutor')) {
                        document.getElementById('nombre-tutor').textContent = data.nombre || "No disponible";
                    }
                    if (document.getElementById('apellido-paterno-tutor')) {
                        document.getElementById('apellido-paterno-tutor').textContent = data.apellido_paterno || "No disponible";
                    }
                    if (document.getElementById('apellido-materno-tutor')) {
                        document.getElementById('apellido-materno-tutor').textContent = data.apellido_materno || "No disponible";
                    }
                    if (document.getElementById('telefono-tutor')) {
                        document.getElementById('telefono-tutor').textContent = data.telefono || "No disponible";
                    }
                    if (document.getElementById('correo-tutor')) {
                        document.getElementById('correo-tutor').textContent = data.correo || "No disponible";
                    }
                    if (document.getElementById('unidad-estudios-tutor')) {
                        document.getElementById('unidad-estudios-tutor').textContent = data.unidad || "No disponible";
                    }

                    // Mostrar la información del tutor
                    if (infoTutorDiv) {
                        infoTutorDiv.style.display = "block"; // Cambiar a 'flex' si es necesario
                        infoTutorDiv.classList.add('mostrar');
                    }

                    // Ocultar el mensaje de error si antes hubo uno
                    if (mensajeErrorDiv) {
                        mensajeErrorDiv.style.display = "none";
                    }
                } else {
                    if (mensajeErrorDiv) {
                        mensajeErrorDiv.textContent = "Número de empleado no encontrado.";
                        mensajeErrorDiv.style.display = "block";
                    }
                    if (infoTutorDiv) {
                        infoTutorDiv.style.display = "none"; // Asegura que no se muestre la info si no se encuentra
                    }
                }
            })
            .catch(error => {
                console.error('Error:', error);
                if (mensajeErrorDiv) {
                    mensajeErrorDiv.textContent = "Error en la búsqueda. Intenta de nuevo.";
                    mensajeErrorDiv.style.display = "block";
                }
            });
        }, 300);
    });

    botonRegresar.addEventListener('click', function() {
        if (infoTutorDiv) {
            infoTutorDiv.classList.remove('mostrar');
            infoTutorDiv.style.display = 'none';
        }
        formularioBusquedaDiv.classList.remove('ocultar');
        if (mensajeErrorDiv) {
            mensajeErrorDiv.classList.remove('mostrar');
            mensajeErrorDiv.style.display = 'none';
        }
        inputBuscarMatricula.value = '';
    });

    botonModificar.addEventListener('click', function() {
        window.location.href = 'ModificarT.html';
    });

    inputBuscarMatricula.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, ''); // Solo números
        if (this.value.length > 8) {
            this.value = this.value.slice(0, 8);
        }
    });

    // Lógica para el botón Cancelar en la búsqueda
    if (botonCancelarBusqueda) {
        botonCancelarBusqueda.addEventListener('click', function() {
            window.location.href = 'MenuA.html';
        });
    }
});
