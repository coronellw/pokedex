import {pokedex} from './axios.config';

export function* getPokemon(id){
    yield pokedex.get(`/pokemon/${id}`)
        .then(resp => {
            return resp.data;
        })
        .catch(err => {
            console.log('Oops, there was an error', err);
            return {};
        })
}

export function* getAllPokemons() {
    yield pokedex.get('/pokemon/')
        .then(resp => {
            let regexp = /https:\/\/pokeapi.co\/api\/v2\/pokemon\/([0-9]*)/i
            let pokemons = resp.data.results.map(p => { return { name: p.name, id: p.url.match(regexp)[1] } });
            return pokemons;
        })
        .catch(err => {
            console.log('Oops, there was an error', err);
            return [];
        })
}