const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', loadTrainers())

function loadTrainers() {
    fetch(TRAINERS_URL)
       .then(resp => resp.json())
       .then(data => displayTrainers(data))
}

function displayTrainers(data) {
    console.log(data);
    data["data"].forEach(trainer => {
        attributes = trainer['attributes']

        const card = document.createElement('div')
        card.className = 'card'
        card.setAttribute('data-id', trainer.id)
        
        const pTrainerName = document.createElement('p')
        pTrainerName.innerHTML = attributes.name
        
        const button = document.createElement('button')
        button.setAttribute('data-trainer-id', trainer.id)
        button.innerHTML = 'Add Pokemon'
        button.addEventListener('click', addPokemon)

        const pokemonsList = document.createElement('ul')

        const main = document.querySelector('main')
        main.appendChild(card)
        card.appendChild(pTrainerName)
        card.appendChild(button)
        card.appendChild(pokemonsList)

        const pokemons = attributes.pokemons
        pokemons.forEach(pokemon => listPokemon(pokemon, trainer.id))

    });
}

function addPokemon(event) {
    const trainerId = event.target.attributes['data-trainer-id'].value
    const configurationObject = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "trainer_id": trainerId
        })
      };

    fetch(POKEMONS_URL, configurationObject)
        .then(resp => resp.json())
        .then(data => console.log(data))
}


function listPokemon(pokemon, trainerId) {
    console.log(trainerId)
    const trainerDiv = document.querySelector(`div[data-id='${trainerId}']`)
    const trainerPokemons = trainerDiv.getElementsByTagName('ul')
    const li = document.createElement('li')
    li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
    const button = document.createElement('button')
    button.className = 'release'
    button.innerHTML = 'Release'
    button.setAttribute('data-pokemon-id', pokemon.id)
    li.appendChild(button)

    trainerPokemons.appendChild(li)
}