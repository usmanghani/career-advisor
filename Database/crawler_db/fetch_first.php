<?php
require_once ("../db_config.php");

$dbname = "careerad_crawler";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

// Category
$category = $_GET["cat"];

$sql = "SELECT * FROM cat_".$category;
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        echo "result: " . $row["URL"]. "<br>";
    }
} else {
    echo "0 results";
}

mysqli_close($conn);



?>