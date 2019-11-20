class TrainerSerializer
  include FastJsonapi::ObjectSerializer
  # has_many :pokemons
  attributes :name, :pokemons

  # define pokemons manually
  def pokemons
    object.pokemons.map do |pokemon|
      ::PokemonSerializer.new(pokemons).attributes
    end
  end

end
