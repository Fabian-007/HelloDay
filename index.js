document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const emailField = document.getElementById("Email-input");
  const passwordField = document.getElementById("password-input");
  const errorMsg = document.getElementById("error-msg");
  const signUpForm = document.getElementById("signUp");
  const confrimPasswordField = document.getElementById(
    "confirm-password-input"
  );

  // if(loginForm) before the event listener
  // prevents "Cannot read properties of null" errors when using the same script on multiple pages.
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      errorMsg.textContent = "";
      errorMsg.classList.add("hidden");

      const email = emailField.value.trim();
      const password = passwordField.value.trim();

      if (email === "" || password === "") {
        errorMsg.textContent = "Please fill in both fields.";
        errorMsg.classList.remove("hidden");
        errorMsg.style.color = "red";

        return;
      }
      const user = { email, password };
      login(user);
      // console.log(email, password)
      // console.log(user)
    });
  }

  function login(user) {
    const storedUsers = JSON.parse(localStorage.getItem("helloDayUsers"));
    const validUser = storedUsers.find(
      (u) => u.email === user.email && u.password === user.password
    );
    // console.log(typeof storedUser)
    // console.log(storedUser)

    if (!validUser) {
      errorMsg.textContent = "invalid email or password";
      errorMsg.classList.remove("hidden");
      errorMsg.style.color = "red";
      return;
    }

    errorMsg.textContent = "Login successful! Redirecting...";
    errorMsg.classList.remove("hidden");
    errorMsg.style.color = "green";
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("helloDayUser", JSON.stringify(validUser));

    setTimeout(() => {
      window.location.href = "weather.html";
    }, 1500); // 1.5 seconds
  }

  function signUp() {
    const newEmail = emailField.value.trim();
    const newPassword = passwordField.value.trim();
    const confirmPassword = confrimPasswordField.value.trim();

    errorMsg.textContent = "";
    errorMsg.classList.add("hidden");

    if (newEmail === "" || newPassword === "" || confirmPassword === "") {
      errorMsg.textContent = "Please fill all fields.";
      errorMsg.classList.remove("hidden");
      errorMsg.style.color = "red";
      return;
    }

    if (newPassword !== confirmPassword) {
      errorMsg.textContent = "passwords do not match";
      errorMsg.classList.remove("hidden");
      errorMsg.style.color = "red";
      return;
    }

    const newUser = { email: newEmail, password: newPassword };
    const storedUsers = JSON.parse(localStorage.getItem("helloDayUsers")) || [];
    const userExist = storedUsers.some((user) => user.email === newEmail);
    if (userExist) {
      errorMsg.textContent = "User already exist please, log in";
      errorMsg.classList.remove("hidden");
      errorMsg.style.color = "red";
      return;
    }

    storedUsers.push(newUser);
    localStorage.setItem("helloDayUsers", JSON.stringify(storedUsers));
    localStorage.setItem("helloDayUser", JSON.stringify(newUser));
    window.location.href = "index.html";
  }

  if (signUpForm) {
    signUpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      signUp();
    });
  }
});
