const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function() {
  loadTrainers(TRAINERS_URL);
  // loadPokemon(POKEMONS_URL);
  // listenAddButtons();
  // listenReleaseButtons();
  // loadPokemon(POKEMONS_URL);
  setTimeout(() => loadPokemon(POKEMONS_URL), 1000)
  // setTimeout(() => listenAddButtons(), 500)
  // setTimeout(() => listenReleaseButtons(), 600)
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
    <button class="add" onClick=addPokemon(${trainer.id}) data-trainer-id="${trainer.id}">Add Pokemon</button>`
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
    li.innerHTML = `<li>${pokemon.attributes.nickname} (${pokemon.attributes.species}) <button class="release" onClick=releasePokemon(${pokemon.id}) data-pokemon-id="${pokemon.id}">Release</button></li>`
    ul.appendChild(li)
  })
}

// function listenAddButtons() {
//   const addBtns = document.querySelectorAll('button.add');
//   addBtns.forEach(btn => {
//     btn.addEventListener('click', function(event) {
//     alert('Clicked!');
//   });
//   })
// };

function addPokemon(trainerId) {
  console.log(`${trainerId}`)
  const trainerData = {
    trainer_id: `${trainerId}`
  }
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(trainerData)
  };
  // debugger;
  fetch(POKEMONS_URL, options)
    .then(response => console.log(response))
    .then(object => console.log(object));
    document.location.reload();
    // loadPokemon(TRAINERS_URL);
};

// function sendPokemon() {

// }

// function listenReleaseButtons() {
//   const releaseBtns = document.querySelectorAll('button.release');
//   releaseBtns.forEach(btn => {
//     btn.addEventListener('click', function(event) {
//     alert('clicked!');
//     });
//   })
// };

function releasePokemon(pokemonId) {
  console.log(`${pokemonId}`)
  const pokeId = {
    pokemon_id: `${pokemonId}`
  }
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(pokeId)
  };
  fetch(`http://localhost:3000/pokemons/${pokemonId}`, options)
    .then(response => console.log(response))
    .then(object => console.log(object));
    document.location.reload();
};