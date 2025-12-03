let track = document.querySelector("[data-cmnjs-slider]");
const time = +track.getAttribute("data-cmnjs-slider") || 2000;
let slides = Array.from(track.children);
let total = slides.length;

let index = 0;
let timer = null;
let ul = document.createElement("ul")
ul.classList.add("list-dot")
track.parentElement.appendChild(ul)
function updateSlides() {
  const prev = (index - 1 + total) % total;
  const next = (index + 1) % total;
  slides.forEach((s, i) => {
    s.style.order = 2;
    s.className = "slide";
    if (ul.children.length === total) return
    let li = document.createElement("li")
    li.innerHTML = `<button onclick="change(${i})"></button>`
    ul.appendChild(li)
  });

  slides[index].style.order = 0;
  slides[index].classList.add("is-active");

  slides[prev].style.order = total - 1;
  slides[prev].classList.add("is-prev");

  slides[next].style.order = 1;
  slides[next].classList.add("is-next");

  Array.from(ul.children).forEach(li => li.classList.remove("is-active"));

  ul.children[index].classList.add("is-active");
}
function startInterval() {
  timer = setInterval(() => {
    index = (index + 1) % total;
    updateSlides();
  }, time);
}
const change = (data) => {
  index = data

  updateSlides();
  clearInterval(timer);
  startInterval();
}
function createDot() {

}
document.addEventListener("DOMContentLoaded", () => {
  updateSlides();
  startInterval();
  createDot();
});