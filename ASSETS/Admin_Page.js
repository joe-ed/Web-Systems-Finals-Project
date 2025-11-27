// ================= Admin_Page.js — Part 1 =================
document.addEventListener('DOMContentLoaded', () => {

    /* ===================== BASIC ELEMENTS ===================== */
    const sidebar = document.getElementById('sidebarMenu');
    const toggleSidebarBtn = document.getElementById('toggleSidebar');
    const mainContent = document.getElementById('mainContent');
    const navLinks = document.querySelectorAll('.nav-link');
    const settingsIcon = document.getElementById('settingsIcon');
    const settingsDropdown = document.getElementById('settingsDropdown');
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    /* ===================== SIDEBAR TOGGLE ===================== */
    toggleSidebarBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('sidebar-collapsed');

        const icon = toggleSidebarBtn.querySelector('i');
        icon.classList.toggle('rotated');
    });

    /* ===================== NAVIGATION ===================== */
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetId = link.getAttribute('data-target');

            // Hide all sections
            document.querySelectorAll('.content-section').forEach(sec => sec.style.display = 'none');

            // Show targeted section
            document.getElementById(targetId).style.display = 'flex';

            // Highlight active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    /* ===================== SETTINGS DROPDOWN ===================== */
    settingsIcon.addEventListener('click', () => {
        settingsDropdown.classList.toggle('active');
    });

    // Close dropdown if clicked outside
    document.addEventListener('click', (e) => {
        if (!settingsIcon.contains(e.target) && !settingsDropdown.contains(e.target)) {
            settingsDropdown.classList.remove('active');
        }
    });

    /* ===================== MODAL HANDLING ===================== */
    const modals = document.querySelectorAll('.modal');
    const modalOverlay = document.createElement('div');
    modalOverlay.classList.add('modal-overlay');
    document.body.appendChild(modalOverlay);

    function openModal(modal) {
        modal.style.display = 'flex';
        setTimeout(() => modal.style.opacity = '1', 10);
        modalOverlay.style.display = 'block';
    }

    function closeModal(modal) {
        modal.style.opacity = '0';
        setTimeout(() => modal.style.display = 'none', 300);
        modalOverlay.style.display = 'none';
    }

    // Close modal if overlay clicked
    modalOverlay.addEventListener('click', () => {
        modals.forEach(modal => closeModal(modal));
    });

    /* ===================== ADD NEW USER MODAL ===================== */
    const addUserBtn = document.getElementById('addUserBtn');
    const addUserModal = document.getElementById('addUserModal');
    const closeAddUser = document.getElementById('closeAddUser');

    addUserBtn.addEventListener('click', () => openModal(addUserModal));
    closeAddUser.addEventListener('click', () => closeModal(addUserModal));

    /* ===================== EDIT USER MODAL ===================== */
    const editUserModal = document.getElementById('editUserModal');
    const closeEditUser = document.getElementById('closeEditUser');
    closeEditUser.addEventListener('click', () => closeModal(editUserModal));

    /* ===================== CHANGE PASSWORD MODAL ===================== */
    const changePasswordModal = document.getElementById('changePasswordModal');
    const closeChangePassword = document.getElementById('closeChangePassword');

    changePasswordBtn.addEventListener('click', () => openModal(changePasswordModal));
    closeChangePassword.addEventListener('click', () => closeModal(changePasswordModal));

    /* ===================== LOGOUT BUTTON ===================== */
    logoutBtn.addEventListener('click', () => {
        // Example: redirect to login page
        window.location.href = 'login.html';
    });

    /* ===================== TAB BUTTONS (USERS) ===================== */
    const userTabs = document.querySelectorAll('.tab-button');
    const classSectionSelect = document.getElementById('classSectionSelect');

    userTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Activate tab
            userTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Enable section dropdown only for students
            if (tab.dataset.role === 'student') {
                classSectionSelect.disabled = false;
            } else {
                classSectionSelect.disabled = true;
                classSectionSelect.value = 'all';
            }
        });
    });

    /* ===================== REQUEST & MESSAGE TABS PLACEHOLDER ===================== */
    // Part 2 will contain full logic for requests, messages, tables, and form submissions

});
// ================= Admin_Page.js — Part 2 =================
document.addEventListener('DOMContentLoaded', () => {

    /* ===================== USERS TABLE LOGIC ===================== */
    const usersTableBody = document.getElementById('usersTableBody');

    let usersData = [];

    function renderUsersTable(filterRole = 'all', filterSection = 'all') {
        usersTableBody.innerHTML = '';
        const filtered = usersData.filter(user => 
            (filterRole === 'all' || user.role === filterRole) &&
            (filterSection === 'all' || user.section === filterSection)
        );

        if (filtered.length === 0) {
            usersTableBody.innerHTML = '<tr class="no-user"><td colspan="7">No users found</td></tr>';
            return;
        }

        filtered.forEach(user => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>${user.id}</td>
                <td>${user.fullName}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>${user.role === 'student' ? `${user.course}-${user.year}${user.section}` : '-'}</td>
                <td>${user.status}</td>
                <td>
                    <button class="edit-btn" data-id="${user.id}">Edit</button>
                    <button class="delete-btn" data-id="${user.id}">Delete</button>
                    ${user.role !== 'student' ? '' : '<button class="reset-btn" data-id="'+user.id+'">Reset PW</button>'}
                </td>
            `;
            usersTableBody.appendChild(tr);
        });

        attachUserTableEvents();
    }

    function attachUserTableEvents() {
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const userId = e.target.dataset.id;
                const user = usersData.find(u => u.id === userId);

                if (!user) return;

                document.getElementById('editUserId').value = user.id;
                document.getElementById('editUserName').value = user.fullName;
                document.getElementById('editUserEmail').value = user.email;
                document.getElementById('editUserStatus').value = user.status;
                document.getElementById('editUserCourse').value = user.course || 'BSIT';
                document.getElementById('editUserYear').value = user.year || '1';
                document.getElementById('editUserSection').value = user.section || 'A';

                openModal(document.getElementById('editUserModal'));
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const userId = e.target.dataset.id;
                if (confirm('Are you sure you want to delete this user?')) {
                    usersData = usersData.filter(u => u.id !== userId);
                    renderUsersTable();
                }
            });
        });

        document.querySelectorAll('.reset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const userId = e.target.dataset.id;
                if (confirm('Are you sure you want to reset this user\'s password?')) {
                    alert(`Password for ${userId} has been reset to default.`);
                }
            });
        });
    }

    /* ===================== ADD NEW USER ===================== */
    const addUserModal = document.getElementById('addUserModal');
    document.querySelector('#addUserModal .modal-footer button').addEventListener('click', () => {
        const id = document.getElementById('newUserId').value;
        const name = document.getElementById('newUserName').value.trim();
        const email = document.getElementById('newUserEmail').value.trim();
        const role = document.getElementById('newUserRole').value;
        const course = document.getElementById('newUserCourse').value;
        const year = document.getElementById('newUserYear').value;
        const section = document.getElementById('newUserSection').value;

        if (!name || !email || !role) return alert('Please fill all required fields.');

        usersData.push({ id, fullName: name, email, role, course, year, section, status: 'active' });

        // Increment ID for next user
        document.getElementById('newUserId').value = (parseInt(id) + 1).toString();

        renderUsersTable();
        closeModal(addUserModal);

        // Clear input fields
        document.getElementById('newUserName').value = '';
        document.getElementById('newUserEmail').value = '';
        document.getElementById('newUserRole').value = '';
        document.getElementById('newUserCourse').value = '';
        document.getElementById('newUserYear').value = '';
        document.getElementById('newUserSection').value = '';
    });

    /* ===================== SAVE EDITED USER ===================== */
    const editUserModalFooterBtn = document.querySelector('#editUserModal .modal-footer button');
    editUserModalFooterBtn.addEventListener('click', () => {
        const id = document.getElementById('editUserId').value;
        const name = document.getElementById('editUserName').value.trim();
        const email = document.getElementById('editUserEmail').value.trim();
        const status = document.getElementById('editUserStatus').value;
        const course = document.getElementById('editUserCourse').value;
        const year = document.getElementById('editUserYear').value;
        const section = document.getElementById('editUserSection').value;

        const user = usersData.find(u => u.id === id);
        if (!user) return;

        user.fullName = name;
        user.email = email;
        user.status = status;
        user.course = course;
        user.year = year;
        user.section = section;

        renderUsersTable();
        closeModal(document.getElementById('editUserModal'));
    });

    /* ===================== USERS FILTERING ===================== */
    const usersSearchInput = document.getElementById('usersSearchInput');
    usersSearchInput.addEventListener('input', () => {
        const filterText = usersSearchInput.value.toLowerCase();
        const activeTab = document.querySelector('.tab-button.active')?.dataset.role || 'all';
        const sectionValue = document.getElementById('classSectionSelect').value;
        renderUsersTable(activeTab, sectionValue);
    });

    classSectionSelect.addEventListener('change', () => {
        const activeTab = document.querySelector('.tab-button.active')?.dataset.role || 'all';
        renderUsersTable(activeTab, classSectionSelect.value);
    });

    // ===================== INITIAL RENDER =====================
    renderUsersTable();

    // ===================== DASHBOARD COUNTS =====================
    const totalAdmin = document.getElementById('totalAdmin');
    const totalTeachers = document.getElementById('totalTeachers');
    const totalStudents = document.getElementById('totalStudents');
    const totalUsers = document.getElementById('totalUsers');

    function updateDashboardCounts() {
        totalAdmin.textContent = usersData.filter(u => u.role === 'admin').length;
        totalTeachers.textContent = usersData.filter(u => u.role === 'teacher').length;
        totalStudents.textContent = usersData.filter(u => u.role === 'student').length;
        totalUsers.textContent = usersData.length;
    }

    updateDashboardCounts();

});
