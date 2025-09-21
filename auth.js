const formTitle = document.getElementById("form-title");
const authForm = document.getElementById("auth-form");
const submitBtn = document.getElementById("submit-btn");
const toggleBtn = document.getElementById("toggle-btn");
const usernameField = document.getElementById("username-field");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

let isLogin = true;
const users = JSON.parse(localStorage.getItem("dummyUsers")) || {};

function redirectToMainPage() {
  localStorage.setItem("isLoggedIn", "true");
  window.location.href = "index.html"; // redirect after login
}

// Toggle Login <-> Signup
toggleBtn.addEventListener("click", () => {
  isLogin = !isLogin;
  if (isLogin) {
    formTitle.textContent = "Login";
    submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
    toggleBtn.textContent = "Don’t have an account? Sign up";
    usernameField.classList.add("hidden");
    usernameInput.required = false;
  } else {
    formTitle.textContent = "Sign Up";
    submitBtn.innerHTML = '<i class="fas fa-user-plus"></i> Sign Up';
    toggleBtn.textContent = "Already have an account? Login";
    usernameField.classList.remove("hidden");
    usernameInput.required = true;
  }
});

// Handle Form Submit
authForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email.includes("@gmail.com")) {
    return showMessage("❌ Please use a valid Gmail address.", "error");
  }

  if (!isLogin) {
    // Signup Password Rules
    if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
      return showMessage("⚠️ Password must include letters and numbers.", "error");
    }
  }

  if (isLogin) {
    if (users[email] && users[email].password === password) {
      showMessage(`✅ Welcome back, ${users[email].username}! Redirecting...`, "success");
      setTimeout(redirectToMainPage, 1000);
    } else {
      showMessage("❌ Invalid email or password.", "error");
    }
  } else {
    if (users[email]) {
      showMessage("⚠️ Account already exists. Please login.", "error");
    } else {
      users[email] = { username, password };
      localStorage.setItem("dummyUsers", JSON.stringify(users));
      showMessage(`🎉 Signup successful! Welcome, ${username}!`, "success");
      setTimeout(redirectToMainPage, 1000);
    }
  }
});

// Custom Message Display
function showMessage(msg, type) {
  const box = document.createElement("div");
  box.textContent = msg;
  box.className = `fixed top-5 right-5 px-4 py-2 rounded-lg shadow-lg text-white ${
    type === "success" ? "bg-green-500" : "bg-red-500"
  }`;
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 3000);
}

// Google Login
function handleGoogleResponse(response) {
  const data = parseJwt(response.credential);
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("userEmail", data.email);
  localStorage.setItem("userName", data.name);
  localStorage.setItem("userPicture", data.picture);

  document.getElementById("user-info").innerHTML = `
    <p><strong>Welcome:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <img src="${data.picture}" width="40" style="border-radius:50%">
  `;
  showMessage(`✅ Logged in as ${data.name}`, "success");
  setTimeout(redirectToMainPage, 1000);
}

function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  return JSON.parse(jsonPayload);
}
