const time = document.getElementById("time")

const getTime = () => {
  setInterval(updateClock, 1000)
}
const updateClock = () => {
  const currentTime = new Date()
  const date = currentTime.getDate().toString().padStart(2, "0");
  const month = (currentTime.getMonth() + 1).toString().padStart(2, "0");;
  const year = currentTime.getFullYear();

  const hour = currentTime.getHours().toString().padStart(2, "0");;
  const min = currentTime.getMinutes().toString().padStart(2, "0");;
  const sec = currentTime.getSeconds().toString().padStart(2, "0");;
  time.textContent = `${date}/${month}/${year} - ${hour}:${min}:${sec}`
}
document.addEventListener("DOMContentLoaded", getTime)