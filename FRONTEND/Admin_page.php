<?php
include("../BACKEND/Controller.php");
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <link rel="stylesheet" href="../ASSETS/Admin_Page.css">
    <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet">
</head>

<body>

    <!-- Background Logo -->
    <div class="body-logo"></div>

    <!-- ================= HEADER ================= -->
    <header>
        <div class="center-header-section">
            <img src="../ASSETS/logo.png" class="header-logo-img" alt="Logo">
        </div>
        <div class="right-header-section">
            <i class="bx bx-cog settings-icon" id="settingsIcon"></i>
            <div class="dropdown-menu" id="settingsDropdown">
                <span class="dropdown-item" id="changePasswordBtn">Change Your Password</span>
                <span class="dropdown-item" id="logoutBtn">Logout</span>
            </div>
        </div>
    </header>

    <!-- ================= SIDEBAR ================= -->
    <aside class="left-sidebar-menu" id="sidebarMenu">
        <div class="sidebar-profile-section">
            <div class="sidebar-profile-picture-wrapper">
                <img src="../ASSETS/UserIconPic.jfif" class="profile-picture">
                <i class='bx bxs-camera profile-picture-camera-icon'></i>
            </div>
            <span class="sidebar-profile-name">Admin Name</span>
            <span class="sidebar-admin-id">ID-00001</span>
        </div>

        <!-- Sidebar Navigation -->
        <div class="menu-item">
            <a class="nav-link active" data-target="dashboardSection">
                <i class='bx bxs-dashboard'></i>
                <span class="link-text">Dashboard</span>
            </a>
        </div>
        <div class="menu-item">
            <a class="nav-link" data-target="usersSection">
                <i class='bx bxs-user-detail'></i>
                <span class="link-text">Users</span>
            </a>
        </div>
        <div class="menu-item">
            <a class="nav-link" data-target="requestsSection">
                <i class='bx bxs-lock-alt'></i>
                <span class="link-text">Requests</span>
            </a>
        </div>
        <div class="menu-item">
            <a class="nav-link" data-target="messagesSection">
                <i class='bx bxs-message-dots'></i>
                <span class="link-text">Messages</span>
            </a>
        </div>

        <!-- Sidebar Toggle -->
        <div class="sidebar-toggle-button" id="toggleSidebar">
            <i class='bx bx-left-arrow-alt'></i>
        </div>
    </aside>

    <!-- ================= MAIN CONTENT ================= -->
    <main class="main-dashboard-content" id="mainContent">

        <!-- DASHBOARD SECTION -->
        <section id="dashboardSection" class="content-section">
            <h1>Dashboard</h1>

            <!-- Notifications Container -->
            <div id="dashboardNotifications" class="dashboard-notifications">
                <!-- Dashboard notifications will populate here dynamically -->
            </div>
        </section>

        <!-- USERS SECTION -->
        <section id="usersSection" class="content-section users-section" style="display:none;">
            <h1 class="section-title">Manage Users</h1>

            <!-- Role Tabs + Sections Dropdown -->
            <div class="users-tabs-container">
                <div class="users-tabs">
                    <button class="tab-button" data-role="admin">Admin</button>
                    <button class="tab-button" data-role="teacher">Teacher</button>
                    <button class="tab-button" data-role="student">Student</button>
                </div>
                <select id="classSectionSelect" disabled style="opacity:0.5;">
                    <option value="all" selected>All Sections</option>
                    <option value="BSIT-1A">BSIT 1A</option>
                    <option value="BSIT-1B">BSIT 1B</option>
                    <option value="BSIT-2A">BSIT 2A</option>
                    <option value="BSIT-2B">BSIT 2B</option>
                    <option value="BSIT-3A">BSIT 3A</option>
                    <option value="BSIT-3B">BSIT 3B</option>
                    <option value="BSIT-4A">BSIT 4A</option>
                    <option value="BSIT-4B">BSIT 4B</option>
                    <option value="BSDC-1A">BSDC 1A</option>
                    <option value="BSDC-1B">BSDC 1B</option>
                    <option value="BSDC-2A">BSDC 2A</option>
                    <option value="BSDC-2B">BSDC 2B</option>
                    <option value="BSDC-3A">BSDC 3A</option>
                    <option value="BSDC-3B">BSDC 3B</option>
                    <option value="BSDC-4A">BSDC 4A</option>
                    <option value="BSDC-4B">BSDC 4B</option>
                    <option value="BLIS-1A">BLIS 1A</option>
                    <option value="BLIS-1B">BLIS 1B</option>
                    <option value="BLIS-2A">BLIS 2A</option>
                    <option value="BLIS-2B">BLIS 2B</option>
                    <option value="BLIS-3A">BLIS 3A</option>
                    <option value="BLIS-3B">BLIS 3B</option>
                    <option value="BLIS-4A">BLIS 4A</option>
                    <option value="BLIS-4B">BLIS 4B</option>
                </select>
            </div>

            <!-- Summary Cards -->
            <div class="summary-cards">
                <div class="card"><h3>Total Admin</h3><p id="totalAdmin">0</p></div>
                <div class="card"><h3>Total Teachers</h3><p id="totalTeachers">0</p></div>
                <div class="card"><h3>Total Students</h3><p id="totalStudents">0</p></div>
                <div class="card"><h3>Total Users</h3><p id="totalUsers">0</p></div>
            </div>

            <!-- Users Table -->

            <div class="table-container">
                <table id="usersTable">
                    <thead>
                        <tr>
                            <th>ID Number</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Course / Year / Section</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="usersTableBody">
                        <?php
                            $controller = new Controller();
                            $users = $controller->read_all();

                            foreach($users as $user):
                                ?>
                        <tr>
                            <td><?=htmlspecialchars($user['id'])?></td>
                            <td><?=htmlspecialchars($user['full_name'])?></td>
                            <td><?=htmlspecialchars($user['email'])?></td>
                            <td><?=htmlspecialchars($user['role'])?></td>
                            <td><?=htmlspecialchars($user['course'] . ' ' . $user['year'] . '-' . $user['section'])?></td>
                            <td><?=htmlspecialchars($user['status'])?></td>
                            <td>
                                <form action ="/System/Web-Systems-Finals-Project/BACKEND/Controller.php?method_finder=edit" method="get" style="display:inline;">
                                    <input type="hidden" name="id" value="<?=htmlspecialchars($user['id'])?>">
                                    <button type="submit" class="btn btn-primary">Edit</button>
                                </form>
                                <form action ="/System/Web-Systems-Finals-Project/BACKEND/Controller.php?method_finder=delete" method="post" style="display:inline;">
                                    <input type="hidden" name="id" value="<?=htmlspecialchars($user['id'])?>">
                                    <button type="submit" class="btn btn-danger" onclick="return confirm('Are you sure you want to delete this user?');">Delete</button>
                            </td>
                        </tr>
                        <?php
                            endforeach;
                            ?>
                    </tbody>
                </table>
            </div>
            

            <!-- Add New User Button -->
            <div class="add-user-button-container">
                <button id="addUserBtn">Add New User</button>
            </div>
        </section>

        <!-- REQUESTS SECTION -->
        <section id="requestsSection" class="content-section" style="display:none;">
            <h1 class="section-title">Requests</h1>

            <!-- Filter Tabs -->
            <div class="filter-tabs">
                <button class="request-tab" data-filter="pending">Pending</button>
                <button class="request-tab" data-filter="finished">Finished</button>
            </div>

            <!-- Requests Table -->
            <div class="table-container">
                <table id="requestsTable">
                    <thead>
                        <tr>
                            <th>ID Number</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Request Date</th>
                            <th>Expires In</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="requestsTableBody">
                        <tr class="no-request">
                            <td colspan="7">There’s no request</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- MESSAGES SECTION -->
        <section id="messagesSection" class="content-section" style="display:none;">
            <h1>Messages</h1>
            <p>No messages yet.</p>
        </section>

    </main>

    <!-- ================= MODALS ================= -->
    <!-- Add New User Modal -->
<form action ="/System/Web-Systems-Finals-Project/BACKEND/Controller.php?method_finder=create" method="post" id="createUser">
    <div class="modal" id="addUserModal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Add New User</h2>
                <span class="close-modal" id="closeAddUser">&times;</span>
            </div>
            <div class="modal-body">
                <label for="newUserId">ID Number</label>
                <input type="text" name="userId" id="newUserId" readonly>

                <label for="newUserName">Full Name</label>
                <input type="text" name="fullName" id="newUserName" required>

                <label for="newUserEmail">Email</label>
                <input type="email" name="email" id="newUserEmail" required>

                <label for="newUserRole">Role</label>
                <select name="userRole" id="newUserRole" required>
                    <option value="" disabled selected>Select Role</option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                </select>

                <label>Course / Year / Section</label>
                <div class="horizontal-dropdowns">
                    <select name="course" id="newUserCourse" required>
                        <option value="" disabled selected>Course</option>
                        <option value="BSIT">BSIT</option>
                        <option value="BSDC">BSDC</option>
                        <option value="BLIS">BLIS</option>
                    </select>
                    <select name="schoolYear" id="newUserYear" required>
                        <option value="" disabled selected>Year</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    <select name="section" id="newUserSection" required>
                        <option value="" disabled selected>Section</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button type="submit">Add User</button>
            </div>
        </div>
    </div>
</form>

    <!-- Change Password Modal -->
    <div class="modal" id="changePasswordModal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Change Your Password</h2>
                <span class="close-modal" id="closeChangePassword">&times;</span>
            </div>
            <div class="modal-body">
                <label for="oldPassword">Old Password</label>
                <input type="password" name="oldPassword" id="oldPassword" required>

                <label for="newPassword">New Password</label>
                <input type="password" name="newPassword" id="newPassword" required>

                <label for="confirmPassword">Confirm Password</label>
                <input type="password" name="confirmPassword" id="confirmPassword" required>
            </div>
            <div class="modal-footer">
                <button type="submit">Save Changes</button>
            </div>
        </div>
    </div>

    <!-- ================= SCRIPTS ================= -->
    <script src="../ASSETS/Admin_Page.js"></script>
    <script src="../ASSETS/Dashboard_Notifications.js"></script>
</body>

</html>
