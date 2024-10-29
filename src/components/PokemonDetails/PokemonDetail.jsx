import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './pokemonDetails.css'

function PokemonDetail() {
  const { id } = useParams();

  const [pokemon, setPokemon] = useState({});

  async function downloadPokemon() {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

    console.log(response.data);

    setPokemon({
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default,
      weight: response.data.weight,
      height: response.data.height,
      type: response.data.types.map((t) => t.type.name),
    });
  }

  useEffect(() => {
    downloadPokemon();
  }, []);

  return (
    <>
      <div className="pokemon-detail-wrapper">
        <div className="pokemon-name">{pokemon.name.toUpperCase()}</div>
        <img src={pokemon.image} alt="" className="pokemon-image" />
        <div className="pokemon-weight">Weight : {pokemon.weight}</div>
        <div className="pokemon-height">Height : {pokemon.height}</div>
    <div className="types">
    { pokemon.type && pokemon.type.map((n) => <div key={n}>{n}</div>)}
    </div>
    
      </div>
    </>
  );
}

export default PokemonDetail;
