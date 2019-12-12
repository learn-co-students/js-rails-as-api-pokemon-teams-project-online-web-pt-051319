class PokemonsController < ApplicationController

    def create
        trainer_id = params[:trainer_id]

        if Trainer.find(trainer_id).pokemons.length < 6
            name = Faker::Name.first_name
            species = Faker::Games::Pokemon.name
            pokemon = Pokemon.create({
                nickname: name,
                species: species,
                trainer_id: trainer_id
            })
            render json: PokemonSerializer.new(pokemon)
        else
            render json: {"error" => "You have too many pokemon"}
        end
    end

    def destroy
        pokemon = Pokemon.find(params[:pokemon_id])
        pokemon.delete
        render json: PokemonSerializer.new(pokemon)
    end

end
