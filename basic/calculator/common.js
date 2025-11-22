const screen = document.querySelector("#screen");
const listNumber = document.querySelector(".list-num");
const listControl = document.querySelector(".list-control");

let result = null;
let tempSign = "";
let resetNext = false;

listNumber.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;
  handleNumber(e);
});
const handleNumber = (e) => {
  const value = e.target.textContent;

  if (value === "Clear") {
    screen.value = "0";
    result = null;
    tempSign = "";
    resetNext = false;
    return;
  }

  if (value === "=") {
    if (result !== null && tempSign) {
      const current = Number(screen.value);
      screen.value = calculate(result, current, tempSign);
      result = null;
      tempSign = "";
      resetNext = true;
    }
    return;
  }

  if (resetNext) {
    screen.value = value;
    resetNext = false;
  } else {
    screen.value = screen.value === "0" ? value : screen.value + value;
  }
}
listControl.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;
  handleSign(e)
});
const handleSign = (e) => {
  const sign = e.target.textContent;
  if (sign === "Del") {
    screen.value = screen.value.toString().slice(0, -1)
    if (screen.value.length === 0 || resetNext) screen.value = 0
    return
  }
  if (result === null) {
    result = Number(screen.value);
  } else if (!resetNext) {
    result = calculate(Number(result), Number(screen.value), tempSign);
    screen.value = result;
  }

  tempSign = sign;
  resetNext = true;
}
function calculate(a, b, op) {
  const ops = {
    "+": () => a + b,
    "-": () => a - b,
    "*": () => a * b,
    "/": () => (b === 0 ? "Error" : a / b),
  };
  return ops[op]();
}
document.addEventListener("keydown", (e) => {
  const k = e.key;

  if (!isNaN(k)) {
    handleNumber({ target: { textContent: k } });
  }

  if (["+", "-", "*", "/"].includes(k)) {
    handleSign({ target: { textContent: k } });
  }

  if (k === "Enter") {
    handleNumber({ target: { textContent: "=" } });
  }

  if (k === "Delete" || k === "Escape") {
    handleNumber({ target: { textContent: "Clear" } });
  }

  if (k === "Backspace") {
    screen.value = screen.value.toString().slice(0, -1)
    if (screen.value.length === 0 || resetNext) screen.value = 0
  }
});
