import { useEffect, useState } from "react";
import axios from "axios";
import './pokemonList.css'
import Pokemon from "../Pokemon/Pokemon";

function PokemonList(){

const [pokemonList,setPokemonList] = useState([])
const [isloading, setIsLoading] = useState(true)


   async function downloadPokemon(){
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon') // we are getting the data of list of 20 pokemons
    console.log(response);

    const pokemonResults = response.data.results //here we are filtering the list and getting the result value from the list

  const pokemonResultPromise =  pokemonResults.map((pokemon) => axios.get(pokemon.url)) // here we iterating the array of result and getting the pokemons detail url to get each pokemon details which creates the promises

  const pokemonData = await axios.all(pokemonResultPromise) // passing that promise to axios.all and when the promises gets resloved then it pass the data


  const res = pokemonData.map((poke)=>{

    const pokeList = poke.data

    return {name : pokeList.name, 
        image: pokeList.sprites.other.dream_world.front_default, 
        types: pokeList.types,
        id: pokeList.id
    
    
    }
       


  })

  console.log(res)

  setPokemonList(res)
    setIsLoading(false)
    
   }

   
    useEffect(()=>{
        downloadPokemon()
    },[]) 



    return (
        <>
 <div className="pokemon-list-wrapper">

    <div>Pokemon List</div>
{(isloading) ? " downling" : "data downloaded"}

{pokemonList.map((p) => <Pokemon name={p.name} image={p.image}/>)}

 </div>
        </>
    )


}

export default PokemonList;