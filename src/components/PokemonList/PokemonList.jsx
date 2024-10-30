import { useEffect, useState } from "react";
import axios from "axios";
import "./pokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");


const [nextUrl, setNextUrl] = useState('')
const [preUrl,setPreUrl] = useState('')


  async function downloadPokemon() {
    const response = await axios.get(url); // we are getting the data of list of 20 pokemons
    console.log(response);

    const pokemonResults = response.data.results; //here we are filtering the list and getting the result value from the list

    const pokemonResultPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    ); // here we iterating the array of result and getting the pokemons detail url to get each pokemon details which creates the promises

    const pokemonData = await axios.all(pokemonResultPromise); // passing that promise to axios.all and when the promises gets resloved then it pass the data

    const res = pokemonData.map((poke) => {
      const pokeList = poke.data;

      return {
        name: pokeList.name.toUpperCase(),
        image: pokeList.sprites.other
          ? pokeList.sprites.other.dream_world.front_default
          : pokeList.sprites.front_shiny,
        types: pokeList.types,
        id: pokeList.id,
      };
    });

    console.log(res);


setNextUrl(response.data.next)

setPreUrl(response.data.previous)

    setPokemonList(res);
    setIsLoading(false);
  }

  useEffect(() => {
    downloadPokemon();
  }, [url]);

  return (
    <>
      <div className="pokemon-list-wrapper">
        <div className="pokemon-wrapper">
          {isloading
            ? " loading...."
            : pokemonList.map((p) => <Pokemon name={p.name} image={p.image} id={p.id} />)}
        </div>

        <div className="controls">
          <button disabled={preUrl == null} onClick={()=> setUrl(preUrl)} >Previous</button>
          <button disabled={nextUrl == null} onClick={()=> setUrl(nextUrl)}>Next</button>
        </div>
      </div>
    </>
  );
}

export default PokemonList;
