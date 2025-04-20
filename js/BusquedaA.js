document.addEventListener('DOMContentLoaded', function () {
    const formularioBusquedaDiv = document.getElementById('formulario-busqueda');
    const inputBuscarMatricula = document.querySelector('input[name="Buscar_tutor"]');
    const botonBuscar = document.getElementById('boton-buscar');
    const infoTutorDiv = document.getElementById('info-tutor');
    const mensajeErrorDiv = document.getElementById('mensaje-error');
    const botonRegresar = document.getElementById('boton-regresar');
    const botonModificar = document.getElementById('boton-modificar');
    const botonCancelarBusqueda = document.getElementById('boton-cancelar-busqueda');

    // Ocultar la información del tutorado y el mensaje de error al inicio
    infoTutorDiv.style.display = 'none';
    mensajeErrorDiv.style.display = 'none';

    botonBuscar.addEventListener('click', function (event) {
        event.preventDefault();
        const matricula = inputBuscarMatricula.value.trim();

        // Verificamos si la matrícula no está vacía
        if (matricula === '') {
            mensajeErrorDiv.textContent = "Por favor, ingresa una matrícula.";
            mensajeErrorDiv.style.display = 'block';
            return;
        }

        // Realizamos la solicitud al servidor para obtener los datos del tutorado
        fetch('../php/buscarTutorado.php', {
            method: 'POST',
            body: JSON.stringify({ matricula }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())  // Nos aseguramos de que la respuesta sea JSON
        .then(data => {
            // Ocultamos los elementos de error e información al inicio
            mensajeErrorDiv.style.display = 'none';
            infoTutorDiv.style.display = 'none';

            // Si la búsqueda es exitosa
            if (data.success) {
                // Rellenamos los campos con los datos del tutorado
                document.getElementById('nombre-tutor').textContent = data.nombre || "No disponible";
                document.getElementById('apellido-paterno-tutor').textContent = data.apellido_paterno || "No disponible";
                document.getElementById('apellido-materno-tutor').textContent = data.apellido_materno || "No disponible";
                document.getElementById('correo-tutor').textContent = data.correo || "No disponible";
                document.getElementById('telefono-tutor').textContent = data.telefono || "No disponible";
                document.getElementById('edad-tutor').textContent = data.edad || "No disponible";
                document.getElementById('semestre-tutor').textContent = data.semestre || "No disponible";
                document.getElementById('fecha-ingreso-tutor').textContent = data.fecha_ingreso || "No disponible";
                document.getElementById('carrera-tutor').textContent = data.carrera || "No disponible";
                document.getElementById('grupo-tutor').textContent = data.grupo || "No disponible";

                // Mostramos la sección de información
                infoTutorDiv.style.display = 'block';
            } else {
                // En caso de que no se encuentren resultados, mostramos el mensaje de error
                mensajeErrorDiv.textContent = data.message || "No se encontraron resultados.";
                mensajeErrorDiv.style.display = 'block';
            }
        })
        .catch(error => {
            // Si ocurre un error en la solicitud, mostramos un mensaje de error
            mensajeErrorDiv.textContent = "Error al buscar tutorado.";
            mensajeErrorDiv.style.display = 'block';
            console.error(error);
        });
    });

    // Función para regresar a la vista anterior
    botonRegresar.addEventListener('click', function () {
        infoTutorDiv.style.display = 'none';
        mensajeErrorDiv.style.display = 'none';
        inputBuscarMatricula.value = '';
    });

    // Función para modificar la información del tutorado
    botonModificar.addEventListener('click', function () {
        window.location.href = 'ModificarA.html';
    });

    // Función para cancelar la búsqueda y regresar al menú
    botonCancelarBusqueda.addEventListener('click', function () {
        window.location.href = 'MenuB.html';
    });

    // Función para asegurar que solo se ingresen números en la matrícula
    inputBuscarMatricula.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');  // Solo permite números
        if (this.value.length > 8) {
            this.value = this.value.slice(0, 8);  // Limita la longitud a 8 caracteres
        }
    });
});
