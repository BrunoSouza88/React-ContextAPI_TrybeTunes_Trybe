import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import INITIAL_STATE from '../services/initialState';

class MusicCard extends React.Component {
  state = {
    ...INITIAL_STATE,
  };

  componentDidMount() {
    this.favorites();
  }

  favorites = async () => {
    const favoritesSongs = await getFavoriteSongs();
    const { song } = this.props;

    if (favoritesSongs.some((element) => element.trackId === song.trackId)) {
      this.setState({
        checked: true,
        loading: false,
      });
    }
  };

  handleFavorite = () => {
    const { song } = this.props;
    const { checked } = this.state;

    if (!checked) {
      this.setState({
        loading: true }, () => {
        addSong(song).then(() => {
          this.setState({
            loading: false,
            checked: true,
          });
        });
      });
    } else {
      this.setState({
        loading: true }, () => {
        removeSong(song).then(() => {
          this.setState({
            loading: false,
            checked: false,
          });
        });
      });
    }
    this.favorites();
  };

  render() {
    const { loading, checked } = this.state;
    const { trackName, previewUrl, trackId } = this.props;

    return (
      <div>
        <h3>
          { trackName }
        </h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <label htmlFor={ trackId }>
          {loading ? <Loading /> : 'Favoritar'}
          <input
            type="checkbox"
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            checked={ checked }
            onChange={ this.handleFavorite }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  url: PropTypes.string,
  trackName: PropTypes.string,
}.isRequired;

export default MusicCard;
