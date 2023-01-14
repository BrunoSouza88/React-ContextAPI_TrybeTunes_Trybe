import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    artist: '',
    album: '',
    song: [],
  };

  componentDidMount() {
    this.getMusic();
  }

  getMusic = async () => {
    const { match: { params: { id } } } = this.props;

    const musics = async () => {
      const album = await getMusics(id);
      return album;
    };

    musics().then((data) => {
      this.setState({
        artist: data[0].artistName,
        song: data,
        album: data[0].collectionName,
      });
    });
  };

  render() {
    const { artist, song, album } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <span data-testid="artist-name">{ artist }</span>
        </div>
        <div>
          <span data-testid="album-name">{ album }</span>
        </div>
        <div>
          {song.map((element) => (
            (element.kind === 'song') && (
              <MusicCard
                key={ element.trackName }
                trackName={ element.trackName }
                previewUrl={ element.previewUrl }
                trackId={ element.trackId }
                song={ song }
              />
            )
          ))}
        </div>
        <p>Esse é o componente Album</p>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.string,
  }),
}.isRequired;

export default Album;
