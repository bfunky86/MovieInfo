let key = config.key;
const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=" +
  key +
  "&page=1";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=" + key + "&query=";

const movieEl = document.querySelector(".movie");

const main = document.querySelector("#main");
const form = document.getElementById("form");
const search = document.getElementById("search");

console.log(key);

//initally get popular movies
getMovies(APIURL);

async function getMovies(url) {
  const resp = await fetch(url);
  const responseData = await resp.json();

  showMovies(responseData.results);
}

function showMovies(movies) {
  //clear main
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `<img src="${IMGPATH + poster_path}" alt="${title}" />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class=${getClassByRate(vote_average)}>${vote_average}</span>
        </div>
        <div class="overview">
        <h3>Overview: </h3>
        ${overview}</div>
        `;
    if (poster_path) {
      main.appendChild(movieEl);
    }
  });
}

function getClassByRate(vote) {
  if (vote > 7) {
    return "green";
  } else if (vote < 5) {
    return "red";
  } else {
    return "white";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(SEARCHAPI + searchTerm);
    search.value = "";
  }
});
