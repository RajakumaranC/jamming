import React from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar.js';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import Spotify from "../../util/Spotify";


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "New PlayList",
      playlistTracks: [],
      isLoggedIn: false
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.HandleLoginClick = this.HandleLoginClick.bind(this);
  }

  addTrack(track){
    let tracks = this.state.playlistTracks;
      if(tracks.find(SavedTrack => SavedTrack.id === track.id)){
        return;
      }
      tracks.push(track);
      this.setState({
        playlistTracks: tracks
      });
  }

  removeTrack(track){
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(SavedTrack => SavedTrack.id !== track.id);
    this.setState({
      playlistTracks: tracks
    })
  }

  updatePlaylistName(name){
    this.setState({
      playlistName: name
    });
  }

  savePlaylist(){
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: "New PlayList",
        playlistTracks: []
      });
    })
  }
  
  search(searchTerm){
    Spotify.search(searchTerm).then(searchResults => {
      this.setState({
        searchResults: searchResults
      });
    });
  }

  HandleLoginClick(){
    let accessToken = Spotify.getAccessToken();
    if(accessToken){
      this.setState({
        isLoggedIn: true
      })
    }
    
  }

  render(){
    let MainPage;
    if(!this.state.isLoggedIn)
    {
      MainPage = (<div className='LoginButtonContainer'><button className='LoginButton' onClick={this.HandleLoginClick}>Log In</button>
      <p>Welcome to Jamming app! You will need to login to Spotify platform to use this applicaiton. Kindly login using the button above. </p></div>);
    }
    else {
      MainPage = (<div className="HomePage">
      <SearchBar onSearch={this.search} />
      <div className="App-playlist">
        <SearchResults searchResults = {this.state.searchResults} onAdd = {this.addTrack} /> 
        <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} /> 
      </div>
      </div>);
    }


    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
      {MainPage}
      </div>
    </div>
    )
    
  }
  
}
  

export default App;

