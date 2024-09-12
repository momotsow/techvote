<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Include db.php
include 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (!$data) {
    echo json_encode(["message" => "No data received"]);
    exit(0);
}

$name = $data->name;
$surname = $data->surname;
$idNumber = $data->idNumber;
$address = $data->address;
$province = $data->province;
$city = $data->city;
$postalCode = $data->postalCode;
$email = $data->email;
$password = password_hash($data->password, PASSWORD_BCRYPT); // Hash the password
$idFile = $data->idFile;

$stmt = $conn->prepare("INSERT INTO Voter (Voter_Name, Voter_Surname, SA_ID, Address, City, PostalCode, Province, Voter_Email, Voter_Password, id_file) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

if ($stmt === false) {
    echo json_encode(["message" => "Failed to prepare statement: " . $conn->error]);
    exit(0);
}

$stmt->bind_param("ssssssssss", $name, $surname, $idNumber, $address, $city, $province,  $postalCode, $email, $password, $idFile);

if ($stmt->execute()) {
    echo json_encode(["message" => "Registration successful"]);
} else {
    echo json_encode(["message" => "Registration failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
