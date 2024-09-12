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

$id = $data->Voter_ID; // Ensure id is included in the incoming data
$name = $data->name;
$surname = $data->surname;
$idNumber = $data->idNumber;
$address = $data->address;
$province = $data->province;
$city = $data->city;
$postalCode = $data->postalCode;
$email = $data->email;

// Debugging: Check incoming data
file_put_contents('php://stderr', print_r($data, TRUE));

$stmt = $conn->prepare("UPDATE Voter SET Voter_Name = ?, Voter_Surname = ?, SA_ID = ?, Address = ?, City = ?, PostalCode = ?, Voter_Email = ? WHERE Voter_ID = ?");
if ($stmt === false) {
    echo json_encode(["message" => "Failed to prepare statement: " . $conn->error]);
    exit(0);
}

// Debugging: Check SQL statement
file_put_contents('php://stderr', "SQL Statement: UPDATE Voter SET Voter_Name = '$name', Voter_Surname = '$surname', SA_ID = '$idNumber', Address = '$address', Province = '$province', City = '$city', PostalCode = '$postalCode', Voter_Email = '$email' WHERE Voter_ID = '$id'\n");

$stmt->bind_param("ssssssss", $name, $surname, $idNumber, $address, $province, $city, $postalCode, $email);

if ($stmt->execute()) {
    echo json_encode(["user" => $data, "message" => "Profile updated successfully"]);
} else {
    echo json_encode(["message" => "Profile update failed: " . $stmt->error]);
}

// Debugging: Check execution result
file_put_contents('php://stderr', "Statement executed: " . ($stmt->affected_rows > 0 ? "Success" : "No rows affected") . "\n");

$stmt->close();
$conn->close();
?>
