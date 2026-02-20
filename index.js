import { createCharacterCard } from "./components/CharacterCard/CharacterCard.js";

const cardContainer = document.querySelector('[data-js="card-container"]');

//for what?
// const searchBarContainer = document.querySelector(
//   '[data-js="search-bar-container"]',
// );
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

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
    pagination.textContent = `${page} / ${maxPage}`; //updates the paginations display
  } catch (error) {
    console.error("Error fetching characters:", error);
  }
}
searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.target);
  const dataObject = Object.fromEntries(data);
  searchQuery = dataObject.query;
  fetchCharacters();
  event.target.reset();
  event.target.elements.query.focus();
});

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
