<?php
require_once ("../db_config.php");

$dbname = "careerad_processed";

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


// sql to create table
$sql = "CREATE TABLE cat_";
$sql.=$category;
$sql.=" (
       id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
       URL VARCHAR(75) NOT NULL
        )";

// Table creation Query
if ($conn->query($sql) === TRUE) 
    echo "Table cat_" . $category . " created successfully\n";
     
// Insert URL     
$sql = "insert into cat_". $category . " VALUES (NULL, '" . $URL . "')" ;
 
if ($conn->query($sql) === TRUE) 
	echo "\nURL inserted !!\n";
 else 
   echo $conn->error;	

?>