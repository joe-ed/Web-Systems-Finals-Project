<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="../ASSETS/LogIn_Page.css">
  <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>
<body>
  <header>
    <a href="logo" class="logo">Logo</a>
    <nav>
      <a href="#">Home</a>
      <a href="#">About</a>
      <a href="#">Contact</a>
    </nav>

    <div class="login-form">
      <button type="button" class="login-button">LogIn</button>
    </div>
  </header>

  <section class="video-section">
    <video autoplay muted loop class="bg-video">
      <source src="../ASSETS/videoplayback.mp4" type="video/mp4">
      Video Background.
    </video>
  </section>

  <div class="login">
    <button type="button" class="X"><i class='bx bx-x'></i></button>

    <div class="form-box">
      <h2>Log In</h2>
      <form action="">
        <div class="user">
          <input type="text" name="IDnumber" placeholder="ID Number" required>
          <i class='bx bx-id-card'></i>
        </div>
        <div class="user">
          <input type="password" name="password" placeholder="Password" required>
          <i class='bx bx-lock'></i> 
        </div>
        <div class="user">
          <select name="role" required>
            <option value="" disabled selected>Select Role</option>
            <option value="student">Student</option>
            <option value="teaching">Teaching Personnel</option>
            <option value="admin">Admin</option>
          </select>
          <i class='bx bx-chevron-down'></i>
        </div>
        <div class="user extra-options">
          <label>
            <input type="checkbox" name="remember">
            Remember Me
          </label>
          <a href="#">Forgot Password?</a>
        </div>
        <button type="submit" name="login-btn" class="btn">LogIn</button>
        <p>Don't have an account?<a href="#" class="register_link">Register</a></p>
      </form>
    </div>

    <div class="form-box register">
      <h2>Register</h2>
      <form action="">
        <div class="user">
          <input type="text" name="IDnumber" placeholder="ID Number" required>
          <i class='bx bx-id-card'></i>
        </div>
        <div class="user">
          <input type="email" name="email" placeholder="Email" required>
          <i class='bx bx-envelope'></i>
        </div>
        <div class="user">
          <input type="password" name="password" placeholder="Password" required>
          <i class='bx bx-lock-open'></i> 
        </div>
        <div class="user">
          <input type="password" name="password" placeholder="Confirm Password" required>
          <i class='bx bx-lock'></i> 
        </div>
        <div class="user">
          <select name="role" required>
            <option class="option" value="" disabled selected>Select Role</option>
            <option class="option" value="student">Student</option>
            <option class="option" value="teaching">Teaching Personnel</option>
            <option class="option" value="admin">Admin</option>
          </select>
          <i class='bx bx-chevron-down'></i>
        </div>
        <button type="submit" name="register-btn" class="btn">Register</button>
        <p>Already have an account?<a href="#" class="login_link">LogIn</a></p>
      </form>
    </div>
  </div>

  <script src="../ASSETS/LogIn_Page.js"></script>
</body>
</html>
