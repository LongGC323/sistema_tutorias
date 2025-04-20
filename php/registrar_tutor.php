<?php
include 'conexion.php'; // Asegúrate de que tienes este archivo con la conexión a la BD

// Verifica que se haya recibido la solicitud POST con los datos del formulario
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Obtención de los datos desde el formulario
    $num_empleado = $_POST['num_empleado'];
    $nombre = $_POST['nombre'];
    $a_paterno = $_POST['a_paterno'];
    $a_materno = $_POST['a_materno'];
    $e_mail = $_POST['e_mail'];
    $num_telefonico = $_POST['num_telefonico'];
    $genero = $_POST['genero'];
    $grado_estudio = $_POST['grado_estudio'];
    $unidad = $_POST['unidad'];

    // Prepara la consulta para insertar los datos
    $sql = "INSERT INTO tutor (num_empleado, nombre, a_paterno, a_materno, e_mail, num_telefonico, genero, grado_estudio, unidad)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    // Prepara la consulta y vincula los parámetros
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("sssssssss", $num_empleado, $nombre, $a_paterno, $a_materno, $e_mail, $num_telefonico, $genero, $grado_estudio, $unidad);

        // Ejecuta la consulta
        if ($stmt->execute()) {
            // Si la inserción es exitosa, enviar un mensaje de éxito
            echo "Tutor registrado con éxito.";
        } else {
            echo "Error al registrar al tutor: " . $stmt->error;
        }

        // Cierra la sentencia
        $stmt->close();
    } else {
        echo "Error al preparar la consulta: " . $conn->error;
    }

    // Cierra la conexión
    $conn->close();
}
?>
