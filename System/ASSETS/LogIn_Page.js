const loginContainer = document.querySelector('.login');
const loginBtn = document.querySelector('.login-button');
const closeBtn = document.querySelector('.X');
const registerLink = document.querySelector('.register_link');
const loginLink = document.querySelector('.login_link');

const loginForm = loginContainer.querySelector('.form-box:not(.register)');
const registerForm = loginContainer.querySelector('.form-box.register');

// Get form elements for validation
const loginIdInput = loginForm.querySelector('input[name="IDnumber"]');
const loginPasswordInput = loginForm.querySelector('input[name="password"]');
const loginRoleSelect = loginForm.querySelector('select[name="role"]');

function openLogin() {
  loginContainer.style.pointerEvents = 'all'; // enable interactions
  loginContainer.classList.add('show');
  loginContainer.classList.remove('hide', 'slide-register');

  loginForm.classList.add('active');
  loginForm.classList.remove('hidden');

  registerForm.classList.add('hidden');
  registerForm.classList.remove('active');
}

function closeLogin() {
  loginContainer.classList.add('hide');
  loginContainer.classList.remove('show');

  loginContainer.addEventListener('animationend', function handler() {
    loginContainer.classList.remove('hide');
    loginContainer.style.pointerEvents = 'none';
    loginContainer.removeEventListener('animationend', handler);
  });

  loginForm.classList.add('hidden');
  loginForm.classList.remove('active');

  registerForm.classList.add('hidden');
  registerForm.classList.remove('active');

  loginContainer.classList.remove('slide-register');
}

function switchToRegister(e) {
  e.preventDefault();

  loginForm.classList.add('hidden');
  loginForm.classList.remove('active');

  registerForm.classList.remove('hidden');
  registerForm.classList.add('active');

  loginContainer.classList.add('slide-register');
}

function switchToLogin(e) {
  e.preventDefault();

  registerForm.classList.add('hidden');
  registerForm.classList.remove('active');

  loginForm.classList.remove('hidden');
  loginForm.classList.add('active');

  loginContainer.classList.remove('slide-register');
}

// Login form submission handler
function handleLoginSubmit(e) {
  e.preventDefault();
  
  // Get form values
  const idNumber = loginIdInput.value.trim();
  const password = loginPasswordInput.value;
  const role = loginRoleSelect.value;
  
  // Basic validation
  if (!idNumber || !password || !role) {
    showMessage('Please fill in all fields', 'error');
    return;
  }
  
  // Show loading state
  const submitBtn = loginForm.querySelector('.btn');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Logging in...';
  submitBtn.disabled = true;
  
  // Simulate API call delay
  setTimeout(() => {
    // In a real application, you would make an API call to validate credentials
    const loginSuccess = validateLogin(idNumber, password, role);
    
    if (loginSuccess) {
      showMessage('Login successful! Redirecting...', 'success');
      
      // Redirect based on role after a short delay
      setTimeout(() => {
        redirectToDashboard(role);
      }, 1500);
    } else {
      showMessage('Invalid credentials. Please try again.', 'error');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  }, 1000);
}

// ... (keep all existing code until handleLoginSubmit function)

// Login form submission handler - UPDATED
function handleLoginSubmit(e) {
  e.preventDefault();
  
  // Get form values
  const idNumber = loginIdInput.value.trim();
  const password = loginPasswordInput.value;
  const role = loginRoleSelect.value;
  
  // Basic validation
  if (!idNumber || !password || !role) {
    showMessage('Please fill in all fields', 'error');
    return;
  }
  
  // Show loading state
  const submitBtn = loginForm.querySelector('.btn');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Logging in...';
  submitBtn.disabled = true;
  
  // Real API call to authenticate
  const formData = new FormData();
  formData.append('id_number', idNumber);
  formData.append('password', password);
  formData.append('role', role);

  fetch('../System/BackEnd/Controller.php?method_finder=login', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      showMessage('Login successful! Redirecting...', 'success');
      
      // Store user data in sessionStorage
      sessionStorage.setItem('user', JSON.stringify(data.user));
      
      // Redirect based on role after a short delay
      setTimeout(() => {
        redirectToDashboard(role, data.user);
      }, 1500);
    } else {
      showMessage(data.message || 'Invalid credentials. Please try again.', 'error');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  })
  .catch(error => {
    console.error('Login error:', error);
    showMessage('Login failed. Please try again.', 'error');
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  });
}

// Redirect to appropriate dashboard based on role - UPDATED
function redirectToDashboard(role, user) {
  switch(role) {
    case 'student':
      window.location.href = 'student_dashboard.html';
      break;
    case 'teacher':
      window.location.href = 'teacher_dashboard.html';
      break;
    case 'admin':
      window.location.href = 'admin_dashboard.html';
      break;
    default:
      showMessage('Invalid role selected', 'error');
  }
}

// ... (rest of the existing code remains the same)

// Register form submission handler
// Register form submission handler - UPDATED
// Register form submission handler - COMPLETELY UPDATED
function handleRegisterSubmit(e) {
  e.preventDefault();
  console.log('Register form submitted'); // Debug log
  
  const registerForm = document.querySelector('.form-box.register form');
  const idNumber = registerForm.querySelector('input[name="IDnumber"]').value.trim();
  const email = registerForm.querySelector('input[name="email"]').value.trim();
  const password = registerForm.querySelector('input[name="password"]').value;
  const confirmPassword = registerForm.querySelector('input[name="confirmPassword"]').value;
  const role = registerForm.querySelector('select[name="role"]').value;
  
  console.log('Form data:', { idNumber, email, password, confirmPassword, role }); // Debug log
  
  // Validation
  if (!idNumber || !email || !password || !confirmPassword || !role) {
    showMessage('Please fill in all fields', 'error');
    return;
  }
  
  if (password !== confirmPassword) {
    showMessage('Passwords do not match', 'error');
    return;
  }
  
  if (password.length < 6) {
    showMessage('Password must be at least 6 characters long', 'error');
    return;
  }
  
  // For registration, we only accept student role
  if (role !== 'student') {
    showMessage('Only student registration is available. Please contact admin for other roles.', 'error');
    return;
  }
  
  // Show loading state
  const submitBtn = registerForm.querySelector('.btn');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Registering...';
  submitBtn.disabled = true;
  
  // Prepare form data - FIXED: Use proper field names that match Controller.php
  const formData = new FormData();
  formData.append('id_number', idNumber);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('role', role);
  formData.append('first_name', 'New'); // Default first name
  formData.append('last_name', 'Student'); // Default last name
  formData.append('middle_name', ''); // Empty middle name
  formData.append('course', 'BSIT'); // Default course
  formData.append('year', '1'); // Default year
  formData.append('section', 'A'); // Default section
  
  console.log('Sending registration request...'); // Debug log
  
  // Send registration request - FIXED PATH
  fetch('../System/BackEnd/Controller.php?method_finder=register_request', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    console.log('Response status:', response.status); // Debug log
    return response.json();
  })
  .then(data => {
    console.log('Server response:', data); // Debug log
    if (data.success) {
      showMessage(data.message, 'success');
      
      // Switch back to login form after a delay
      setTimeout(() => {
        switchToLogin({ preventDefault: () => {} });
        registerForm.reset();
      }, 3000);
    } else {
      showMessage(data.message, 'error');
    }
  })
  .catch(error => {
    console.error('Registration error:', error);
    showMessage('Registration failed. Please check console for details.', 'error');
  })
  .finally(() => {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  });
}

// Mock validation function - replace with actual API call
function validateLogin(idNumber, password, role) {
  // In a real application, this would be an API call to your backend
  // For demo purposes, we'll accept any non-empty credentials
  const validCredentials = idNumber && password && role;
  
  // You could add specific test credentials for demo
  if (idNumber === '2023001' && password === 'student123' && role === 'student') {
    return true;
  }
  
  if (idNumber === 'admin001' && password === 'admin123' && role === 'admin') {
    return true;
  }
  
  if (idNumber === 'teach001' && password === 'teacher123' && role === 'teaching') {
    return true;
  }
  
  // For demo purposes, accept any non-empty credentials
  return validCredentials;
}

// Redirect to appropriate dashboard based on role
function redirectToDashboard(role) {
  switch(role) {
    case 'student':
      window.location.href = 'student_dashboard.html';
      break;
    case 'teaching':
      // For now, redirect to student dashboard as placeholder
      // In production, create teaching_dashboard.html
      window.location.href = 'student_dashboard.html';
      break;
    case 'admin':
      // For now, redirect to student dashboard as placeholder  
      // In production, create admin_dashboard.html
      window.location.href = 'student_dashboard.html';
      break;
    default:
      showMessage('Invalid role selected', 'error');
  }
}

// Show message to user
function showMessage(message, type) {
  // Remove any existing messages
  const existingMessage = document.querySelector('.login-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create message element
  const messageEl = document.createElement('div');
  messageEl.className = `login-message ${type}`;
  messageEl.textContent = message;
  
  // Style the message
  messageEl.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 12px 20px;
    border-radius: 5px;
    font-weight: 500;
    z-index: 10000;
    animation: slideIn 0.3s ease;
    max-width: 90%;
    text-align: center;
  `;
  
  if (type === 'error') {
    messageEl.style.backgroundColor = 'rgba(244, 67, 54, 0.9)';
    messageEl.style.color = 'white';
    messageEl.style.border = '1px solid #f44336';
  } else {
    messageEl.style.backgroundColor = 'rgba(76, 175, 80, 0.9)';
    messageEl.style.color = 'white';
    messageEl.style.border = '1px solid #4CAF50';
  }
  
  document.body.appendChild(messageEl);
  
  // Remove message after 3 seconds
  setTimeout(() => {
    if (messageEl.parentNode) {
      messageEl.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        if (messageEl.parentNode) {
          messageEl.remove();
        }
      }, 300);
    }
  }, 3000);
}

// Add CSS for message animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(-50%) translateY(-20px); opacity: 0; }
    to { transform: translateX(-50%) translateY(0); opacity: 1; }
  }
  
  @keyframes slideOut {
    from { transform: translateX(-50%) translateY(0); opacity: 1; }
    to { transform: translateX(-50%) translateY(-20px); opacity: 0; }
  }
`;
document.head.appendChild(style);

// Event Listeners
loginBtn.addEventListener('click', openLogin);
closeBtn.addEventListener('click', closeLogin);
registerLink.addEventListener('click', switchToRegister);
loginLink.addEventListener('click', switchToLogin);

// Form submission handlers
loginForm.querySelector('form').addEventListener('submit', handleLoginSubmit);
registerForm.querySelector('form').addEventListener('submit', handleRegisterSubmit);

// Demo credentials helper (optional - for testing)
function showDemoCredentials() {
  console.log('Demo Credentials:');
  console.log('Student: ID=2023001, Password=student123');
  console.log('Admin: ID=admin001, Password=admin123');
  console.log('Teaching: ID=teach001, Password=teacher123');
}

// Call this function if you want to log demo credentials to console
// showDemoCredentials();