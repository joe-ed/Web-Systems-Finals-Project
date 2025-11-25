<?php
if(!isset($_GET['id'])){
    header("Location: /System/Web-Systems-Finals-Project/FRONTEND/Admin_page.php");
    exit();
}

include "../BACKEND/Controller.php";

$controller = new Controller();
$user_get = $controller->take_info_by_id($_GET['id']);
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
        <form action="/System/Web-Systems-Finals-Project/BACKEND/Controller.php?method_finder=update" method="post" class="mb-4">
            <input type="hidden" value="<?=htmlspecialchars($user_get['id_number'])?>" name="id">

            <label for="fullName">Full Name:</label>
            <input type="text" value="<?= htmlspecialchars($user_get['full_name']) ?>"  name="newFullName">
            <label for="email">Email:</label>
            <input type="email" value="<?= htmlspecialchars($user_get['email']) ?>"  name="newEmail">
            <label for="role">Role:</label>
            <input type="text" value="<?= htmlspecialchars($user_get['role']) ?>"  name="newRole">
            <label for="course">Course:</label>
            <input type="text" value="<?= htmlspecialchars($user_get['course']) ?>"  name="newCourse">
            <label for="year">Year:</label>
            <input type="text" value="<?= htmlspecialchars($user_get['year']) ?>"  name="newYear">
            <label for="year">Section:</label>
            <input type="text" value="<?= htmlspecialchars($user_get['section']) ?>"  name="newSection">
        <button type="submit">Update</button>
    </form>
    
</body>
</html>