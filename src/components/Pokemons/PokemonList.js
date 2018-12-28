import React from 'react';

import './PokemonList.css';
import Pokemon from './Pokemon/Pokemon';

const PokemonList = props => {
    let pokemons = props.pokemons?props.pokemons.map(p => {
        return <Pokemon 
            key={p.id}
            id={p.id}
            name={p.name}
            clicked={props.pokeClicked}
        />
    }):<p>No pokemons to show yet</p>
    return <div>
        <h2>Pokemon List</h2>
        <div className="PokemonList">
            {pokemons}
        </div>
    </div>
}

export default PokemonList;