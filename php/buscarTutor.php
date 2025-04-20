<?php
header('Content-Type: application/json');
include 'conexion.php'; // Conexión a la base de datos

// Leer la entrada JSON
$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Verificar si el número de empleado fue recibido
if (!isset($data['num_empleado'])) {
    echo json_encode(["success" => false, "message" => "Falta el número de empleado."]);
    exit;
}

$num_empleado = $data['num_empleado'];

// Preparar y ejecutar la consulta SQL
$stmt = $conn->prepare("SELECT * FROM Tutor WHERE num_empleado = ?");
$stmt->bind_param("s", $num_empleado);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $tutor = $result->fetch_assoc();
    echo json_encode([
        "success" => true,
        "nombre" => $tutor['nombre'],
        "apellido_paterno" => $tutor['a_paterno'],
        "apellido_materno" => $tutor['a_materno'],
        "telefono" => $tutor['num_telefonico'],
        "correo" => $tutor['e_mail'],
        "unidad" => $tutor['unidad']
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Tutor no encontrado."]);
}

$stmt->close();
$conn->close();
?>
