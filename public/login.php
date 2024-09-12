<?php
// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Database configuration
include 'db.php';

$input = file_get_contents("php://input");
$data = json_decode($input);

if (!isset($data->email) || !isset($data->password)) {
    echo json_encode(["success" => false, "message" => "Email and password required"]);
    exit(0);
}

$email = $data->email;
$password = $data->password;

$stmt = $conn->prepare("SELECT Voter_ID, Voter_Password, Voter_Name, Voter_Surname, SA_ID, Address, City, PostalCode, Province FROM Voter WHERE Voter_Email = ?");
if ($stmt === false) {
    echo json_encode(["success" => false, "message" => "Failed to prepare statement: " . $conn->error]);
    exit(0);
}

$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->bind_result($id, $hashedPassword, $name, $surname, $idNumber, $address, $city, $postalCode, $province);
$stmt->fetch();
$stmt->close();

if ($hashedPassword && password_verify($password, $hashedPassword)) {
    echo json_encode([
        "success" => true,
        "user" => [
            "email" => $email,
            "name" => $name,
            "surname" => $surname,
            "idNumber" => $idNumber,
            "address" => $address,
            "city" => $city,
            "postalCode" => $postalCode,
            "province" => $province,
            "Voter_ID" => $id
        ]
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Invalid email or password"]);
}

$conn->close();
?>