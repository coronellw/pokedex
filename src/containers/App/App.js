import React, { Component } from 'react';

import { pokedex } from '../../DataSource/axios.config';
import PokemonList from '../../components/Pokemons/PokemonList';
import Details from '../../components/Pokemons/Details/Details';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      filteredPokemons: [],
      selectedPokemon: {},
      filter: '',
    }
  }

  componentDidMount() {
    let regexp = /https:\/\/pokeapi.co\/api\/v2\/pokemon\/([0-9]*)/i

    pokedex.get('/pokemon/')
      .then(resp => {
        console.log(`Pokemon List was received, updating ${resp.data.results.lenght} pokemons`)
        let pokemons = resp.data.results.map(p => { return { name: p.name, id: p.url.match(regexp)[1] } });
        this.setState({ pokemons, filteredPokemons: pokemons })
      })
      .catch(err => { console.log('there was an error', err) })
  }

  handleFilterUpdate = (e) => {
    let filteredPokemons = this.state.pokemons.filter(p => p.id.match(new RegExp(e.target.value, 'i')) || p.name.match(new RegExp(e.target.value, 'i')))
    this.setState({ filter: e.target.value, filteredPokemons })
  }

  choosePokemon = (pokemonId) => {
    this.setState({selectedPokemon:{}});
    pokedex.get(`/pokemon/${pokemonId}/`)
      .then(resp => {
        setTimeout(()=>{this.setState({ selectedPokemon: resp.data })},200)
      })
      .catch(err => {
        console.log(`Oops, there seems to be an error, ${err}`);
      })
  }

  clearSelection = () =>{
    this.setState({selectedPokemon: {}})
  }

  render() {

    let details = this.state.selectedPokemon.sprites ? <Details
      id={this.state.selectedPokemon.id}
      name={this.state.selectedPokemon.name}
      types={this.state.selectedPokemon.types}
      weight={this.state.selectedPokemon.weight}
      height={this.state.selectedPokemon.height}
      img={this.state.selectedPokemon.sprites.front_default}
    /> : null;

    return (
      <div className="App">
        <header className={this.state.selectedPokemon.name ? 'expand' : 'contract'}>
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
        <section className={this.state.selectedPokemon.name? 'expand-section':'contract-section'}> 
          <PokemonList pokemons={this.state.filteredPokemons} pokeClicked={this.choosePokemon} />
        </section>
        <footer>This is the footer</footer>
      </div >
    );
  }
}

export default App;
