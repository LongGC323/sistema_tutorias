document.addEventListener("DOMContentLoaded", function () {
    cargarDatos(); // Llama a la función para llenar las listas desplegables

    const form = document.querySelector("#FormularioTutor");

    // Función para cargar grados de estudio y unidades desde PHP
    function cargarDatos() {
        fetch("../php/obtener_datos.php")
            .then(response => response.json())
            .then(data => {
                llenarLista("gradoEstudio", data.grados);
                llenarLista("unidad", data.unidades);
            })
            .catch(error => console.error("Error al obtener datos:", error));
    }

    // Función para llenar una lista desplegable con datos de la BD
    function llenarLista(elementId, datos) {
        const select = document.getElementById(elementId);
        select.innerHTML = '<option value="">Seleccione</option>'; // Limpia y añade opción por defecto
    
        datos.forEach(item => {
            const option = document.createElement("option");
            option.value = item.nombre; // Ahora el value será el nombre, no el id
            option.textContent = item.nombre;
            select.appendChild(option);
        });
    }

    // Función para validar solo letras en nombres y apellidos
    function restringirLetras(campo) {
        campo.addEventListener("keypress", function (event) {
            const key = event.key;
            if (!/^[a-zA-ZÀ-ÿ\s]$/.test(key)) {
                event.preventDefault();
            }
        });

        campo.addEventListener("input", function () {
            this.value = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
        });
    }

    restringirLetras(document.getElementById("nombre"));
    restringirLetras(document.getElementById("apellidoPaterno"));
    restringirLetras(document.getElementById("apellidoMaterno"));

    // Restricción de Número de Empleado (8 dígitos)
    const numeroEmpleado = document.getElementById("numeroEmpleado");
    numeroEmpleado.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "").slice(0, 8);
    });

    // Restricción de Teléfono (10 dígitos)
    const numTelefonico = document.getElementById("numTelefonico");
    numTelefonico.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "").slice(0, 10);
    });

    // Función para validar el número de empleado (8 dígitos)
    function validarNumeroEmpleado() {
        const numero = numeroEmpleado.value;
        if (numero.length !== 8 || !/^\d{8}$/.test(numero)) {
            numeroEmpleado.setCustomValidity("Debe ser exactamente 8 dígitos numéricos.");
        } else {
            numeroEmpleado.setCustomValidity("");
        }
    }

    // Función para validar el número telefónico (10 dígitos)
    function validarNumeroTelefonico() {
        const telefono = numTelefonico.value;
        if (telefono.length !== 10 || !/^\d{10}$/.test(telefono)) {
            numTelefonico.setCustomValidity("Debe ser exactamente 10 dígitos numéricos.");
        } else {
            numTelefonico.setCustomValidity("");
        }
    }

    // Validación de correo
    const email = document.getElementById("email");
    email.addEventListener("input", function () {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        validarCampo(this, pattern);
    });

    // Validación del formulario
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (validarFormulario()) {
            // Recoger los datos del formulario
            const formData = new FormData(form);

            // Enviar los datos al servidor mediante AJAX
            fetch("../php/registrar_tutor.php", {
                method: "POST",
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                alert(data); // Muestra el mensaje devuelto desde el servidor
                if (data.includes("exitoso")) {
                    // Limpiar formulario o redirigir a otro lugar
                    form.reset();
                }
            })
            .catch(error => console.error("Error al registrar tutor:", error));
        } else {
            alert("Por favor, completa correctamente todos los campos.");
        }
    });

    function validarCampo(input, pattern) {
        if (pattern.test(input.value)) {
            input.classList.remove("error");
        } else {
            input.classList.add("error");
        }
    }

    function validarFormulario() {
        let valido = true;
        const inputs = document.querySelectorAll("input[required], select[required]");

        inputs.forEach(input => {
            if (input.value.trim() === "" || input.classList.contains("error")) {
                valido = false;
                input.classList.add("error");
            } else {
                input.classList.remove("error");
            }
        });

        return valido;
    }
});
