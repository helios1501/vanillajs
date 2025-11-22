const handleNumber = (action) => {
  var number = document.getElementById("number").innerHTML;
  switch (action) {
    case "plus":
      number = parseInt(number) + 1
      break;
    case "minus":
      number = parseInt(number) - 1
      break;
    case "reset":
      number = 0
      break;
    default:
      break;
  }
  document.getElementById("number").innerHTML = number
}
const btnPlus = document.querySelector("[data-cmnjs-btn-plus]");
const btnMinus = document.querySelector("[data-cmnjs-btn-minus]");
const btnReset = document.querySelector("[data-cmnjs-btn-reset]");

btnPlus.addEventListener("click", () => handleNumber("plus"))
btnMinus.addEventListener("click", () => handleNumber("minus"))
btnReset.addEventListener("click", () => handleNumber("reset"))