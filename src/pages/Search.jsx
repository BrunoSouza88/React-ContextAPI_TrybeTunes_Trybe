import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    isBtnDisabble: true,
    search: '',
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
    const { isBtnDisabble } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <p>Esse é o Search</p>
        <div data-testid="page-login">
          <form>
            <div>
              <input
                type="text"
                name="search"
                id="search"
                data-testid="search-artist-input"
                onChange={ this.handleChange }
              />
            </div>
            <div>
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ isBtnDisabble }
              >
                Procurar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Search;
