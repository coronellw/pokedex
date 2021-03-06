import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faFastForward, faBackward, faFastBackward } from '@fortawesome/free-solid-svg-icons';

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
      <FontAwesomeIcon
        className="btn"
        icon={faFastBackward}
        onClick={props.redirectPkmn.bind(this, 'https://pokeapi.co/api/v2/pokemon/?limit=24')}
      />
      <FontAwesomeIcon
        className={`btn ${backDisabled}`}
        icon={faBackward}
        onClick={props.redirectPkmn.bind(this, props.previous)}
      />
      <FontAwesomeIcon
        className={`btn ${fwdDisabled}`}
        icon={faForward}
        onClick={props.redirectPkmn.bind(this, props.next)}
      />
      <FontAwesomeIcon
        className="btn"
        icon={faFastForward}
        onClick={props.redirectPkmn.bind(this, `https://pokeapi.co/api/v2/pokemon/?limit=24&offset=${props.count - 24}`)}
      />
    </div>
  </div>;
};

export default PokemonList;