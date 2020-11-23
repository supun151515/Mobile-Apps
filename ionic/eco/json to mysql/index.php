<?php $dbname = 'slimapp';
$user = 'root';
$password = 'supun123';
try{
$con = new PDO("mysql:host=localhost; dbname=".$dbname."; charset=utf8", $user, $password);
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

error_reporting(E_ALL);
ini_set('display_errors', 'On');
}catch(PDOException $e){
echo $e->getMessage();
die();
}
// echo getcwd();
$strJsonFileContents = file_get_contents("json.json");
$array = json_decode($strJsonFileContents, true);

$smt_insert = $con->prepare("INSERT INTO cities (country, city) VALUES(:Country, :City);");


foreach($array as $obj) {
    unset($obj['Hide']);
    print_r($obj);
	$result = $smt_insert->execute($obj);
}
?>