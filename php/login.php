<?php
header('Content-Type: application/json');
session_start();
require_once "conexion.php"; // Conexión a la base de datos

if (!$conn) {
    echo json_encode(["success" => false, "message" => "Error en la conexión a la base de datos."]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if (empty($username) || empty($password)) {
        echo json_encode(["success" => false, "message" => "Todos los campos son obligatorios."]);
        exit;
    }

    // Verificar si el usuario es un Administrador
    $sqlAdmin = "SELECT id_administrador, usuario, contrasena FROM administrador WHERE usuario = ?";
    $stmt = $conn->prepare($sqlAdmin);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $resultAdmin = $stmt->get_result();

    if ($resultAdmin->num_rows === 1) {
        $row = $resultAdmin->fetch_assoc();
        if ($password === $row['contrasena']) {
            $_SESSION['user_id'] = $row['id_administrador'];
            $_SESSION['role'] = 'admin';
            echo json_encode(["success" => true, "redirect" => "../html/MenuA.html"]);
            exit;
        } else {
            echo json_encode(["success" => false, "message" => "Contraseña incorrecta."]);
            exit;
        }
    }

    // Verificar si el usuario es un Tutor
    $sqlTutor = "SELECT num_empleado, e_mail FROM Tutor WHERE e_mail = ?";
    $stmt = $conn->prepare($sqlTutor);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $resultTutor = $stmt->get_result();

    if ($resultTutor->num_rows === 1) {
        $row = $resultTutor->fetch_assoc();
        if ($password === $row['num_empleado']) {
            $_SESSION['user_id'] = $row['num_empleado'];
            $_SESSION['role'] = 'tutor';
            echo json_encode(["success" => true, "redirect" => "../html/MenuB.html"]);
            exit;
        } else {
            echo json_encode(["success" => false, "message" => "Contraseña incorrecta."]);
            exit;
        }
    }

    // Si no se encontró en ninguna tabla
    echo json_encode(["success" => false, "message" => "El usuario no existe."]);
} else {
    echo json_encode(["success" => false, "message" => "Método no permitido."]);
}
?>
