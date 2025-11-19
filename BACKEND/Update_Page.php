<?php
if(!isset($_GET['id'])) {
    header("Location: /System/FrontEnd/homepage.php");
    exit();
}
$id = $_GET['id'];

include "Controller.php";

$controller = new Controller();
$user_get = $controller->take_info_by_id($id);

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/System/Assets/bootstrap-5.3.8-dist/bootstrap-5.3.8-dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="/System/Assets/css/styles.css">
    <link rel="stylesheet" href="/System/Assets/css/animations.css">
    <script src="/System/Assets/js/animations.js" defer></script>
    <title>Update User</title>
</head>
<body>
    <!-- Loading Overlay -->
    <div id="loadingOverlay">
        <img src="/System/Assets/images/loading_icon.gif" alt="Loading..." />
    </div>

    <!-- Logo -->
    <div class="logo-container">
        <img src="/System/Assets/images/logo.webp" alt="Logo" class="logo">
    </div>

    <!-- Main Content -->
    <div class="floating-window">
        <h2 class="text-center mb-4">Update User</h2>
        <form action="/System/BackEnd/Controller.php?method_finder=update" method="post" class="mb-4">
        <input type="hidden" value="<?=htmlspecialchars($user_get['id'])?>" name="id">

        <label for="first_name">First Name:</label>
        <input type="text" value="<?= htmlspecialchars($user_get['first_name']) ?>"  name="new_first_name">
        <label for="middle_name">Middle Name:</label>
        <input type="text" value="<?= htmlspecialchars($user_get['middle_name']) ?>"  name="new_middle_name">
        <label for="last_name">Last Name:</label>
        <input type="text" value="<?= htmlspecialchars($user_get['last_name']) ?>"  name="new_last_name">

        <button type="submit">Update</button>
    </form>
    
</body>
</html>