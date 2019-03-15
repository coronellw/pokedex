import React, { Component } from 'react';
import axios from 'axios';

import { pokedex } from '../../DataSource/axios.config';
import PokemonList from '../../components/Pokemons/PokemonList';
import Details from '../../components/Pokemons/Details/Details';
import Footer from '../../components/UI/Footer';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      filteredPokemons: [],
      selectedPokemon: {},
      filter: '',
      errors: null,
      isLoading: false,
      next: null,
      previous: null,
      totalPokemons: 0,
    };
  }

  componentDidMount() {
    let regexp = /https:\/\/pokeapi.co\/api\/v2\/pokemon\/([0-9]*)/i;

    pokedex.get('/pokemon/', { params: { limit: 21 } })
      .then(resp => {
        // console.log(`Pokemon List was received, updating ${resp.data.count} pokemons`);
        let pokemons = resp.data.results.map(p => { return { name: p.name.replace('-', ' '), id: p.url.match(regexp)[1] }; });
        this.setState({ pokemons, filteredPokemons: pokemons, previous: resp.data.previous, next: resp.data.next, totalPokemons: resp.data.count });
      })
      .catch(err => this.setState({ errors: err }));
  }

  fetchPokemons = link => {
    let regexp = /https:\/\/pokeapi.co\/api\/v2\/pokemon\/([0-9]*)/i;

    axios.get(link)
      .then(resp => {
        // console.log(`Pokemon List was received, updating ${resp.data.count} pokemons`);
        let pokemons = resp.data.results.map(p => { return { name: p.name.replace('-', ' '), id: p.url.match(regexp)[1] }; });
        this.setState({ pokemons, filteredPokemons: pokemons, previous: resp.data.previous, next: resp.data.next, totalPokemons: resp.data.count });
      })
      .catch(err => this.setState({ errors: err }));
  };

  handleFilterUpdate = (e) => {
    let filteredPokemons = this.state.pokemons.filter(p => p.id.match(new RegExp(e.target.value, 'i')) || p.name.match(new RegExp(e.target.value, 'i')));
    this.setState({ filter: e.target.value, filteredPokemons });
  }

  choosePokemon = (pokemonId) => {
    this.setState({ selectedPokemon: {} });
    pokedex.get(`/pokemon/${pokemonId}/`)
      .then(resp => {
        setTimeout(() => { this.setState({ selectedPokemon: resp.data }); }, 200);
      })
      .catch(err => {
        console.log(`Oops, there seems to be an error, ${err}`);
      });
  }

  clearSelection = () => {
    this.setState({ selectedPokemon: {} });
  }

  render() {

    const { previous, next, filteredPokemons, totalPokemons, selectedPokemon } = this.state;

    let details = selectedPokemon.sprites ? <Details
      id={selectedPokemon.id}
      name={selectedPokemon.name}
      types={selectedPokemon.types}
      weight={selectedPokemon.weight}
      height={selectedPokemon.height}
      img={selectedPokemon.sprites.front_default}
      stats={selectedPokemon.stats}
    /> : null;

    return (
      <div className="App">
        <header className={selectedPokemon.name ? 'expand' : 'contract'}>
          <div className="header-wrapper">
            <h1>Pokedex</h1>

            <input
              type="text"
              value={this.state.filter}
              placeholder="Pokemon name or Id"
              onChange={this.handleFilterUpdate}
            />
            {details}
          </div>
          <div className="ball-button" onClick={this.clearSelection}></div>
        </header>
        <section className={selectedPokemon.name ? 'expand-section' : 'contract-section'}>
          <PokemonList
            pokemons={filteredPokemons}
            pokeClicked={this.choosePokemon}
            redirectPkmn={this.fetchPokemons}
            previous={previous}
            count={totalPokemons}
            next={next}
          />
        </section>
        <Footer />
      </div >
    );
  }
}

export default App;

