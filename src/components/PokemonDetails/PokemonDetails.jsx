// npm react-router-dom
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import {useParams} from 'react-router-dom'
import "./PokemonDetails.css"
function PokemonDetails(){
    const {id} = useParams();
    const [pokemon,setPokemon] = useState({})
    async function downloadPokemon(){

        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        setPokemon({
            name:response.data.name,
            image:response.data.sprites.other.dream_world.front_default,
            weight:response.data.weight,
            height:response.data.height,
            types:response.data.types.map((t) => t.type.name)
        })
        console.log(response.data);
    }

    useEffect(()=>{
        downloadPokemon();
    },[])

    return (
        <div className='pokemon-details-wrapper'>
            <div className='pokemon-details-name'>Name:<span> {pokemon.name}</span></div>

            <img src={pokemon.image} className="pokemon-details-img"/>

            <div className='pokemon-details-name'>Height: {pokemon.height} Feet</div>

            <div className='pokemon-details-name'>Weight: {pokemon.weight} Kg </div>

            <div className='pokemon-details-types'>{pokemon.types && pokemon.types.map((t) => <div key={t}> {t} </div>)}</div>
        
        </div>
    )

}

export default PokemonDetails;