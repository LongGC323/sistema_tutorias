<?php
$servidor = "localhost";
$usuario = "prueba";  // Tu usuario de MySQL
$contrasena = "PdF32FEdataBase*";  // Tu contraseña de MySQL
$base_datos = "plan_tutorial";  // Nombre de la base de datos

// Crear la conexión
$conn = new mysqli($servidor, $usuario, $contrasena, $base_datos);

// Verificar si hay un error en la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
} else {
    //echo "Conexión exitosa a la base de datos.";
}

?>
