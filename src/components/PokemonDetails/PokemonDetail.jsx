import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PokemonDetail() {

    const {id} = useParams()

    const[pokemon, setPokemon] = useState({})

    async function downloadPokemon() {
        
        const response =  await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)

        console.log(response.data);
        
setPokemon({
    name:response.data.name,
    image:response.data.sprites.other.dream_world.front_default,
    weight: response.data.weight,
    height:response.data.height,
    type:response.data.types.map((t) => t.type.name )

})


    }


    useEffect(()=>{

downloadPokemon()

    },[])





  return <>


<h1>
    Name - {pokemon.name}
    
</h1>

<img src={pokemon.image} alt="" />
<h2>{pokemon.weight} pound</h2>
<h2> Height - {pokemon.height}</h2>

  </>;
}

export default PokemonDetail;
