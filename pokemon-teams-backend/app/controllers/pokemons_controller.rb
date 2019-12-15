class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        options = {
            include: [:trainer]
        }
        render json: PokemonSerializer.new(pokemons, options)
    end 

      # Add Pokemon to trainer if trainer team < 6
    def create    
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name

        pokemon = Pokemon.new(nickname: name, species: species, trainer_id: params[:trainer_id])

        if pokemon.save
        # Send return json
        render json: pokemon
        else
        # Send error json
        render json: { message: 'pokemon not found' }
        end
    end

    def show
        pokemon = Pokemon.find_by(id: params[:id])
        options = {
            include: [:trainer]
          }
        render json: PokemonSerializer.new(pokemon, options)
      end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        render json: pokemon
        pokemon.destroy
    end  
end
