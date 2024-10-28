import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";
import './pokedex.css'


function Pokedex(){

    return (
<div className="pokedex-wrapper">

<h1 id="pokemon-name-search">Pokedex</h1>
<Search/>
<PokemonList/>


</div>


    )

}

export default Pokedex;