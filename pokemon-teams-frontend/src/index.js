const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function() {
  loadTrainers();
  loadPokemon();
});

function loadTrainers(TRAINERS_URL) {
  fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(json => renderTrainers(json));
}

function renderTrainers(json) {
  const main = document.querySelector('main')
  json.data.forEach(trainer => {
    // const card = main.createElement('div')
    const card = document.createElement("div");
    card.classList.add("card")
    card.innerHTML = `<p>${trainer.attributes.name}</p>`
    main.appendChild(card)
  })
}

// function addPokemonButton() {
//   const btn = document.createElement("button");
//   btn.innerHTML = "Add Pokemon";
//   const card = document.querySelector("div");
//   card.appendChild(btn)
// }

function loadPokemon(POKEMONS_URL) {
  fetch(POKEMONS_URL)
    .then(res => res.json())
    .then(json => renderPokemon(json));
}

function renderPokemon(json) {

}
