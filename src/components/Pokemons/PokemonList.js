import React from 'react';

import './PokemonList.css';
import Pokemon from './Pokemon/Pokemon';

const PokemonList = props => {
  let pokemons = props.pokemons ? props.pokemons.map(p => {
    return <Pokemon
      key={p.id}
      id={p.id}
      name={p.name}
      clicked={props.pokeClicked}
    />;
  }) : <p>No pokemons to show yet</p>;

  const backDisabled = props.previous === null ? 'disabled' : null;
  const fwdDisabled = props.next === null ? 'disabled' : null;;

  return <div>
    <div className="PokemonList">
      {pokemons}
    </div>
    <div className="ctrl">
      <span
        className="btn"
        onClick={props.redirectPkmn.bind(this, 'https://pokeapi.co/api/v2/pokemon/?limit=40')}
      >
        {'|<'}
      </span>
      <span
        className={`btn ${backDisabled}`}
        onClick={props.redirectPkmn.bind(this, props.previous)}
      >
        {'<<'}
      </span>
      <span
        className={`btn ${fwdDisabled}`}
        onClick={props.redirectPkmn.bind(this, props.next)}
      >
        {'>>'}
      </span>
      <span
        className="btn"
        onClick={props.redirectPkmn.bind(this, `https://pokeapi.co/api/v2/pokemon/?limit=40&offset=${props.count-40}`)}
      >
        {'>|'}
      </span>
    </div>
  </div>;
};

export default PokemonList;