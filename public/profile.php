<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json');

// Enable error reporting for debugging purposes
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'db.php'; // Include your database connection file

session_start();

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["error" => "User not logged in"]);
    exit();
}

$user_id = $_SESSION['user_id'];

$response = [];

// Check the request method to determine what action to take
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Handle GET request: Fetch user data
    $query = "SELECT Voter_Name AS name, Voter_Surname AS surname, Voter_Email AS email, SA_ID AS idNumber, Address AS address, City AS city, PostalCode AS postalCode, Province AS province FROM Voter WHERE id = ?";
    $stmt = $conn->prepare($query);
    if ($stmt === false) {
        echo json_encode(["error" => "Failed to prepare statement: " . $conn->error]);
        exit();
    }
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $userData = $result->fetch_assoc();

    if ($userData) {
        echo json_encode($userData);
    } else {
        echo json_encode(["error" => "No user data found"]);
    }
    exit();
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handle POST request: Update user data
    $input = json_decode(file_get_contents('php://input'), true);

    $query = "UPDATE Voter SET Voter_Name=?, Voter_Surname=?, Voter_Email=?, SA_ID=?, Address=?, City=?, PostalCode=? WHERE id=?";
    $stmt = $conn->prepare($query);
    if ($stmt === false) {
        echo json_encode(["error" => "Failed to prepare statement: " . $conn->error]);
        exit();
    }
    $stmt->bind_param("sssssssi", $input['name'], $input['surname'], $input['email'], $input['idNumber'], $input['address'], $input['city'], $input['postalCode'], $user_id);
    $result = $stmt->execute();

    if ($result) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => $conn->error]);
    }
    exit();
} else {
    // Handle other methods if needed
    http_response_code(405); // Method Not Allowed
    echo json_encode(["error" => "Method Not Allowed"]);
    exit();
}
?>
