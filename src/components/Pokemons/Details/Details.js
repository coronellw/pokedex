import React from 'react';
import Type from '../Type/Type';

import './Details.css';

const Details = props => {

  let types = props.types ? props.types.map(t => {
    return <Type key={t.type.name} type={t.type.name} />;
  }) : null;

  return <div className="Details appear">
    <div className="left-side">
      <img src={props.img} alt={props.name} height="96" width="96" />
      <span className="PokemonName">{props.name}</span>
      <span className="types">{types}</span>
    </div>
    <div className="right-side">
      <div>
        <label>Id:</label> <span>{props.id}</span>
      </div>
      <div>
        <label>Weight:</label> <span>{props.weight}</span>
      </div>
      <div>
        <label>Height:</label> <span>{props.height}</span>
      </div>
    </div>
  </div>;
};

export default Details;