//Elements HTML
const input = document.getElementById("movie-search");
const button = document.querySelector(".btn");
const main = document.getElementById("main");

//Event Listener - Search button
button.addEventListener("click", (e) => {
    e.preventDefault();
	main.innerHTML = "";
	createCardId();
});

//Get ID for each movie
async function getId() {
	const movieData = await fetch(`https://www.omdbapi.com/?s=${input.value}&apikey=20dae0a7`);
	return await movieData.json();
}

//Create a new Card with Id
async function createCardId() {
	const movieData = await getId();
	movieData.Search.forEach(item => {
		main.innerHTML += `
            <div class="card mb-5 border-0 p-2" data-anchor="${item.imdbID}"></div>`;
	});

    //target new attribute with ID
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        let imdbID = card.getAttribute("data-anchor");
        let url = `https://www.omdbapi.com/?apikey=20dae0a7&i=${imdbID}`;
        getData(url, card);
    });
}

//Get detailed data for each card
async function getData(url, card) {
    try {
        const resObj = await fetch(url);
        const data = await resObj.json();
        display(data, card);
    } catch (error) {
        console.log(error);
    }
}

//Display cards with detailed data
function display(data, card) {
    card.innerHTML += `
            <div class="row g-0">
                <div class="col-md-4 text-center">
                    <img src="${data.Poster}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8 d-flex justify-content-center align-items-center">
                    <div class="card-body">
                        <h1 class="card-title mb-4 fw-bold">${data.Title}</h1>
                        <p class="card-text fs-4"><span class="fw-bold">Released: </span> ${data.Released}</p>
                        <p class="card-text fs-4"><span class="fw-bold">Genre: </span> ${data.Genre}</p>
                        <p class="card-text fs-4"><span class="fw-bold">Actors: </span>${data.Actors}</p>
                        <p class="card-text fs-4">${data.Plot}</p>
                        <p class="card-text fs-4"><small class="text-muted">Score: ${data.imdbRating}</small></p>
                    </div>
                </div>
            </div>
    `
}