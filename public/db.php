<?php
// Fetch database configuration from environment variables
$servername = "190.92.159.105";
$username = "techvote_elecvoad";
$password = "^*&(V%&^*bvhieuiw3hfi3y83";
$dbname = "techvote_elecvo";

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Close the connection when done
// $conn->close();
?>
