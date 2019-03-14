import React from 'react';
import './Pokemon.css';

const Pokemon = props => {
  return <div className="Pokemon" onClick={props.clicked.bind(this, props.id)}>
    <span className="PokemonId">{props.id}</span><h3>{props.name}</h3>
  </div>;
};

export default Pokemon;