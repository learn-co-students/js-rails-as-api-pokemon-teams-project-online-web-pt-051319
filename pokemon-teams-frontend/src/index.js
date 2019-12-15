const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", ()=>{
    const main = document.querySelector('main');

    function getTrainers() {
        return fetch(TRAINERS_URL)
            .then(res => res.json())
            .then(json => renderTrainers(json))
        
    }

    function renderTrainers(trainers){
        trainers.data.forEach(trainer => {
            let ul = document.createElement('ul')
            ul.id = "ul_poke"
            let div = document.createElement('div')
                div.setAttribute('class', 'card')
                div.setAttribute('data-id', `${trainer.id}`)

            let par = document.createElement('p')
                par.textContent = `${trainer.attributes["name"]}`
            let btnA = document.createElement('button')
                btnA.setAttribute('data-trainer-id', `${trainer.id}`)
                btnA.textContent = "Add Pokemon"
                btnA.style.backgroundColor = '#008000'
                btnA.className = "add"
            linebreak = document.createElement("br");
    
            renderPokemon(trainer.id, ul)
        
            div.append(par, btnA, linebreak, ul)
            main.appendChild(div)
          })  
         


          
    }

    function getPokemon(trainerid) {
      return fetch(`${TRAINERS_URL}/${trainerid}`)
        .then(res => res.json())
        .then(json => json)
    }

    function renderPokemon(trainerid, ul) {
        getPokemon(trainerid).then(json => {
        pokemons = json.data.attributes.pokemons
        pokemons.forEach((pokemon) => {
            const listTemplate =  `
            <li> ${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}" >Release</button></li>
            `
            ul.innerHTML += listTemplate
            })  
        })
    }

    function listenEvents() {
        main.addEventListener("click", function(event) {
            const releaseBtn = event.target.className === 'release'
            const addBtn = event.target.className === 'add'

            if (releaseBtn) {
                releasePokemon(event)
            } else if (addBtn) {
                addPokemon(event)
            }
        })
          
    }

    function releasePokemon(e) {
        let configObj = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
          }
        const pokemonId = parseInt(event.target.dataset.pokemonId)
        let deleteURL = POKEMONS_URL + `/${pokemonId}`
        event.target.parentElement.remove()
        fetch(deleteURL, configObj)
        .then(function(response) {
          return response.json()
        })
        .catch(function(error) {
          main.innerHTML = error.message
        })  
    }

    function addPokemon(e) {
        const teamLength = e.target.parentNode.querySelectorAll("#ul_poke li").length

        if (teamLength >= 6) {
            alert("Maximum team size limit exceeded!");
        } else {

        let ul = e.target.parentNode.querySelector('ul')
        trainerId = e.target.dataset.trainerId

        let configObj = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            "trainer_id": trainerId
          })
        }
      
        fetch(POKEMONS_URL, configObj)
        .then(function(response) {
          return response.json()
        })
        .then(function(pokemon) {
            // Build pokemon li 
            const list =  `
            <li> ${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}" >Release</button></li>
            `
            ul.innerHTML += list
        })  
        .catch(function(error) {
          main.innerHTML = error.message
        }) 
        }
    }

    function test(object) {
        console.log(object.nickname)
    }

    // start by rendering Trainers
    getTrainers()

    // listen events
    listenEvents()


})    


