import { createCharacterCard } from "./components/CharacterCard/CharacterCard.js";

const cardContainer = document.querySelector('[data-js="card-container"]');

const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]',
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButtons = document.querySelectorAll('[data-js="button-prev"]');
const nextButtons = document.querySelectorAll('[data-js="button-next"]');
const paginations = document.querySelectorAll('[data-js="pagination"]');

let page = 1;
let maxPage = 1;
let searchQuery = "";

//fetchCharacters function
async function fetchCharacters() {
  try {
    cardContainer.innerHTML = "";

    //
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery}`,
    );
    const data = await response.json();
    maxPage = data.info.pages; //update maxPage API info

    //create&append card
    data.results.forEach((character) => {
      const card = createCharacterCard(character);
      cardContainer.appendChild(card);
    });

    paginations.forEach((pagination) => {
      pagination.textContent = `${page} / ${maxPage}`;
    });

    //pagination.textContent = `${page} / ${maxPage}`;
  } catch (error) {
    console.error("Error fetching characters:", error);
  }
}
searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.target);
  const dataObject = Object.fromEntries(data);
  searchQuery = dataObject.query;
  page = 1;
  fetchCharacters();
  event.target.reset();
  event.target.elements.query.focus();
});

prevButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (page > 1) {
      page--;
      fetchCharacters();
    }
  });
});

// --------------------
// Next Buttons
// --------------------
nextButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (page < maxPage) {
      page++;
      fetchCharacters();
    }
  });
});

// prevButton.addEventListener("click", () => {
//   if (page > 1) {
//     page--;
//     fetchCharacters();
//   }
// });

// nextButton.addEventListener("click", () => {
//   if (page < maxPage) {
//     page++;
//     fetchCharacters();
//   }
// });
fetchCharacters();
