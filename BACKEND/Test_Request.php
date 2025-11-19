<?php

    // if(isset($_GET['submit_button'])){
    //     $first_name = $_GET['first_name'];

    //     echo $first_name;
    // }

    
    if(isset($_POST['submit_button'])){
        $first_name = $_POST['first_name'];
        $last_name = $_POST['last_name'];
        $middle_name = $_POST['middle_name'];
        echo $first_name. " ". $last_name ." ". $middle_name;
    }


?>