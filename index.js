import CharacterCard from "./components/CharacterCard/CharacterCard.js";
import NavButton from "./components/NavButton/NavButton.js";
import NavPagination from "./components/NavPagination/NavPagination.js";
import SearchBar from "./components/SearchBar/SearchBar.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
    '[data-js="search-bar-container"]',
);
const navigation = document.querySelector('[data-js="navigation"]');

let page = 1;
let maxPage = 1;
let searchQuery = "";

const prevButton = NavButton("prev", () => {
    if (page > 1) {
        page--;
        fetchCharacters();
    }
});

const nextButton = NavButton("next", () => {
    if (page <= maxPage) {
        page++;
        fetchCharacters();
    }
});

const pagination = NavPagination();

navigation.append(prevButton, pagination, nextButton);

const searchBar = SearchBar((event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const dataObject = Object.fromEntries(data);
    searchQuery = dataObject.query;
    page = 1;
    fetchCharacters();
    event.target.reset();
    event.target.elements.query.focus();
});

searchBarContainer.append(searchBar);

async function fetchCharacters() {
    try {
        cardContainer.innerHTML = "";

        const response = await fetch(
            `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery}`,
        );
        const data = await response.json();
        maxPage = data.info.pages;

        data.results.forEach((character) => {
            const card = CharacterCard(character);
            cardContainer.appendChild(card);
        });

        pagination.textContent = `${page} / ${maxPage}`;

    } catch (error) {
        console.error("Error fetching characters:", error);
    }
}

fetchCharacters();
