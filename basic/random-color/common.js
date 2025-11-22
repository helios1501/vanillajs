const code = document.getElementById("code")
const btnRandom = document.querySelector("[data-cmnjs-random")
let color = ""

const randomColor = () => {
  const chars = '0123456789ABCDEF';
  color = '#' +  Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  code.innerHTML = color
  document.body.style.backgroundColor = color
}

btnRandom.addEventListener("click", randomColor)
document.addEventListener("DOMContentLoaded", randomColor)