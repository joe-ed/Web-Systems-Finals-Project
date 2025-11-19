<?php

class Controller{
    private $connection;


    public function __construct(){
        $this->connection = $this->create_connection();
    }

    public function create_connection(){
        // Server name , User , password, database name
        if(!defined('DB_HOST')){
            define('DB_HOST', '127.0.0.1');
        }

        if(!defined('DB_USER')){
            define('DB_USER', 'root');
        }

        if(!defined('DB_PASS')){
            define('DB_PASS', '');
        }

        if(!defined('DB_NAME')){
            define('DB_NAME', 'test');
        }
        //the actual connection
        $connection = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME, 3306);

        if($connection->connect_error){
            die("Connection Failed" .$connection->connect_error);
        }

        echo"<script> console.log('There was a Connection'); </script>";
        return $connection;
    }

    public function read_all(){
        $sql="SELECT * FROM users";
        $stmt = $this->connection->prepare($sql);
        $stmt->execute();

        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function actionreader(){
        if(isset($_GET['method_finder'])){
            $action = $_GET['method_finder'];

            if($action === 'create'){
                $this->create();
            }
            elseif($action === 'delete'){
                $this->delete();
            }
            elseif($action === 'edit'){
                $this->edit();
            }
            elseif($action === 'update'){
                $this->update();
            }
        }
    }

    public function update(){
        $id = $_POST['id'];
        $new_first_name = $_POST['new_first_name'];
        $new_middle_name = $_POST['new_middle_name'];
        $new_last_name = $_POST['new_last_name'];

        //if our id is not null
        if($id){
            $sql = "UPDATE users SET first_name = ?, middle_name = ?, last_name = ? WHERE id = ?";
            $stmt = $this->connection->prepare($sql);

            if($stmt){
                $stmt->bind_param("sssi", $new_first_name, $new_middle_name, $new_last_name, $id);

                if($stmt->execute()){
                    $location = "/System/FrontEnd/homepage.php";
                    header("Location:$location");
                    exit();
                }
                else{
                    echo "there was an error during the execution";
                }
            }
            else{
                echo "the statement is not correct";
            }
        }
        else{
            echo "No ID Found";
        }
    }
    public function edit(){
        if(!isset($_GET['id']) || empty($_GET['id'])) {
            echo "No ID Found";
            return;
        }
        
        $id = $_GET['id'];
        $location = "/System/BackEnd/Update_Page.php?id=" . urlencode($id);
        header("Location:$location");
        exit();
    }

    public function take_info_by_id($id){
        $sql = "SELECT * FROM users WHERE id = ?";
        $stmt = $this->connection->prepare($sql);
        
        if ($stmt) {
            
            $stmt->bind_param("i", $id);
            if($stmt->execute()){
                $result = $stmt->get_result();
                return $result->fetch_assoc();
            }else{
                echo "failed to fetch the user information";
            }
        }
        else{
            echo "the statement / connection is wrong";
        }
    }

    public function delete(){
        $id = $_GET['id'];
        echo $id;

        $id = intval($_GET['id']);

        $sql = "DELETE FROM users WHERE id = ?";
        $stmt = $this->connection->prepare($sql);

        if($stmt){
         $stmt ->bind_param("i", $id);

         if($stmt->execute()){
            $LOCATION = "/System/FrontEnd/homepage.php";
            header("Location:$LOCATION");
            exit();
         }
        } 
    }

    public function create(){

        $full_name = $_POST['fullName'];
        $email = $_POST['email'];
        $role = $_POST['userRole'];
        $course = $_POST['course'];
        $year = $_POST['schoolYear'];
        $section = $_POST['section'];
        

        //connection and adding
        //INSERT STATEMENT FORM SQL
        $sql="INSERT INTO users (full_name, email, role, course, year, section ) VALUES(?, ?, ?, ?, ?, ?)";
        $stmt = $this->connection->prepare($sql);
        $stmt->bind_param("ssssss", $full_name, $email, $role, $course, $year, $section);

        if($stmt->execute()){
            $location = "/System/Web-Systems-Finals-Project/FRONTEND/Admin_page.php?success=1";
            header("Location: $location");
            exit();
        }else{
            echo "Error!";
        }
    }
    
}


$controller  = new Controller();
$controller->actionreader();


//kasano ag php potang ina 

?>