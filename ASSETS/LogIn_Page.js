// ================== Element Selectors ==================
const modal = document.getElementById("mainModal");
const modalContent = document.querySelector(".modal-content");

const loginBtnOpen = document.querySelector(".login-button");
const closeBtn = document.querySelector(".close-btn");

const loginView = document.getElementById("loginView");
const forgotView = document.getElementById("forgotView");
const resetView = document.getElementById("resetView");

const forgotLink = document.getElementById("forgotLink");
const backToLogin = document.getElementById("backToLogin");

const sendCodeBtn = document.getElementById("sendCodeBtn");
const countdownEl = document.getElementById("countdown");

let countdown = 120;
let countdownTimer = null;

// ================== Modal Open ==================
loginBtnOpen.addEventListener("click", () => {
  modal.classList.add("active");
  showView(loginView);
});

// ================== Modal Close ==================
closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
  resetForgotModal();
});

// ================== Switch to Forgot Password ==================
forgotLink.addEventListener("click", () => {
  showView(forgotView);
  resetForgotModal();
});

// ================== Back to Login ==================
backToLogin.addEventListener("click", () => {
  resetForgotModal();
  showView(loginView);
});

// ================== View Switcher ==================
function showView(view) {
  [loginView, forgotView, resetView].forEach(v => v.classList.remove("active"));
  view.classList.add("active");
}

// ================== Reset Forgot Password State ==================
function resetForgotModal() {
  clearInterval(countdownTimer);
  countdown = 120;

  countdownEl.style.display = "none";
  countdownEl.innerText = "";

  sendCodeBtn.innerText = "Send Code";
  sendCodeBtn.disabled = false;
  sendCodeBtn.classList.remove("disabled");
}

// ================== SEND CODE / RESEND CODE LOGIC ==================
sendCodeBtn.addEventListener("click", () => {
  if (sendCodeBtn.disabled) return;

  // Disable button and dim it
  sendCodeBtn.disabled = true;
  sendCodeBtn.classList.add("disabled");
  sendCodeBtn.innerText = "Resend Code";

  // Show countdown
  countdownEl.style.display = "block";
  countdownEl.innerText = countdown + "s";

  clearInterval(countdownTimer);

  countdownTimer = setInterval(() => {
    countdown--;
    countdownEl.innerText = countdown + "s";

    if (countdown <= 0) {
      clearInterval(countdownTimer);

      // Enable the button visually and functionally
      sendCodeBtn.disabled = false;
      sendCodeBtn.classList.remove("disabled");
      sendCodeBtn.innerText = "Resend Code";

      countdownEl.style.display = "none";
    }
  }, 1000);
});
