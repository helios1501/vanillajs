const movieList = document.getElementById("movieList");
const input = document.getElementById("searchInput");
const btn = document.getElementById("searchBtn");
const movies = []
const renderMovies = (list) => {
  movieList.innerHTML = list.map(m => `
      <li class="movie-card" id="${m.imdbID}">
        <img src="${m.Poster}" alt="${m.Title}">
        <h3>${m.Title}</h3>
        <p>${m.Year}</p>
      </li>
    `).join("");
}

const searchFilm = async () => {
  const value = input.value.trim();
  movies.length = 0
  if (!value) return;
  const res = await fetch(`http://www.omdbapi.com/?t=${value}&apikey=20efebad&plot=full`)
  const data = await res.json();
  movies.push(data)
  renderMovies(movies);
}
const tempModal = (id) => {
  const m = movies.find(movie => movie.imdbID === id)
  return `<div class="popup" id="popup">
      <div class="popup-header">
        <h2 id="movieTitle">${m.Title}</h2>
        <span class="close" id="btnClose">&times;</span>
      </div>

      <div class="popup-content">
        <img id="moviePoster" class="poster" src="${m.Poster}" alt="${m.Title}">
        <div class="info">
          <p><strong>Year:</strong> ${m.Year}</p>
          <p><strong>Runtime:</strong> ${m.Runtime}</p>
          <p><strong>Genre:</strong>  ${m.Genre}</p>
          <p><strong>Director:</strong> ${m.Director}</p>
          <p><strong>Writer:</strong> ${m.Writer}</p>
          <p><strong>Actors:</strong> ${m.Actors}</p>
          <p><strong>Plot:</strong> ${m.Plot}</p>
          <p><strong>Rating:</strong> ${m.Ratings[0].Value}</p>
        </div>
      </div>
    </div>`
}
btn.addEventListener("click", searchFilm)
movieList.addEventListener("click", (e) => {
  const li = e.target.closest(".movie-card")
  if (!li) return;
  const wrapper = document.createElement("div");
  wrapper.innerHTML = tempModal(li.id);
  document.body.appendChild(wrapper.firstElementChild);
  document.getElementById("btnClose").addEventListener("click", () => {
    document.getElementById("popup").remove();
  })
})