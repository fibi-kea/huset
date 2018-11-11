<?php
    $navn=$_REQUEST['navn'];
	$email=$_REQUEST['email'];
    $gem="$navn $email \n";
    file_put_contents("nyhedsbrevliste.txt", $gem, FILE_APPEND);
    echo "Mange tak, $navn, nu er du tilmeldt";
?>
