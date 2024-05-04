import PokemonList from "../pokemonList/PokemonList";
import "./Search.css"
function Search(){
    return(
        <div className="search-wrapper" >
            <input type="text"
            id="pokemon-name-search"
            placeholder="pokemon Name.."
            />
           
        </div>
    )
}

export default Search;