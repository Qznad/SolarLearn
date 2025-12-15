// auth.js - Fixed Authentication System

function initAuth() {
    updateNavbar();
    setupEventListeners();
}

function updateNavbar() {
    const loggedUser = getLoggedInUser();
    const guestElements = document.querySelectorAll(".guest-only");
    const userElements = document.querySelectorAll(".user-only");
    const welcomeUser = document.getElementById("welcomeUser");

    if (loggedUser) {
        guestElements.forEach(el => el.classList.add("d-none"));
        userElements.forEach(el => el.classList.remove("d-none"));
        if (welcomeUser) {
            welcomeUser.textContent = `Welcome, ${loggedUser.fullName}`;
        }
    } else {
        guestElements.forEach(el => el.classList.remove("d-none"));
        userElements.forEach(el => el.classList.add("d-none"));
    }
}

function getLoggedInUser() {
    try {
        const userStr = localStorage.getItem("loggedInUser");
        return userStr ? JSON.parse(userStr) : null;
    } catch (e) {
        console.error("Error reading user data:", e);
        return null;
    }
}

function getAllUsers() {
    try {
        const usersStr = localStorage.getItem("users");
        return usersStr ? JSON.parse(usersStr) : [];
    } catch (e) {
        console.error("Error reading users data:", e);
        return [];
    }
}

function saveUser(user) {
    try {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        return true;
    } catch (e) {
        console.error("Error saving user:", e);
        return false;
    }
}

function saveAllUsers(users) {
    try {
        localStorage.setItem("users", JSON.stringify(users));
        return true;
    } catch (e) {
        console.error("Error saving users:", e);
        return false;
    }
}

function setupEventListeners() {
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", handleSignup);
    }

    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", handleLogin);
    }

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", handleLogout);
    }
}

function handleSignup(e) {
    e.preventDefault();
    
    const fullName = document.getElementById("fullName")?.value.trim();
    const email = document.getElementById("email")?.value.trim().toLowerCase();
    const password = document.getElementById("password")?.value;
    const signupError = document.getElementById("signupError");

    if (signupError) {
        signupError.classList.add("d-none");
    }

    if (!fullName || !email || !password) {
        showError(signupError, "All fields are required");
        return;
    }

    if (password.length < 6) {
        showError(signupError, "Password must be at least 6 characters");
        return;
    }

    const users = getAllUsers();

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        showError(signupError, "Email already registered!");
        return;
    }

    const newUser = {
        fullName: fullName,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    
    if (saveAllUsers(users)) {
        saveUser(newUser);
        updateNavbar();
        
        window.location.href = "index.html";
    } else {
        showError(signupError, "Error creating account. Please try again.");
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById("loginEmail")?.value.trim().toLowerCase();
    const password = document.getElementById("loginPassword")?.value;
    const loginError = document.getElementById("loginError");

    if (loginError) {
        loginError.classList.add("d-none");
    }

    // Validate inputs
    if (!email || !password) {
        showError(loginError, "Please enter email and password");
        return;
    }

    const users = getAllUsers();

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        if (saveUser(user)) {
            updateNavbar();
            
            window.location.href = "index.html";
        } else {
            showError(loginError, "Error logging in. Please try again.");
        }
    } else {
        showError(loginError, "Invalid email or password");
    }
}

function handleLogout(e) {
    e.preventDefault();
    
    try {
        localStorage.removeItem("loggedInUser");
        updateNavbar();
        
        window.location.href = "index.html";
    } catch (e) {
        console.error("Error logging out:", e);
    }
}

function showError(errorElement, message) {
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove("d-none");
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAuth);
} else {
    initAuth();
}