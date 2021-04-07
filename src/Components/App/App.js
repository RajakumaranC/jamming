import React from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar.js';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';



class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchResults: [{
        name : 'Ice and Snow',
        artist : 'Thor',
        album : 'Ragnarork',
        id : 1
      },{
        name : 'Hey heyo',
        artist : 'Quill',
        album:'Guardians of Galaxy',
        id: 2
      }]
    }
  }
  render(){
    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults searchResults = {this.state.searchResults} /> 
          <Playlist /> 
        </div>
      </div>
    </div>
    )
  }
}
  

export default App;

