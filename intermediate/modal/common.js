const wrapModal = document.querySelector("[data-cmnjs-modal]")
const wrapNoti = document.querySelector("[data-cmnjs-noti]")

wrapModal.addEventListener("click", (e) => {
  const btn = e.target.closest("button")
  if (!btn) return
  wrapModal.classList.add("active");
})


document.addEventListener("click", (e) => {
  const modalArea = wrapModal.querySelector("[data-cmnjs-area]");
  if (!wrapModal.classList.contains("active")) return;

  if (modalArea.contains(e.target)) return;

  if (wrapModal.contains(e.target) && e.target.closest("button")) return;

  wrapModal.classList.remove("active");
})


wrapNoti.addEventListener("click", (e) => {
  const btn = e.target.closest("button")
  const time = wrapNoti.getAttribute("data-cmnjs-noti")
  if (!btn) return
  wrapNoti.classList.add("active")
  setTimeout(() => {
    wrapNoti.classList.remove("active")
  }, time ? time : 1000)
})