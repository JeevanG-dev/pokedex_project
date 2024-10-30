import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './pokemonDetails.css'

function PokemonDetail() {
  const { id } = useParams();

  const [pokemon, setPokemon] = useState({});
  const [loading, setIsLoading] = useState(true)

  async function downloadPokemon() {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

    console.log(response.data);

    setPokemon({
      name: response.data.name.toUpperCase(),
      image: response.data.sprites.other.dream_world.front_default,
      weight: response.data.weight,
      height: response.data.height,
      type: response.data.types.map((t) => t.type.name)
    });

    setIsLoading(false)
  }

  useEffect(() => {
    downloadPokemon();
  }, []);

  return (
    <>

    {loading ? "Loading...." : <div className="pokemon-detail-wrapper">
        <div className="pokemon-name">{pokemon.name}</div>
        <img src={pokemon.image} alt="" className="pokemon-image" />
        <div className="pokemon-weight">Weight : {pokemon.weight}</div>
        <div className="pokemon-height">Height : {pokemon.height}</div>
    <div className="types">
    { pokemon.type && pokemon.type.map((t) => <div className="types-individual" key={t}> {t.toUpperCase()} </div>)}
    </div>
    
      </div> }
      
    </>
  );
}

export default PokemonDetail;
