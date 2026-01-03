const wrapInput = document.querySelectorAll(".wrap-input")
wrapInput.forEach(el => {
  el.children[0].addEventListener("change", (e) => handleOnChange(e))
})
const handleOnChange = (e) => {
  let value = e.target.value
  let id = e.target.id
  let result = false;
  let error = document.querySelector(".error-text")
  error.style.display = "none"
  e.target.style.borderColor = "black";
  if (!value) {
    e.target.style.backgroundColor = "transparent";
    return
  };
  switch (id) {
    case "email":
      result = validateEmail(value)
      if (!result) {
        e.target.classList.add("error")
        error.style.display = "block"
      } else {
        e.target.style.borderColor = "green";
      }
      break;
    case "password":
      result = validatePassword(value)
      if (!result) {
        e.target.classList.add("error")
      } else {
        e.target.style.borderColor = "green";
      }
      break;
    default:
      break;
  }
}
const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const validatePassword = (password) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)
}