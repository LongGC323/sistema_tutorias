document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('loginForm');

    if (!loginForm) {
        console.error("No se encontró el formulario con id 'loginForm'.");
        return;
    }

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const errorMsg = document.getElementById('error-msg');

        console.log("Usuario ingresado:", username);
        console.log("Contraseña ingresada:", password);

        // Muestra la ventana flotante "Cargando..."
        showLoadingModal();

        // Realiza la solicitud fetch al archivo PHP
        fetch("../php/login.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                username: username,
                password: password
            })
        })
        .then(response => response.json())  // Convierte la respuesta a JSON
        .then(data => {
            if (data.success) {
                // Redirige según la respuesta del servidor
                console.log("Redirigiendo a:", data.redirect);
                window.location.href = data.redirect;
            } else {
                // Si las credenciales son incorrectas, muestra el error
                console.log(data.message);  // Muestra el mensaje de error en la consola
                errorMsg.textContent = data.message;
            }
            hideLoadingModal();  // Oculta la ventana flotante "Cargando..."
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
            errorMsg.textContent = "Hubo un error en la solicitud. Inténtalo nuevamente.";
            hideLoadingModal();  // Oculta la ventana flotante "Cargando..." en caso de error
        });
    });

    // Función para mostrar la ventana flotante "Cargando..."
    function showLoadingModal() {
        const modal = document.createElement('div');
        modal.id = 'loadingModal';
        modal.innerHTML = '<p>Cargando...</p>';
        document.body.appendChild(modal);
    }

    // Función para ocultar la ventana flotante "Cargando..."
    function hideLoadingModal() {
        const modal = document.getElementById('loadingModal');
        if (modal) {
            modal.remove();
        }
    }
});
