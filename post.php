<?php

$db_host="localhost";
$db_user="root";
$db_password="";
$db_name = "sync_offline";

$con=mysqli_connect ($db_host, $db_user, $db_password) or die ("tidak bisa connect");
mysqli_select_db ($con,$db_name) or die ("salah db");

$data0 = file_get_contents('php://input'); // Don't forget the encoding
$data = json_decode($data0);
$pos_trx_id= 0 + $data->pos_trx_id;
$item_id= 0 + $data->item_id;
$qty= 0 + $data->qty;

$sql="INSERT INTO pos_trx SET pos_trx_id=$pos_trx_id, item_id=$item_id, qty=$qty";    
mysqli_query($con,$sql) or die("GAGAL");
echo "oke";
