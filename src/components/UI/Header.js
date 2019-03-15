import React from 'react';
import styled from 'styled-components';
import Details from 'components/Pokemons/Details/Details';

import './ui-styles.css';

const StyledHeader = styled.header`
  background-color: #b71818;
  box-sizing: border-box;
  border-bottom: 7px solid black;
  height: 150px;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 10;
`;

const header = props => {

  const { pokemon, filter, filterUpdate, clear } = props;

  let details = pokemon.sprites ? <Details
    id={pokemon.id}
    name={pokemon.name}
    types={pokemon.types}
    weight={pokemon.weight}
    height={pokemon.height}
    img={pokemon.sprites.front_default}
    stats={pokemon.stats}
  /> : null;

  return (
    <StyledHeader className={pokemon.name ? 'expand' : 'collapse'}>
      <div className="header-wrapper">
        <h1>Pokedex</h1>

        <input
          type="text"
          value={filter}
          placeholder="Pokemon name or Id"
          onChange={filterUpdate}
        />
        {details}
      </div>
      <div className="ball-button" onClick={clear}></div>
    </StyledHeader>
  );
};

export default header;
