const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function() {
  loadTrainers(TRAINERS_URL);
  // loadPokemon(POKEMONS_URL);
  // listenAddButtons();
  // listenReleaseButtons();
  // loadPokemon(POKEMONS_URL);
  setTimeout(() => loadPokemon(POKEMONS_URL), 500)
  setTimeout(() => listenAddButtons(), 500)
  setTimeout(() => listenReleaseButtons(), 600)
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
    <button class="add" data-trainer-id="${trainer.id}">Add Pokemon</button>`
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
  json.data.forEach(pokemon => {
    const tid = pokemon.relationships.trainer.data.id
    const container = document.querySelector(`[data-id="${tid}"]`)
    // debugger;
    ul = document.createElement("ul")
    container.appendChild(ul)
    li = document.createElement("li")
    li.innerHTML = `<li>${pokemon.attributes.nickname} (${pokemon.attributes.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
    ul.appendChild(li)
  })
}

function listenAddButtons() {
  const addBtns = document.querySelectorAll('button.add');
  addBtns.forEach(btn => {
    btn.addEventListener('click', function(event) {
    alert('clicked!');
  });
  })
};

function listenReleaseButtons() {
  const releaseBtns = document.querySelectorAll('button.release');
  releaseBtns.forEach(btn => {
    btn.addEventListener('click', function(event) {
    alert('clicked!');
    });
  })
};