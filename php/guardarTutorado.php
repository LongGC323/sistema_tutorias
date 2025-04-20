<?php
// Incluir el archivo de conexión a la base de datos
include 'conexion.php';

// Recibir los datos del formulario
$matricula = $_POST['matricula'];
$nombre = $_POST['Nombres'];
$apellido_paterno = $_POST['apellidoPaterno'];
$apellido_materno = $_POST['apellidoMaterno'];
$correo = $_POST['correo'];
$telefono = $_POST['telefono']; // Se recibe como string, ya que es varchar
$edad = $_POST['edad']; // Se recibe como string
$semestre = $_POST['semestre'];
$fecha_ingreso = $_POST['fechaRegistro']; // Usamos la fecha que se genera en el formulario
$carrera = $_POST['carrera'];

// Validar que los datos no estén vacíos
if (empty($matricula) || empty($nombre) || empty($apellido_paterno) || empty($apellido_materno) || empty($correo) || empty($telefono) || empty($edad) || empty($semestre) || empty($fecha_ingreso) || empty($carrera)) {
    echo "Todos los campos son obligatorios.";
    exit;
}

// Consulta SQL para insertar los datos en la tabla Tutorado
$sql = "INSERT INTO Tutorado (matricula, nombre, apellido_paterno, apellido_materno, correo, telefono, edad, semestre, fecha_ingreso, carrera) 
        VALUES ('$matricula', '$nombre', '$apellido_paterno', '$apellido_materno', '$correo', '$telefono', '$edad', '$semestre', '$fecha_ingreso', '$carrera')";

// Ejecutar la consulta
if ($conn->query($sql) === TRUE) {
    echo "Datos guardados correctamente";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Cerrar la conexión
$conn->close();
?>
