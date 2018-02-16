import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'whatwg-fetch';
import PokeList from './components/PokeList'; 
import {Col} from 'react-bootstrap/lib/';
import ReactPaginate from 'react-paginate';



class App extends Component {
  constructor(props){
    super(props);
    this.state={
      pokemon: [],
      activePage: 0,
      limit: 10,
      offset: 0,
      totalPages: 0
    };

    this.loadPokemon =this.loadPokemon.bind(this);
    this.handlePaginationSelect = this.handlePaginationSelect.bind(this);
  }

  loadPokemon(url){
    fetch(url)
    .then(response => {
      return response.json();
    }).then(json => {
      console.log(json);
      let pages = Math.round(json.count/this.state.limit);
      this.setState({
        totalPages: pages,
        pokemon: json.results,
        count: json.count
      });
    }).catch(err => {
      console.log(err)
    })
  }

  componentWillMount(){
    let offset = this.state.limit;
    this.loadPokemon(`${this.props.baseUrl}pokemon/?limit=${this.state.limit}&offset=${offset}`);
  }

  handlePaginationSelect(selectedPage){
    console.log(selectedPage);
    let offset = this.state.limit + selectedPage.selected;
    console.log(`${this.props.baseUrl}?limit=${this.state.limit}&offset=${offset}`);
    this.loadPokemon(`${this.props.baseUrl}pokemon/?limit=${this.state.limit}&offset=${offset}`);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Col sm={8} md={10} smOffset={2} mdOffset={1} >
          <PokeList listOfPokemon={this.state.pokemon} />
        </Col>

        <Col sm={12} md={10}>
          <div id="react-paginate">
            <ReactPaginate
                pageCount= {this.state.totalPages}
                pageRangeDispalyed = {10}
                marginPagesDisplayed={10}
                onPageChange={this.handlePaginationSelect}
                
            />
          </div>

          {/* <ReactUltimatePagination
            bsSize="small"
            items={this.state.totalPages}
            activePage={this.state.activePage}
            onSelect={this.handlePaginationSelect}
          /> */}
        </Col>
      </div>
    );
  }
}



export default App;
