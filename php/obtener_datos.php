<?php
include 'conexion.php'; // Asegúrate de que tienes este archivo con la conexión a la BD

// Obtener grados de estudio
$sql_grados = "SELECT id, nombre FROM grado_estudio";
$result_grados = $conn->query($sql_grados);
$grados = [];
while ($row = $result_grados->fetch_assoc()) {
    $grados[] = $row;
}

// Obtener unidades de estudio
$sql_unidades = "SELECT id, nombre FROM unidad_estudio";
$result_unidades = $conn->query($sql_unidades);
$unidades = [];
while ($row = $result_unidades->fetch_assoc()) {
    $unidades[] = $row;
}

// Devolver datos en formato JSON
echo json_encode([
    "grados" => $grados,
    "unidades" => $unidades
]);

$conn->close();
?>
