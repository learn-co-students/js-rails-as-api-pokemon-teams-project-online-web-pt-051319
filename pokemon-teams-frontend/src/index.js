const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
let main = false;

document.addEventListener('DOMContentLoaded', ()=> {
	main = document.querySelector('main');
	buildCard()
})

document.addEventListener('click', () => {
	let element = event.target
	let card = element.parentNode
	if(element.hasAttribute('data-trainer-id')){
		if(parseInt(card.getElementsByTagName('UL')[0].getElementsByTagName('LI').length) > 5) return false;
		let trainerId = element.getAttribute('data-trainer-id')
		fetch(`${TRAINERS_URL}/${trainerId}`, {
			method: 'PATCH',
			headers: {
	      'Content-Type': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify(trainerId)
		}).then(r => r.json()).then((newPokemon) => {
			if(newPokemon.error) console.log(newPokemon.error)
			buildPokemonList([newPokemon], card)
		})
	} else if(element.hasAttribute('data-pokemon-id')){
		//this will fetch to pokemon/:id/delete ?destroy?
		let pokemonId = element.getAttribute('data-pokemon-id')
		fetch(`${POKEMONS_URL}/${pokemonId}`,{
			method: 'delete',
			headers: {
	      'Content-Type': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify(pokemonId)
		}).then(r => r.json()).then((rj) => {
			console.log(rj)
			if(rj) element.parentNode.remove()
		})
	}
})

const buildCard = () => {
	getTrainers().then( (trainers) => {
		getPokemon().then( (pokemon) => {
			trainers.forEach( (trainer) => {
				let myPokemon = pokemon.filter(p => p.trainer_id == trainer.id)
				let myCard = buildTrainer(trainer.name, trainer.id)
				buildPokemonList(myPokemon, myCard)
				main.appendChild(myCard)
			})
		})
	})
}

const getTrainers = () => {
	return fetch(TRAINERS_URL).then(r => r.json())
}

const getPokemon = () => {
	return fetch(`${POKEMONS_URL}`).then(r => r.json())
}

const buildTrainer = (name, id) => {
	let card = document.createElement('div')
	let nameP = document.createElement('p')
	let addButton = document.createElement('button')
	let pokemonUL = document.createElement('ul')
	card.setAttribute('class', 'card')
	card.setAttribute('data-id', id)
	nameP.innerText = name
	addButton.setAttribute('data-trainer-id', id)
	addButton.innerText = 'Add Pokemon'
	card.appendChild(nameP)
	card.appendChild(addButton)
	card.appendChild(pokemonUL)
	return card
}

const buildPokemonList = (pokemons, card) => {
	pokemons.forEach( (pokemon) => {
		let pokemonLI = document.createElement('li')
		let pokemonRemoveButton = document.createElement('button')
		pokemonRemoveButton.setAttribute('class', 'release')
		pokemonRemoveButton.setAttribute('data-pokemon-id', pokemon.id)
		pokemonRemoveButton.innerText = 'Remove'
		pokemonLI.innerHTML = `${pokemon.nickname} (${pokemon.species})`
		pokemonLI.appendChild(pokemonRemoveButton)
		card.querySelector('ul').appendChild(pokemonLI)
	})
}

//main, div.card