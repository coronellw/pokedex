import React, { Component } from 'react';
import axios from 'axios';
// import { HashRouter, Route} from 'react-router-dom';

import { pokedex } from 'DataSource/axios.config';
import PokemonList from 'components/Pokemons/PokemonList';
import Header from 'components/UI/Header';
import Footer from 'components/UI/Footer';
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

    pokedex.get('/pokemon/', { params: { limit: 24 } })
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

    return (
      <div className="App">
        <Header
          pokemon={selectedPokemon}
          filter={this.state.filter}
          filterUpdate={this.handleFilterUpdate}
          clear={this.clearSelection}
        />
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

