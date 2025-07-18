document.addEventListener("DOMContentLoaded", ()=>{

const loginForm = document.getElementById("login-form")
const email = document.getElementById("Email-input")
const password = document.getElementById("password-input")
const loginBtn = document.getElementById("login-btn")


loginForm.addEventListener("submit", function(e){
   e.preventDefault()
   const Email = email.value.trim()
   const Password = password.value.trim()
   console.log(Email, Password)
   const user = {email, password}
   localStorage.setItem("helloDayUser",  JSON.stringify(user))
   console.log(user)
})
})