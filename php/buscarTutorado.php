<?php
// Inicia la sesión o la configuración necesaria
header('Content-Type: application/json');  // Asegura que la respuesta sea en formato JSON

// Incluir el archivo de conexión a la base de datos
require_once 'conexion.php';  // Asegúrate de que el archivo de conexión esté correctamente ubicado

try {
    // Obtener los datos de la solicitud JSON
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Verificar que se haya recibido la matrícula
    if (isset($input['matricula'])) {
        $matricula = $input['matricula'];

        // Consulta a la base de datos
        $sql = "SELECT * FROM tutorado WHERE matricula = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $matricula);  // Se asume que matricula es un string (ajustar tipo según sea necesario)

        if ($stmt->execute()) {
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $tutorado = $result->fetch_assoc();
                
                // Si se encuentra al tutorado, enviar los datos en formato JSON
                echo json_encode([
                    'success' => true,
                    'nombre' => $tutorado['nombre'],
                    'apellido_paterno' => $tutorado['apellido_paterno'],
                    'apellido_materno' => $tutorado['apellido_materno'],
                    'telefono' => $tutorado['telefono'],
                    'correo' => $tutorado['correo'],
                    'edad' => $tutorado['edad'],
                    'semestre' => $tutorado['semestre'],
                    'fecha_ingreso' => $tutorado['fecha_ingreso'],
                    'carrera' => $tutorado['carrera'],
                    'grupo' => $tutorado['grupo'],
                ]);
            } else {
                // Si no se encuentra al tutorado
                echo json_encode(['success' => false, 'message' => 'Tutorado no encontrado']);
            }
        } else {
            // Si hay un error en la ejecución de la consulta
            throw new Exception("Error al ejecutar la consulta: " . $stmt->error);
        }
    } else {
        // Si no se recibe matrícula en la solicitud
        echo json_encode(['success' => false, 'message' => 'Matrícula no proporcionada']);
    }

    // Cerrar la conexión
    $stmt->close();
    $conn->close();

} catch (Exception $e) {
    // Si ocurre algún error, devolver el mensaje de error
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
