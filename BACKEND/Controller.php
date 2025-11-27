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
    
    //main create func
     public function create(){
        $id_number = $_POST['idNumber'];
        $full_name = $_POST['fullName'];
        $email = $_POST['email'];
        $role = $_POST['userRole'];
        $course = $_POST['course'];
        $year = $_POST['schoolYear'];
        $section = $_POST['section'];
        
        if($this->dupeEmail($email)){
            echo "<script>alert('Duplicate Email Found'); window.history.back();</script>";
        exit();
    }
        
        $sql="INSERT INTO users (id_number, full_name, email, role, course, year, section ) VALUES(?, ?, ?, ?, ?, ?, ?)";
        $stmt = $this->connection->prepare($sql);
        $stmt->bind_param("issssss", $id_number,$full_name, $email, $role, $course, $year, $section);

        if($stmt->execute()){
            $location = "/System/Web-Systems-Finals-Project/FRONTEND/Admin_page.php?success=1";
            header("Location: $location");
            exit();
        }else{
            echo "Error!";
        }
    }

     //anti-dupe func
    public function dupeEmail($email) {
        
        $sql = "SELECT id_number FROM users WHERE email = ?";
        $stmt = $this->connection->prepare($sql);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

    
        return $result->num_rows > 0;
    }

    //display user counts per role+total users
    public function roleCount() {
    $sql = "SELECT role, COUNT(*) as total FROM users GROUP BY role";
    $stmt = $this->connection->prepare($sql);
    $stmt->execute();

    $result = $stmt->get_result();
    $counts = [
        'admin' => 0,
        'teacher' => 0,
        'student' => 0,
        'total' => 0
    ];

    while($row = $result->fetch_assoc()) {
        $role = $row['role'];
        if (isset($counts[$role])) {
            $counts[$role] = $row['total'];
        }
        $counts['total'] += $row['total'];
    }

    return $counts;
}
    //read in ascending order
      public function read_all(){
        $sql="SELECT * FROM users ORDER BY role ASC";
        $stmt = $this->connection->prepare($sql);
        $stmt->execute();

        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    //role filtering
    public function filter($role) {
        if ($role == "all"){
            return $this->read_all();
        }
        else{
            $sql = "SELECT * FROM users WHERE role = ? ORDER BY role ASC";
            $stmt = $this->connection->prepare($sql);
            $stmt->bind_param("s", $role);
        }
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);

    }

    //update func
    public function update(){
        $id = $_POST['id'];
        $updatedFullName = $_POST['newFullName'];
        $updatedEmail = $_POST['newEmail'];
        $updatedRole = $_POST['newRole'];
        $updatedCourse = $_POST['newCourse'];
        $updatedYear = $_POST['newYear'];
        $updatedSection = $_POST['newSection'];

        //if our id is not null
        if($id){
            $sql = "UPDATE users SET full_name = ?, email = ?, role = ?, course = ?, year = ?, section = ? WHERE id_number = ?";
            $stmt = $this->connection->prepare($sql);

            if($stmt){
                $stmt->bind_param("ssssssi", $updatedFullName, $updatedEmail, $updatedRole, $updatedCourse, $updatedYear, $updatedSection, $id);

                if($stmt->execute()){
                    $location = "/System/Web-Systems-Finals-Project/FRONTEND/Admin_page.php";
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
    

    //nab id for updating
    public function edit(){
        if(!isset($_GET['id']) || empty($_GET['id'])) {
            echo "No ID Found";
            return;
        }
        
        $id = $_GET['id'];
        $location = "/System/Web-Systems-Finals-Project/FRONTEND/Admin_page.php?id=" . urlencode($id);
        header("Location:$location");
        exit();
    }

   //fetch user info by id
   public function take_info_by_id($id_number){
        $sql = "SELECT * FROM users WHERE id_number = ?";
        $stmt = $this->connection->prepare($sql);
        
        if ($stmt) {
            
            $stmt->bind_param("i", $id_number);
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

    //delete function    
    public function delete(){
    if (!isset($_POST['id']) || empty($_POST['id'])) {
        echo "No ID provided.";
        return;
    }

    $id = intval($_POST['id']);

    $sql = "DELETE FROM users WHERE id_number = ?";
    $stmt = $this->connection->prepare($sql);

    if ($stmt) {
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            $LOCATION = "/System/Web-Systems-Finals-Project/FRONTEND/Admin_page.php";
            header("Location: $LOCATION");
            exit();
        } else {
            echo "Error executing delete query.";
        }
    } else {
        echo "Failed to prepare delete statement.";
    }
}

    //login page func test
    //register
    public function register($idnumber, $email, $password, $role){
        

    }
    
}


$controller  = new Controller();
$controller->actionreader();


//kasano ag php potang ina 

?>