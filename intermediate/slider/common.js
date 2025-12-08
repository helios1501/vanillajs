let track = document.querySelector("[data-cmnjs-slider]");
const time = +track.getAttribute("data-cmnjs-slider") || 2000;
let slides = Array.from(track.children);
let total = slides.length;

let index = 0;
let timer = null;
let ul = document.createElement("ul")
let ulArrow = document.createElement("ul")
ul.classList.add("list-dot")
ulArrow.classList.add("list-arrow")
track.parentElement.appendChild(ul)
track.parentElement.appendChild(ulArrow)
const liNext = document.createElement("li")
const btnNext = document.createElement("button")
btnNext.classList.add("btn-next")
btnNext.addEventListener(('click'), () => {
  index = Math.min(index + 1, total - 1)
  if (index === total - 1) {
    index = 0
  }
  updateSlides()
})
liNext.appendChild(btnNext)

const liPrev = document.createElement("li")
const btnPrev = document.createElement("button")
btnPrev.classList.add("btn-prev")
btnPrev.addEventListener(('click'), () => {
  index = Math.max(index - 1, 0)
  if (index === 0) {
    index = total - 1
  }
  updateSlides()
})
liPrev.appendChild(btnPrev)

ulArrow.appendChild(liPrev)
ulArrow.appendChild(liNext)
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

document.addEventListener("DOMContentLoaded", () => {
  updateSlides();
  startInterval();
});