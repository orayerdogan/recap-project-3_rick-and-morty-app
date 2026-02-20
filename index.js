import { createCharacterCard } from "./components/CharacterCard/CharacterCard.js";
//import { setupButtons } from "./components/NavButton/NavButton.js";
//import { updatePaginationDisplay } from "./components/NavPagination/NavPagination.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]',
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

let page = 1;
let maxPage = 1;
const searchQuery = "";

//fetchCharacters function
async function fetchCharacters() {
  try {
    cardContainer.innerHTML = "";

    //
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page${page}`,
    );
    const data = await response.json();
    maxPage = data.info.pages; //update maxPage API info

    //create&append card
    data.results.forEach((character) => {
      const card = createCharacterCard(character);
      cardContainer.appendChild(card);
    });
    pagination.textContent = `${page} / ${maxPage}`; //updates the paginations display
  } catch (error) {
    console.error("Error fetching characters:", error);
  }
}
prevButton.addEventListener("click", () => {
  if (page > 1) {
    page--;
    fetchCharacters();
  }
});

nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    page++;
    fetchCharacters();
  }
});
fetchCharacters();
