const APIKEY = "c6e38f0a967df896cdec8b25d5e25986";
const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c6e38f0a967df896cdec8b25d5e25986&page=2";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?&api_key=${APIKEY}&query= + `;

const main = document.getElementsByTagName("main")[0];
const form = document.getElementsByTagName("form")[0];
const search = document.getElementById("search");

getMovies(APIURL);

async function getMovies(url) {
  const respData = await fetch(url)
    .then((res) => res.json())
    .then((res) => res);
  console.log(respData);
  showMovies(respData.results);
}

async function showMovies(movies) {
  main.innerHTML = "";

  movies
    .filter((movie) => movie.poster_path != null)
    .forEach((movie) => {
      const movieEl = document.createElement("div");
      movieEl.classList.add("movie");

      movieEl.innerHTML = `
    <img
      src="${IMGPATH + movie.poster_path}"
      alt="${movie.original_title}"
    />
    <div class='backdrop'></div>
    <div class="movie-info">
      <h3>${movie.original_title}</h3>
      <span class='${getClassByRate(movie.vote_average)}'>${
        movie.vote_average
      }</span>
  </div>
    <div class='overview'>
    <h4>Overview</h4>
    ${movie.overview}
    <h4>Release Date:
    ${movie.release_date}
    </h4>
    </div>
  `;

      main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
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
