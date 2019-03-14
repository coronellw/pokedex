import Axios from 'axios';

export const pokedex = Axios.create({
  baseURL: 'https://pokeapi.co/api/v2'
});