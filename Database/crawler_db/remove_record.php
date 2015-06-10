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

// URL
$URL =  $_GET["url"];
//echo $URL;

     
// Removal URL     
$sql = "delete from cat_". $category . " WHERE URL=" . $URL . "')" ;
 
if ($conn->query($sql) === TRUE) 
	echo "\nURL Deleted !!\n";
 else 
   echo $conn->error;	

?>