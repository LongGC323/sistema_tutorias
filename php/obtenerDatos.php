<?php
// Conexión a la base de datos
include 'conexion.php';

// Obtener semestres
$sql_semestres = "SELECT id, nombre FROM semestres";
$resultadosemestres = $conn->query($sql_semestres);
$semestres = [];
while ($row = $resultadosemestres->fetch_assoc()) {
    $semestres[] = $row;
}

// Obtener Carrera
$sql_carreras = "SELECT id, nombre FROM carreras";
$resultadocarreras = $conn->query($sql_carreras);
$carreras = [];
while ($row = $resultadocarreras->fetch_assoc()) {
    $carreras[] = $row;
}

//  Devolver los datos en formato JSON
echo json_encode([
    "semestres" => $semestres,
    "carreras" => $carreras
]);
?>
