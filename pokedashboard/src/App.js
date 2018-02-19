import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "whatwg-fetch";
import PokemonIndexList from "./components/PokemonIndexList";
import PokemonModal from "./components/PokemonModal";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: [],
      activePage: 1,
      limit: 50,
      offset: 0,
      totalPages: 0,
      count: 0,
      load: false,
      showModal: false,
      selectedPokemon: null
    };
  }

  loadPokemon = url => {
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(json => {
        let pages = Math.round(json.count / this.state.limit);
        this.setState({
          totalPages: pages,
          pokemon: json.results,
          count: json.count,
          load: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleLimitChange = event => {
    this.setState(
      {
        limit: +event.target.innerHTML || this.state.count,
        activePage: 1
      },
      () => {
        this.loadPokemon(
          `${this.props.baseUrl}pokemon/?limit=${this.state.limit}&offset=0`
        );
      }
    );
  };

  componentWillMount() {
    let offset = this.state.limit;
    this.loadPokemon(
      `${this.props.baseUrl}pokemon/?limit=${this.state.limit}&offset=${offset}`
    );
  }

  handlePaginationSelect = selectedPage => {
    let offset = this.state.limit + selectedPage.selected;
    this.loadPokemon(
      `${this.props.baseUrl}pokemon/?limit=${this.state.limit}&offset=${offset}`
    );
    this.setState({ activePage: selectedPage });
  };

  openModal = pokemon => {
    if (pokemon.url !== undefined) {
      fetch(`${pokemon.url}`)
        .then(response => {
          return response.json();
        })
        .then(json => {
          console.log(json);
          this.setState({
            selectedPokemon: json,
            showModal: true
          });
        })
        .catch(ex => {
          console.log("parsing failed", ex);
        });
    }
  };

  closeModal = () => {
    this.setState({
      showModal: false
    });
  };

  render() {
    const { showModal } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Zaid's Poke Dashboard</h1>
        </header>
        {this.state.load ? null : "Loading.."}
        <PokemonIndexList
          display={this.state.load}
          selectedValue={this.state.limit}
          allValue={this.state.count}
          onOptionSelected={this.handleLimitChange}
          listOfPokemon={this.state.pokemon}
          totalPages={this.state.totalPages}
          handlePaginationSelect={this.handlePaginationSelect}
          openModal={this.openModal}
        />
        <PokemonModal
          pokemon={this.state.selectedPokemon}
          closeModal={this.closeModal}
          showModal={showModal}
        />
      </div>
    );
  }
}

export default App;
