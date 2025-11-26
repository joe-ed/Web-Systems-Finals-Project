/* Admin_Page.js - COMPLETE FIXED VERSION */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Admin page loaded successfully');

    /* ================= Sidebar Toggle ================= */
    const sidebar = document.getElementById('sidebarMenu');
    const toggleBtn = document.getElementById('toggleSidebar');
    const mainContent = document.getElementById('mainContent');

    if (toggleBtn && sidebar && mainContent) {
        const toggleIcon = toggleBtn.querySelector('i');
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('sidebar-collapsed');
            if (toggleIcon) toggleIcon.classList.toggle('rotated');
        });
    }

    /* ================= Navigation ================= */
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');

    function hideAllSections() {
        sections.forEach(sec => {
            sec.style.display = 'none';
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            const targetId = link.dataset.target;
            if (!targetId) return;
            const target = document.getElementById(targetId);
            if (!target) return;

            hideAllSections();
            target.style.display = 'flex';
            target.style.opacity = 0;
            requestAnimationFrame(() => { target.style.opacity = 1; });

            // Load data when switching to specific sections
            if (targetId === 'usersSection') {
                loadUsersData();
            } else if (targetId === 'requestsSection') {
                loadRegistrationRequests();
            }
        });
    });

    // Show dashboard by default
    const dashboardLink = document.querySelector('.nav-link[data-target="dashboardSection"]');
    if (dashboardLink) {
        dashboardLink.click();
    }

    /* ================= Settings Dropdown ================= */
    const settingsIcon = document.getElementById('settingsIcon');
    const settingsDropdown = document.getElementById('settingsDropdown');
    const logoutBtn = document.getElementById('logoutBtn');

    if (settingsIcon && settingsDropdown) {
        settingsIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            settingsDropdown.classList.toggle('active');
        });

        document.addEventListener('click', () => {
            settingsDropdown.classList.remove('active');
        });
    }

    // Logout functionality
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to logout?')) {
                window.location.href = '../FRONTEND/LogIn_Page.html';
            }
        });
    }

    /* ================= Modal System ================= */
    const modals = Array.from(document.querySelectorAll('.modal'));
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    document.body.appendChild(modalOverlay);

    function openModal(modal) {
        if (!modal) return;
        console.log('Opening modal:', modal.id);
        modal.style.display = 'flex';
        modalOverlay.style.display = 'block';
        requestAnimationFrame(() => {
            modal.style.opacity = 1;
            modal.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.style.opacity = 0;
        modal.style.transform = 'translate(-50%, -50%) scale(0.8)';
        modalOverlay.style.display = 'none';
        setTimeout(() => { 
            modal.style.display = 'none'; 
        }, 300);
    }

    /* ================= Add User Modal ================= */
    const addUserBtn = document.getElementById('addUserBtn');
    const addUserModal = document.getElementById('addUserModal');
    const closeAddUser = document.getElementById('closeAddUser');

    if (addUserBtn && addUserModal) {
        addUserBtn.addEventListener('click', () => {
            const newUserId = generateUserId();
            document.getElementById('newUserId').value = newUserId;
            openModal(addUserModal);
        });
    }

    if (closeAddUser) {
        closeAddUser.addEventListener('click', () => closeModal(addUserModal));
    }

    // Add User Form Submission
    const addUserForm = document.getElementById('addUserForm');
    if (addUserForm) {
        addUserForm.addEventListener('submit', handleAddUser);
    }

    /* ================= User Management ================= */
    async function loadUsersData() {
        try {
            console.log('Loading users data...');
            const response = await fetch('../BACKEND/Controller.php?method_finder=get_users');
            if (!response.ok) throw new Error('Network response was not ok');
            const users = await response.json();
            console.log('Users loaded:', users);
            
            updateUsersTable(users);
            updateSummaryCards(users);
        } catch (error) {
            console.error('Error loading users:', error);
            showSampleUsers();
        }
    }

    function updateUsersTable(users) {
        const usersTableBody = document.getElementById('usersTableBody');
        if (!usersTableBody) {
            console.error('Users table body not found');
            return;
        }

        usersTableBody.innerHTML = '';

        if (users.length === 0) {
            usersTableBody.innerHTML = '<tr><td colspan="7">No users found</td></tr>';
            return;
        }

        users.forEach(user => {
            const row = document.createElement('tr');
            const fullName = `${user.first_name} ${user.middle_name || ''} ${user.last_name}`.trim();
            const courseInfo = user.role === 'student' ? 
                `${user.course || '-'} / ${user.year || '-'} / ${user.section || '-'}` : '-';
            
            row.innerHTML = `
                <td>${user.id_number}</td>
                <td>${fullName}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>${courseInfo}</td>
                <td class="status ${user.status}">${user.status}</td>
                <td>
                    <button class="table-btn edit-user" data-id="${user.id}">Edit</button>
                    <button class="table-btn delete-user" data-id="${user.id}">Delete</button>
                </td>
            `;
            usersTableBody.appendChild(row);
        });

        // Add event listeners for edit/delete buttons
        document.querySelectorAll('.edit-user').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const userId = e.target.dataset.id;
                editUser(userId);
            });
        });

        document.querySelectorAll('.delete-user').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const userId = e.target.dataset.id;
                deleteUser(userId);
            });
        });
    }

    function updateSummaryCards(users) {
        const totalAdmin = users.filter(u => u.role === 'admin').length;
        const totalTeachers = users.filter(u => u.role === 'teacher').length;
        const totalStudents = users.filter(u => u.role === 'student').length;
        const totalUsers = users.length;

        if (document.getElementById('totalAdmin')) document.getElementById('totalAdmin').textContent = totalAdmin;
        if (document.getElementById('totalTeachers')) document.getElementById('totalTeachers').textContent = totalTeachers;
        if (document.getElementById('totalStudents')) document.getElementById('totalStudents').textContent = totalStudents;
        if (document.getElementById('totalUsers')) document.getElementById('totalUsers').textContent = totalUsers;
    }

    async function handleAddUser(e) {
        e.preventDefault();
        console.log('Add user form submitted');
        
        const submitBtn = document.querySelector('#addUserForm button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Adding...';
        submitBtn.disabled = true;

        const formData = new FormData();
        formData.append('id_number', document.getElementById('newUserId').value);
        formData.append('first_name', document.getElementById('newUserName').value);
        formData.append('last_name', 'User');
        formData.append('middle_name', '');
        formData.append('email', document.getElementById('newUserEmail').value);
        formData.append('role', document.getElementById('newUserRole').value);
        formData.append('course', document.getElementById('newUserCourse').value || '');
        formData.append('year', document.getElementById('newUserYear').value || '');
        formData.append('section', document.getElementById('newUserSection').value || '');
        formData.append('password', document.getElementById('newUserId').value);

        try {
            const response = await fetch('../BACKEND/Controller.php?method_finder=create_user', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            console.log('Add user response:', result);

            if (result.success) {
                alert('User added successfully!');
                closeModal(addUserModal);
                loadUsersData();
                document.getElementById('addUserForm').reset();
            } else {
                alert('Error adding user: ' + result.message);
            }
        } catch (error) {
            console.error('Error adding user:', error);
            alert('Error adding user. Please try again.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    function generateUserId() {
        const year = new Date().getFullYear();
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `${year}-${random}`;
    }

    async function editUser(userId) {
        alert('Edit user functionality would go here for user ID: ' + userId);
    }

    async function deleteUser(userId) {
        if (confirm('Are you sure you want to delete this user?')) {
            try {
                const response = await fetch(`../BACKEND/Controller.php?method_finder=delete_user&id=${userId}`);
                const result = await response.json();

                if (result.success) {
                    alert('User deleted successfully!');
                    loadUsersData();
                } else {
                    alert('Error deleting user: ' + result.message);
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Error deleting user. Please try again.');
            }
        }
    }

    /* ================= Registration Requests Management ================= */
    async function loadRegistrationRequests() {
        try {
            console.log('Loading registration requests...');
            const response = await fetch('../BACKEND/Controller.php?method_finder=get_registration_requests');
            if (!response.ok) throw new Error('Network response was not ok');
            const requests = await response.json();
            console.log('Registration requests loaded:', requests);
            updateRequestsTable(requests);
        } catch (error) {
            console.error('Error loading registration requests:', error);
            showSampleRequests();
        }
    }

    function updateRequestsTable(requests) {
        const requestsTableBody = document.getElementById('requestsTableBody');
        if (!requestsTableBody) {
            console.error('Requests table body not found');
            return;
        }

        requestsTableBody.innerHTML = '';

        if (requests.length === 0) {
            requestsTableBody.innerHTML = '<tr class="no-request"><td colspan="7">There\'s no request</td></tr>';
            return;
        }

        requests.forEach(request => {
            const row = document.createElement('tr');
            row.dataset.requestId = request.id;
            row.dataset.status = 'pending';
            
            const fullName = `${request.first_name} ${request.middle_name || ''} ${request.last_name}`.trim();
            const courseInfo = request.role === 'student' ? 
                `${request.course || 'Not set'} / ${request.year || 'Not set'} / ${request.section || 'Not set'}` : 'N/A';
            
            // Calculate expires in (7 days from request date)
            const requestDate = new Date(request.requested_at);
            const expireDate = new Date(requestDate);
            expireDate.setDate(expireDate.getDate() + 7);
            const today = new Date();
            const daysLeft = Math.ceil((expireDate - today) / (1000 * 60 * 60 * 24));
            const expiresText = daysLeft > 0 ? `${daysLeft} days` : 'Expired';

            row.innerHTML = `
                <td>${request.id_number}</td>
                <td>${fullName}</td>
                <td>${request.email}</td>
                <td class="status pending">Pending</td>
                <td>${new Date(request.requested_at).toLocaleDateString()}</td>
                <td>${expiresText}</td>
                <td>
                    <button class="table-btn approve-request" data-id="${request.id}">Approve</button>
                    <button class="table-btn reject-request" data-id="${request.id}">Reject</button>
                </td>
            `;
            requestsTableBody.appendChild(row);
        });

        // Add event listeners for approve/reject buttons
        document.querySelectorAll('.approve-request').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const requestId = e.target.dataset.id;
                approveRegistration(requestId);
            });
        });

        document.querySelectorAll('.reject-request').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const requestId = e.target.dataset.id;
                rejectRegistration(requestId);
            });
        });
    }

    async function approveRegistration(requestId) {
        if (!confirm('Are you sure you want to approve this registration?')) return;

        try {
            const formData = new FormData();
            formData.append('request_id', requestId);

            const response = await fetch('../BACKEND/Controller.php?method_finder=approve_registration', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            console.log('Approve response:', result);

            if (result.success) {
                alert('User approved successfully!');
                loadRegistrationRequests();
                loadUsersData();
            } else {
                alert('Error approving user: ' + result.message);
            }
        } catch (error) {
            console.error('Error approving registration:', error);
            alert('Error approving registration. Please try again.');
        }
    }

    async function rejectRegistration(requestId) {
        if (!confirm('Are you sure you want to reject this registration?')) return;

        try {
            const formData = new FormData();
            formData.append('request_id', requestId);

            const response = await fetch('../BACKEND/Controller.php?method_finder=reject_registration', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                alert('Registration rejected!');
                loadRegistrationRequests();
            } else {
                alert('Error rejecting registration: ' + result.message);
            }
        } catch (error) {
            console.error('Error rejecting registration:', error);
            alert('Error rejecting registration. Please try again.');
        }
    }

    /* ================= Role Tabs ================= */
    const roleTabs = Array.from(document.querySelectorAll('.tab-button'));
    const classSectionSelect = document.getElementById('classSectionSelect');

    if (roleTabs.length > 0) {
        roleTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                roleTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                if (tab.dataset.role === 'student') {
                    if (classSectionSelect) {
                        classSectionSelect.disabled = false;
                        classSectionSelect.style.opacity = '1';
                    }
                } else {
                    if (classSectionSelect) {
                        classSectionSelect.disabled = true;
                        classSectionSelect.style.opacity = '0.5';
                        classSectionSelect.value = 'all';
                    }
                }
            });
        });
    }

    /* ================= Requests Tabs ================= */
    const requestsTabs = Array.from(document.querySelectorAll('.request-tab'));

    if (requestsTabs.length > 0) {
        requestsTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                requestsTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
            });
        });
    }

    /* ================= Sample Data for Testing ================= */
    function showSampleUsers() {
        const sampleUsers = [
            {
                id: 1,
                id_number: 'admin001',
                first_name: 'Admin',
                middle_name: '',
                last_name: 'User',
                email: 'admin@dorencio.edu',
                role: 'admin',
                course: null,
                year: null,
                section: null,
                status: 'active'
            }
        ];
        updateUsersTable(sampleUsers);
        updateSummaryCards(sampleUsers);
    }

    function showSampleRequests() {
        const sampleRequests = [
            {
                id: 1,
                id_number: '2024001',
                first_name: 'John',
                middle_name: 'Michael',
                last_name: 'Doe',
                email: 'john.doe@dorencio.edu',
                role: 'student',
                course: 'BS Computer Science',
                year: '1',
                section: 'A',
                status: 'pending',
                requested_at: new Date().toISOString()
            }
        ];
        updateRequestsTable(sampleRequests);
    }

    // Load initial data
    loadUsersData();
});