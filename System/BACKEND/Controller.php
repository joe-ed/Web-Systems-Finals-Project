<?php

class Controller{
    private $connection;

    public function __construct(){
        $this->connection = $this->create_connection();
    }

    public function create_connection(){
        // Server name , User , password, database name
        if(!defined('DB_HOST')){
            define('DB_HOST', 'localhost');
        }

        if(!defined('DB_USER')){
            define('DB_USER', 'root');
        }

        if(!defined('DB_PASS')){
            define('DB_PASS', '');
        }

        if(!defined('DB_NAME')){
            define('DB_NAME', 'dorencio_university');
        }
        //the actual connection
        $connection = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

        if($connection->connect_error){
            die("Connection Failed" .$connection->connect_error);
        }

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
            elseif($action === 'create_user'){
                $this->create_user();
            }
            elseif($action === 'get_users'){
                $this->get_users();
            }
            elseif($action === 'delete_user'){
                $this->delete_user();
            }
            elseif($action === 'login'){
                $this->login();
            }
            elseif($action === 'register_request'){
                $this->register_request();
            }
            elseif($action === 'get_registration_requests'){
                $this->get_registration_requests();
            }
            elseif($action === 'approve_registration'){
                $this->approve_registration();
            }
            elseif($action === 'reject_registration'){
                $this->reject_registration();
            }
        }
    }

    /* ================= REGISTRATION REQUEST METHODS ================= */
    
    public function register_request(){
        $id_number = $_POST['id_number'] ?? '';
        $first_name = $_POST['first_name'] ?? '';
        $middle_name = $_POST['middle_name'] ?? '';
        $last_name = $_POST['last_name'] ?? '';
        $email = $_POST['email'] ?? '';
        $role = $_POST['role'] ?? '';
        $course = $_POST['course'] ?? '';
        $year = $_POST['year'] ?? '';
        $section = $_POST['section'] ?? '';
        $password = $_POST['password'] ?? '';
        
        // Validate required fields
        if (empty($id_number) || empty($first_name) || empty($last_name) || empty($email) || empty($role) || empty($password)) {
            echo json_encode(['success' => false, 'message' => 'All required fields must be filled']);
            return;
        }
        
        // Check if ID number or email already exists in users table
        $check_sql = "SELECT id FROM users WHERE id_number = ? OR email = ?";
        $check_stmt = $this->connection->prepare($check_sql);
        $check_stmt->bind_param("ss", $id_number, $email);
        $check_stmt->execute();
        $check_result = $check_stmt->get_result();
        
        if ($check_result->num_rows > 0) {
            echo json_encode(['success' => false, 'message' => 'ID number or email already exists']);
            return;
        }
        
        // Check if there's already a pending request
        $check_request_sql = "SELECT id FROM registration_requests WHERE id_number = ? AND status = 'pending'";
        $check_request_stmt = $this->connection->prepare($check_request_sql);
        $check_request_stmt->bind_param("s", $id_number);
        $check_request_stmt->execute();
        $check_request_result = $check_request_stmt->get_result();
        
        if ($check_request_result->num_rows > 0) {
            echo json_encode(['success' => false, 'message' => 'Registration request already pending approval']);
            return;
        }
        
        // Hash password
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        
        $sql = "INSERT INTO registration_requests (id_number, first_name, middle_name, last_name, email, role, course, year, section, password, status) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')";
        
        $stmt = $this->connection->prepare($sql);
        
        if (!$stmt) {
            echo json_encode(['success' => false, 'message' => 'Database error: ' . $this->connection->error]);
            return;
        }
        
        $stmt->bind_param("ssssssssss", $id_number, $first_name, $middle_name, $last_name, $email, $role, $course, $year, $section, $hashed_password);
        
        if($stmt->execute()){
            echo json_encode(['success' => true, 'message' => 'Registration request submitted. Waiting for admin approval.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error submitting request: ' . $stmt->error]);
        }
        
        $stmt->close();
    }

    public function get_registration_requests(){
        $sql = "SELECT * FROM registration_requests WHERE status = 'pending' ORDER BY requested_at DESC";
        $stmt = $this->connection->prepare($sql);
        $stmt->execute();
        
        $result = $stmt->get_result();
        $requests = $result->fetch_all(MYSQLI_ASSOC);
        
        echo json_encode($requests);
    }

    public function approve_registration(){
        $request_id = $_POST['request_id'] ?? '';
        $approved_by = 1; // This should be the actual admin ID from session
        
        if (empty($request_id)) {
            echo json_encode(['success' => false, 'message' => 'Request ID is required']);
            return;
        }
        
        // Get the request details
        $get_sql = "SELECT * FROM registration_requests WHERE id = ?";
        $get_stmt = $this->connection->prepare($get_sql);
        $get_stmt->bind_param("i", $request_id);
        $get_stmt->execute();
        $request = $get_stmt->get_result()->fetch_assoc();
        
        if (!$request) {
            echo json_encode(['success' => false, 'message' => 'Request not found']);
            return;
        }
        
        // Insert into users table
        $insert_sql = "INSERT INTO users (id_number, first_name, middle_name, last_name, email, role, course, year, section, password, status) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')";
        $insert_stmt = $this->connection->prepare($insert_sql);
        $insert_stmt->bind_param("ssssssssss", 
            $request['id_number'], 
            $request['first_name'], 
            $request['middle_name'], 
            $request['last_name'], 
            $request['email'], 
            $request['role'], 
            $request['course'], 
            $request['year'], 
            $request['section'], 
            $request['password']
        );
        
        if ($insert_stmt->execute()) {
            // Update request status
            $update_sql = "UPDATE registration_requests SET status = 'approved', approved_at = NOW(), approved_by = ? WHERE id = ?";
            $update_stmt = $this->connection->prepare($update_sql);
            $update_stmt->bind_param("ii", $approved_by, $request_id);
            $update_stmt->execute();
            
            echo json_encode(['success' => true, 'message' => 'User approved successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error approving user: ' . $insert_stmt->error]);
        }
    }

    public function reject_registration(){
        $request_id = $_POST['request_id'] ?? '';
        
        if (empty($request_id)) {
            echo json_encode(['success' => false, 'message' => 'Request ID is required']);
            return;
        }
        
        $sql = "UPDATE registration_requests SET status = 'rejected' WHERE id = ?";
        $stmt = $this->connection->prepare($sql);
        $stmt->bind_param("i", $request_id);
        
        if($stmt->execute()){
            echo json_encode(['success' => true, 'message' => 'Registration request rejected']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error rejecting request: ' . $stmt->error]);
        }
    }

    /* ================= USER MANAGEMENT METHODS ================= */

    public function create_user(){
        $id_number = $_POST['id_number'] ?? '';
        $first_name = $_POST['first_name'] ?? '';
        $middle_name = $_POST['middle_name'] ?? '';
        $last_name = $_POST['last_name'] ?? '';
        $email = $_POST['email'] ?? '';
        $role = $_POST['role'] ?? '';
        $course = $_POST['course'] ?? '';
        $year = $_POST['year'] ?? '';
        $section = $_POST['section'] ?? '';
        $password = $_POST['password'] ?? '';
        $status = 'active';

        // Validate required fields
        if (empty($id_number) || empty($first_name) || empty($last_name) || empty($email) || empty($role)) {
            echo json_encode(['success' => false, 'message' => 'All required fields must be filled']);
            return;
        }

        // Hash password
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        $sql = "INSERT INTO users (id_number, first_name, middle_name, last_name, email, role, course, year, section, password, status) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        $stmt = $this->connection->prepare($sql);
        
        if (!$stmt) {
            echo json_encode(['success' => false, 'message' => 'Database error: ' . $this->connection->error]);
            return;
        }

        $stmt->bind_param("sssssssssss", $id_number, $first_name, $middle_name, $last_name, $email, $role, $course, $year, $section, $hashed_password, $status);

        if($stmt->execute()){
            echo json_encode(['success' => true, 'message' => 'User created successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error creating user: ' . $stmt->error]);
        }
        
        $stmt->close();
    }

    public function get_users(){
        $sql = "SELECT * FROM users ORDER BY created_at DESC";
        $stmt = $this->connection->prepare($sql);
        $stmt->execute();
        
        $result = $stmt->get_result();
        $users = $result->fetch_all(MYSQLI_ASSOC);
        
        echo json_encode($users);
    }

    public function delete_user(){
        $id = $_GET['id'];
        
        $sql = "DELETE FROM users WHERE id = ?";
        $stmt = $this->connection->prepare($sql);
        $stmt->bind_param("i", $id);

        if($stmt->execute()){
            echo json_encode(['success' => true, 'message' => 'User deleted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error deleting user: ' . $stmt->error]);
        }
    }

    /* ================= LOGIN METHOD ================= */

    public function login(){
    $id_number = $_POST['id_number'];
    $password = $_POST['password'];
    $role = $_POST['role'];

    $sql = "SELECT * FROM users WHERE id_number = ? AND role = ? AND status = 'active'";
    $stmt = $this->connection->prepare($sql);
    $stmt->bind_param("ss", $id_number, $role);
    $stmt->execute();
    
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if($user && password_verify($password, $user['password'])){
        session_start();
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_role'] = $user['role'];
        $_SESSION['user_name'] = $user['first_name'] . ' ' . $user['last_name'];
        $_SESSION['user_id_number'] = $user['id_number'];
        
        echo json_encode(['success' => true, 'message' => 'Login successful', 'user' => $user]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid credentials or account not approved']);
    }
}
    /* ================= EXISTING METHODS (Keep these from your original) ================= */

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
                    $location = "../FRONTEND/homepage.php";
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
        $location = "../BACKEND/Update_Page.php?id=" . urlencode($id);
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
            $LOCATION = "../FRONTEND/homepage.php";
            header("Location:$LOCATION");
            exit();
         }
        } 
    }

    public function create(){
        $first_name = $_POST['first_name'];
        $middle_name = $_POST['middle_name'];
        $last_name = $_POST['last_name'];

        //connection and adding
        //INSERT STATEMENT FORM SQL
        $sql="INSERT INTO users (last_name, first_name, middle_name) VALUES(?, ?, ?)";
        $stmt = $this->connection->prepare($sql);
        $stmt->bind_param("sss", $last_name, $first_name, $middle_name);

        if($stmt->execute()){
            $LOCATION = "../FRONTEND/homepage.php";
            header("Location:$LOCATION?success=1");
            exit();
        }else{
            echo "Error!";
        }
    }
}

$controller = new Controller();
$controller->actionreader();

?>