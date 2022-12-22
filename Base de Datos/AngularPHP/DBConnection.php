<?php
function returnConection(){
    $con = mysqli_connect("localhost","root","","minisuper_gya");
    return $con;
}