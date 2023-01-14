import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
    checked: false,
  };

  handleFavorite = () => {
    const { song } = this.props;
    const { checked } = this.state;

    if (!checked) {
      this.setState({ loading: true }, () => {
        addSong(song).then(() => {
          this.setState({
            loading: false,
            checked: true,
          });
        });
      });
    } else {
      this.setState({ loading: true }, () => {
        removeSong(song).then(() => {
          this.setState({
            loading: false,
            checked: false,
          });
        });
      });
    }
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
          {loading ? <Loading /> : 'Favorita'}
          <input
            type="checkbox"
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            checked={ checked }
            onClick={ this.handleFavorite }
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
