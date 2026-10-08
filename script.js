// ===============================
// NETFLIX CLONE - JAVASCRIPT
// ===============================


// ---------- SEARCH ----------

const searchInput = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");

const movieCards = document.querySelectorAll(".movie-card");


function searchMovies() {

    const searchText = searchInput.value.toLowerCase().trim();

    movieCards.forEach(function(card) {

        const movieTitle = card.querySelector("h3");

        if (movieTitle) {

            const title = movieTitle.textContent.toLowerCase();

            if (title.includes(searchText)) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }
        }

    });

}


// Search button
searchButton.addEventListener("click", searchMovies);


// Search while typing
searchInput.addEventListener("input", searchMovies);


// Press Enter to search
searchInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        searchMovies();

    }

});


// ---------- PLAY BUTTON ----------

const playButton = document.querySelector(
    ".hero-content button:first-of-type"
);


playButton.addEventListener("click", function() {

    alert("▶ Now Playing: Stranger Things");

});


// ---------- MY LIST ----------

const myListButton = document.querySelector(
    ".hero-content button:last-of-type"
);

const myListContainer = document.querySelector("#my-list");


// Get saved movies from localStorage
let myMovies = JSON.parse(
    localStorage.getItem("netflixMyList")
) || [];


// Display My List
function displayMyList() {

    myListContainer.innerHTML = "";


    // If there are no movies
    if (myMovies.length === 0) {

        myListContainer.innerHTML =
            "<p>No movies added yet.</p>";

        return;
    }


    // Create cards
    myMovies.forEach(function(movie) {

        const card = document.createElement("div");

        card.classList.add("movie-card");


        card.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <button class="remove-btn">
                Remove
            </button>
        `;


        myListContainer.appendChild(card);


        // Remove movie
        const removeButton =
            card.querySelector(".remove-btn");


        removeButton.addEventListener("click", function() {

            removeFromMyList(movie.title);

        });

    });

}


// Add movie to My List
function addToMyList(title, image) {

    // Check if movie already exists
    const alreadyExists = myMovies.some(function(movie) {

        return movie.title === title;

    });


    if (alreadyExists) {

        alert("This movie is already in My List!");

        return;
    }


    // Add movie
    myMovies.push({

        title: title,
        image: image

    });


    // Save in browser
    localStorage.setItem(
        "netflixMyList",
        JSON.stringify(myMovies)
    );


    displayMyList();

    alert(title + " added to My List ❤️");

}


// Remove movie
function removeFromMyList(title) {

    myMovies = myMovies.filter(function(movie) {

        return movie.title !== title;

    });


    localStorage.setItem(
        "netflixMyList",
        JSON.stringify(myMovies)
    );


    displayMyList();

}


// Hero My List button
myListButton.addEventListener("click", function() {

    addToMyList(
        "Stranger Things",
        document.querySelector(".movie-card img").src
    );

});


// ---------- ADD BUTTON TO EVERY MOVIE ----------

movieCards.forEach(function(card) {

    const titleElement = card.querySelector("h3");
    const imageElement = card.querySelector("img");


    if (!titleElement || !imageElement) {

        return;

    }


    const addButton = document.createElement("button");

    addButton.textContent = "+ My List";

    addButton.classList.add("add-list-btn");


    card.appendChild(addButton);


    addButton.addEventListener("click", function(event) {

        // Card click ko stop karega
        event.stopPropagation();


        addToMyList(
            titleElement.textContent,
            imageElement.src
        );

    });

});


// ---------- MOVIE CARD CLICK ----------

movieCards.forEach(function(card) {

    card.addEventListener("click", function() {

        const title =
            card.querySelector("h3").textContent;

        alert("🎬 You selected: " + title);

    });

});


// ---------- NAVIGATION ----------

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(function(link) {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        const text = link.textContent;

        if (text === "Home") {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }


        if (text === "Movies") {

            document.querySelector(".movie-section")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }


        if (text === "My List") {

            document.querySelector("#my-list")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }

    });

});


// ---------- LOAD MY LIST ----------

displayMyList();