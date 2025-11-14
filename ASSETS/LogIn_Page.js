const loginContainer = document.querySelector('.login');
const loginBtn = document.querySelector('.login-button');
const closeBtn = document.querySelector('.X');
const registerLink = document.querySelector('.register_link');
const loginLink = document.querySelector('.login_link');

const loginForm = loginContainer.querySelector('.form-box:not(.register)');
const registerForm = loginContainer.querySelector('.form-box.register');

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

loginBtn.addEventListener('click', openLogin);
closeBtn.addEventListener('click', closeLogin);
registerLink.addEventListener('click', switchToRegister);
loginLink.addEventListener('click', switchToLogin);
