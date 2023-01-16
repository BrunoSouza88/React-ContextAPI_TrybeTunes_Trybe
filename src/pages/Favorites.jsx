import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import INITIAL_STATE from '../services/initialState';

class Favorites extends React.Component {
  state = {
    ...INITIAL_STATE,
  };

  componentDidMount() {
    this.handleFavoritesSongs();
  }

  handleFavoritesSongs = async () => {
    const favoritesSongsList = await getFavoriteSongs();
    const { checked } = this.state;

    this.setState({
      favoriteSongs: favoritesSongsList,
      checked: true,
    });
  };

  render() {
    const { favoriteSongs, checked } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        {favoriteSongs.map((element) => (
          <MusicCard
            key={ element.trackName }
            trackName={ element.trackName }
            previewUrl={ element.previewUrl }
            trackId={ element.trackId }
            song={ element }
            checked={ checked }
          />
        ))}
        <p>Esse é o componente Favorites</p>
      </div>
    );
  }
}

export default Favorites;
