document.addEventListener("DOMContentLoaded", function () {
    // Función para confirmar antes de regresar
    document.getElementById('cancelarButton').addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        var confirmarCancelacion = confirm("¿Estás seguro de que deseas cancelar el registro?");
        if (confirmarCancelacion) {
            window.history.back();
        }
    });

    // Función para cargar los datos de semestres y carreras desde la base de datos
    function cargarDatos() {
        fetch("../php/obtenerDatos.php")
            .then(response => response.json())
            .then(data => {
                llenarLista("semestre", data.semestres);
                llenarLista("carrera", data.carreras);
            })
            .catch(error => console.error("Error al obtener datos:", error));
    }

    function llenarLista(elementId, datos) {
        const select = document.getElementById(elementId);
        select.innerHTML = '<option value="">Seleccione una Opción</option>';
    
        if (datos && datos.length > 0) {
            datos.forEach(item => {
                const option = document.createElement("option");
                option.value = item.nombre;
                option.textContent = item.nombre;
                select.appendChild(option);
            });
        } else {
            const option = document.createElement("option");
            option.textContent = "Sin datos disponibles";
            select.appendChild(option);
        }
    }

    cargarDatos();

    let fechaInput = document.getElementById("fechaRegistro");
    let fechaActual = new Date().toISOString().split("T")[0];
    fechaInput.value = fechaActual;

    // Validaciones de formulario y envío de datos
    document.getElementById("registroForm").addEventListener("submit", function (event) {
        let matricula = document.getElementById("matricula").value;
        let telefono = document.getElementById("telefono").value;
        let edad = document.getElementById("edad").value;
        let semestre = document.getElementById("semestre").value;
        let carrera = document.getElementById("carrera").value;
        let errores = [];

        if (!/^\d{8}$/.test(matricula)) {
            errores.push("La matrícula debe contener exactamente 8 dígitos numéricos.");
        }

        if (telefono.length !== 10) {
            errores.push("El teléfono debe contener exactamente 10 dígitos numéricos.");
        }

        if (!/^[0-9]+$/.test(edad) || edad < 18 || edad > 40) {
            errores.push("La edad debe estar entre 18 y 40 años.");
        }

        if (errores.length > 0) {
            event.preventDefault();
            mostrarErrores(errores);
        } else {
            // Enviar los datos al servidor
            enviarDatosFormulario(matricula, telefono, edad, semestre, carrera);
            event.preventDefault();  // Prevenir el envío del formulario estándar
        }
    });

    function mostrarErrores(errores) {
        const errorContainer = document.getElementById("errorMessages");
        errorContainer.innerHTML = errores.join("<br>");
        errorContainer.classList.add("show");
    }

    // Función para enviar los datos al servidor
    function enviarDatosFormulario(matricula, telefono, edad, semestre, carrera) {
        const formData = new FormData();
        formData.append("matricula", matricula);
        formData.append("Nombres", document.getElementById("Nombres").value);
        formData.append("apellidoPaterno", document.getElementById("apellidoPaterno").value);
        formData.append("apellidoMaterno", document.getElementById("apellidoMaterno").value);
        formData.append("correo", document.getElementById("correo").value);
        formData.append("telefono", telefono);
        formData.append("edad", edad);
        formData.append("semestre", semestre);
        formData.append("fechaRegistro", document.getElementById("fechaRegistro").value);
        formData.append("carrera", carrera);

        fetch("../php/guardarTutorado.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert(data); // Muestra el mensaje del servidor
        })
        .catch(error => console.error("Error al enviar datos:", error));
    }
});
