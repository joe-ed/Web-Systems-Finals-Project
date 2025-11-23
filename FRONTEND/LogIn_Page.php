<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Login Page</title>
<link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet">
<link rel="stylesheet" href="../ASSETS/LogIn_Page.css">
</head>
<body>

<header>
  <a href="#" class="logo">Logo</a>
  <nav>
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Contact</a>
  </nav>
  <button class="login-button">Login</button>
</header>

<!-- Modal -->
<div class="modal" id="mainModal">
  <div class="modal-content">
    <i class='bx bx-x close-btn'></i>

    <!-- LOGIN VIEW -->
    <div id="loginView" class="modal-view active">
      <h2>Login</h2>
      <input type="text" placeholder="ID Number">
      <input type="email" placeholder="Email">
      <select>
        <option value="">Select Role</option>
        <option value="teacher">Teacher</option>
        <option value="student">Student</option>
        <option value="admin">Admin</option>
      </select>
      <button id="loginBtn">Login</button>
      <a id="forgotLink">Forgot Password?</a>
    </div>

    <!-- FORGOT PASSWORD VIEW -->
    <div id="forgotView" class="modal-view">
      <h2>Forgot Password</h2>
      <input type="email" placeholder="Email">

      <!-- Submit Code (always shown) -->
      <div id="submitCodeContainer">
        <input type="text" placeholder="Enter Code">
        <button id="submitCodeBtn">Submit Code</button>
      </div>

      <div id="countdown"></div>
      <button id="sendCodeBtn">Send Code</button>
      <a id="backToLogin">Go back to Login</a>
    </div>

    <!-- ADMIN RESET MESSAGE VIEW -->
    <div id="resetView" class="modal-view">
      <h2>Wait for Admin</h2>
      <p>Your password has not been reset yet. Please wait for the admin to reset it.</p>
      <div id="submitCodeContainer">
        <input type="text" placeholder="Enter Code">
        <button id="submitCodeBtn">Submit Code</button>
      </div>
      <button id="sendCodeBtn">Send Code</button>
      <a id="backToLogin">Go back to Login</a>
    </div>

  </div>
</div>

<script src="../ASSETS/LogIn_Page.js"></script>
</body>
</html>
