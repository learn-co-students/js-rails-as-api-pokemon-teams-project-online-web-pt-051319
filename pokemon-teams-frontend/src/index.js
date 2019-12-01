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
    const card = document.createElement("div");
    card.classList.add("card")
    card.setAttribute("data-id", `${trainer.id}`)
    card.innerHTML = `<p>${trainer.attributes.name}</p>
    <button data-trainer-id="${trainer.id}">Add Pokemon</button>`
    main.appendChild(card)
    const ul = document.createElement("ul")
    card.appendChild(ul)
  })
}

function loadPokemon(POKEMONS_URL) {
  fetch(POKEMONS_URL)
    .then(res => res.json())
    .then(json => renderPokemon(json));
}

function renderPokemon(json) {

}
