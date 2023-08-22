// Titles: https://www.omdbapi.com/?s=thor&page=1&apikey=bfd6b563
// details: http://www.omdbapi.com/?i=tt3896198&apikey=bfd6b563

// its make a favourites movie array if its not exist in local storage
if (localStorage.getItem("favouritesList") == null) {
    localStorage.setItem("favouritesList", JSON.stringify([]));
}

// its fetch movies from api and return it
async function fetchMoviesFromApi(url) {
    const response = await fetch(`${url}`);
    const movies = await response.json();
    if (movies.Response == "True")
        console.log(movies.Search);
    return movies.Search;
}

async function fetchMoviesFromApiId(Id) {
    let url = (`https://www.omdbapi.com/?i=${Id}&apikey=bfd6b563`);
    const response = await fetch(url);
    const movies = await response.json();
    if (movies.Response == "True")
        console.log(movies.Search);
    return movies.Search;
}

// its show's all movies card in main acording to search input value
function showMovieList() {
    let inputValue = document.getElementById("my-search").value;
    let arr = JSON.parse(localStorage.getItem("favouritesList"));
    let url = `https://www.omdbapi.com/?s=${inputValue}&page=1&apikey=bfd6b563`;
    let html = "";
    let movies = fetchMoviesFromApi(url);
    movies.then(data => {
        // console.log(data);
        if (data) {
            data.forEach((element) => {
                // console.log(element);
                let isFav = false;
                let id = element.imdbID;
                for (let index = 0; index < arr.length; index++) {
                    if (arr[index] == element.imdbID) {
                        isFav = true;
                    }
                }
                // console.log(element.imdbID);
                if (isFav) {
                    html += `
                <div id="card" class="card mb-3" style="width: 20rem;">
                    <img src="${element.Poster
                        }" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${element.Title}</h5>
                        <div class="d-flex justify-content-between mt-5">
                            <button type="button" class="btn btn-outline-light" onclick="showMovieDetails('${id}')">More Details</button>
                            <button id="main${id}" class="btn btn-outline-light active" onclick="addRemoveToFavList('${id}')" style="border-radius:50%"><i class="fa-solid fa-heart"></i></button>
                        </div>
                    </div>
                </div>
                `;
                } else {
                    html += `
                <div id="card" class="card mb-3" style="width: 20rem;">
                    <img src="${element.Poster
                        }" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${element.Title}</h5>
                        <div class="d-flex justify-content-between mt-5">
                            <button type="button" class="btn btn-outline-light" onclick="showMovieDetails('${id}')">More Details</button>
                            <button id="main${id}" class="btn btn-outline-light" onclick="addRemoveToFavList('${id}')" style="border-radius:50%"><i class="fa-solid fa-heart"></i></button>
                        </div>
                    </div>
                </div>
                `;
                }
            });
        } else {
            html += `
            <div class="page-wrap d-flex flex-row align-items-center">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-12 text-center">
                            <span class="display-1 d-block">404</span>
                            <div class="mb-4 lead">
                                The movie you are looking for was not found.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
        // let movieListItem = document.querySelectorAll(".card");
        // movieListItem.dataset.id = element.imdbID;
        document.getElementById("main").innerHTML = html;
    });
}

//its shows full movie details in main
async function showMovieDetails(id) {
    let url = (`https://www.omdbapi.com/?i=${id}&apikey=bfd6b563`);
    let html = "";
    const response = await fetch(`${url}`);
    await response.json().then((details) => {
        console.log(details);
        html += `
        <div class = "movie-poster">
            <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
        </div>
        <div class = "movie-info">
            <h3 class = "movie-title">${details.Title}</h3>
            <ul class = "movie-misc-info">
                <li class = "year">Year: ${details.Year}</li>
                <li class = "rated">Ratings: ${details.Rated}</li>
                <li class = "released">Released: ${details.Released}</li>
            </ul>
            <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
            <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
            <p class = "actors"><b>Actors: </b>${details.Actors}</p>
            <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
            <p class = "language"><b>Language:</b> ${details.Language}</p>
            <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
        </div>
        `
            ;
    });
    document.getElementById("main").innerHTML = html;
}
// }


// its shows all favourites movies in favourites body
async function showFavMovieList() {
    let arr = JSON.parse(localStorage.getItem("favouritesList"));
    console.log(arr);
    let html = "";
    if (arr.length == 0) {
        html += `
            <div class="page-wrap d-flex flex-row align-items-center">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-12 text-center">
                            <span class="display-1 d-block">404</span>
                            <div class="mb-4 lead">
                                No movie added in your favourites list.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
    } else {
        for (let index = 0; index < arr.length; index++) {
            let url = (`https://www.omdbapi.com/?i=${arr[index]}&apikey=bfd6b563`);
            const response = await fetch(`${url}`);
            await response.json().then(data => {
                console.log(data);
                html += `
                <div id="card" class="card mb-3" style="width: 20rem;">
                    <img src="${data.Poster}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${data.Title}</h5>
                        <div class="d-flex justify-content-between mt-5">
                            <button type="button" class="btn btn-outline-light" onclick="showMovieDetails('${data.imdbID}')">More Details</button>
                            <button id="main${data.imdbID}" class="btn btn-outline-light active" onclick="addRemoveToFavList('${data.imdbID}')" style="border-radius:50%"><i class="fa-solid fa-heart"></i></button>
                        </div>
                    </div>
                </div>
                `;
            });
        }
    }
    document.getElementById("favourites-body").innerHTML = html;
}


//its adds and remove movies to favourites list
function addRemoveToFavList(id) {
    let arr = JSON.parse(localStorage.getItem("favouritesList"));
    let contain = false;
    for (let index = 0; index < arr.length; index++) {
        if (id == arr[index]) {
            contain = true;
        }
    }
    if (contain) {
        let number = arr.indexOf(id);
        arr.splice(number, 1);
        alert("your movie removed from your favourites list");
    } else {
        arr.push(id);
        alert("your movie add your favourites list");
    }
    localStorage.setItem("favouritesList", JSON.stringify(arr));
    showMovieList();
    showFavMovieList();
}




