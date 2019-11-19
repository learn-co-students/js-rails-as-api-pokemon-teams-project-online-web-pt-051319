const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", ()=>{
    const main = document.querySelector('main');
    let ul = document.createElement('ul')

    function getTrainers() {
        return fetch(TRAINERS_URL)
            .then(res => res.json())
            .then(json => renderTrainers(json))
        
    }

    function renderTrainers(trainers){
        // console.log(trainers.data)
        trainers.data.forEach(trainer => {
            let div = document.createElement('div')
            // let ul = document.createElement('ul')

            div.setAttribute('class', 'card')
            div.setAttribute('data-id', `${trainer.id}`)

            let par = document.createElement('p')
            par.textContent = `${trainer.attributes["name"]}`
            let btnA = document.createElement('button')
            btnA.setAttribute('data-trainer-id', `${trainer.id}`)
            btnA.textContent = "Add Pokemon"
            btnA.style.backgroundColor = '#008000'
            
            btnA.className = "release"
            Object.values(trainer.relationships.pokemons).forEach(array => {
                    console.log(array)
                    array.forEach(poke_list => {
                        // console.log(poke_list)
                        // getPokemon(poke_list.id)
                    })
                })
            //  console.log(ul)   
            div.append(par, btnA, ul)
            // div.appendChild(ul)
            // trainer.id
            // trainer.attributes["name"]
            // trainer.relationships.pokemons

            main.appendChild(div)
          })   
    }

    function getPokemon(id) {
      return fetch(`${POKEMONS_URL}/${id}`)
        .then(res => res.json())
        .then(json => renderPokemon(json))
    }

    function renderPokemon(pokemon) {
        let att = pokemon.data.attributes
        let li = document.createElement('li')
        li.textContent = `${att['nickname']} (${att['species']})`;
        // li.textContent = "hi"
        ul.append(li)
        // console.log(ul)
        console.log(pokemon.data.attributes)
    }

    // start by rendering Trainers
    getTrainers()
})    


