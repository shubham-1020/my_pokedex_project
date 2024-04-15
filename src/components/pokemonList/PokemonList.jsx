import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import "./pokemonList.css"
import Pokemon from "../Pokemon/Pokemon";
function PokemonList(){

    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading,setIsLoading] = useState(true) 
    const [pokedexUrl,setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon')
    const [nextUrl,setNextUrl] = useState('')
    const [previousUrl,setPrevioustUrl] = useState('')
    async function downloadPokemon(){
        setIsLoading(true)
        const response = await axios.get(pokedexUrl);      //download the list of 20pokemons lists

        const pokemonResults = response.data.results;       //get the array of the pokemon from result
        console.log(response.data);

        //next and previous
        setNextUrl(response.data.next)
        setPrevioustUrl(response.data.previous)

        //iterate over the array of pokemons, and using their url , to create an array of promises
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url))    

        //passing that promise array to axios.all
        const pokemonData = await axios.all(pokemonResultPromise)
        console.log(pokemonData);   //array of 20 pokemon detailed data

        //iterate on the data of each pokemon and extract the info like name,id,types,img
        const res = (pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {name:pokemon.name,image:pokemon.sprites.other.dream_world.front_default,types:pokemon.types,
            id:pokemon.id,
            }
        }))
        console.log(res);
        setPokemonList(res)

        setIsLoading(false) 
    }
    useEffect(() => {
      downloadPokemon();
    },[pokedexUrl])

   
    return (
        <>
        <div className="pokemon-list-wrapper">
            
            <div className="pokemon-wrapper">
                {(isLoading) ? 'Loading...' : pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id}/>)}
            </div>
            <div className="controls">

                <button disabled={previousUrl == null} onClick={() => setPokedexUrl(previousUrl) }>Prev</button>

                <button disabled={nextUrl == null} onClick={() => setPokedexUrl(nextUrl) }>Next</button>
            </div>
        </div>
        </>
    )
}
export default PokemonList;