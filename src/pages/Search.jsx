import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import INITIAL_STATE from '../services/initialState';

class Search extends React.Component {
  state = {
    ...INITIAL_STATE,
  };

  handleSearch = async (event) => {
    event.preventDefault();
    const { search } = this.state;
    this.setState({
      search: '',
      neverSearch: false,
    });

    const success = await searchAlbumsAPI(search);

    this.setState({
      gotApi: true,
      artistName: search,
      albums: success,
    });
  };

  handleValidation = () => {
    const { search } = this.state;
    const minChar = 2;

    if (search.length >= minChar) {
      this.setState({
        isBtnDisabble: false,
      });
    }
  };

  handleChange = (event) => {
    const valueTarget = event.target.value;

    this.setState({
      search: valueTarget,
    }, () => {
      this.handleValidation();
    });
  };

  render() {
    const { isBtnDisabble,
      search,
      gotApi,
      artistName,
      albums,
      neverSearch } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <p>Esse é o Search</p>
        <div data-testid="page-login">
          <form onSubmit={ this.handleSearch }>
            <div>
              <input
                type="text"
                name="search"
                id="search"
                value={ search }
                data-testid="search-artist-input"
                onChange={ this.handleChange }
              />
            </div>
            <div>
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ isBtnDisabble }
                onClick={ this.handleSearch }
              >
                Procurar
              </button>
            </div>
          </form>
          <p>{`Resultado de álbuns de: ${artistName}`}</p>
          {(!neverSearch && !gotApi) && <p>Nenhum álbum foi encontrado</p>}
          {(gotApi) && albums.map((element) => (
            <div key={ element.collectionId }>
              <span>{`Nome do artista: ${element.artistName}`}</span>
              <span>{`Album: ${element.collectionName}`}</span>
              Capa:
              <span>
                <img src={ element.artworkUr1100 } alt={ element.collectionName } />
              </span>
              <Link
                to={ `album/${element.collectionId}` }
                data-testid={ `link-to-album-${element.collectionId}` }
              >
                Album
              </Link>
            </div>))}
        </div>
      </div>
    );
  }
}

export default Search;
