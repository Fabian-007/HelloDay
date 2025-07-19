document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const emailField = document.getElementById("Email-input");
  const passwordField = document.getElementById("password-input");
  const errorMsg = document.getElementById("error-msg");
  const loginBtn = document.getElementById("login-btn");

  loginForm.addEventListener("submit", function (e) {
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

  function login(user) {
    const storedUser = JSON.parse(localStorage.getItem("helloDayUser"));
    // console.log(typeof storedUser)
    // console.log(storedUser)

    if (!storedUser) {
      errorMsg.textContent = "No user found. Please sign up first";
      errorMsg.classList.remove("hidden");
      errorMsg.style.color = "red";
      return;
    } else if (
      user.email === storedUser.email &&
      user.password === storedUser.password
    ) {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "weather.html";
    } else {
      errorMsg.textContent = "invalid email or password";
      errorMsg.classList.remove("hidden");
      errorMsg.style.color = "red";
      return;
    }
  }
});
