import React from 'react';
import Header from '../components/Header';

class Favorites extends React.Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        <p>Esse é o componente Favorites</p>
      </div>
    );
  }
}

export default Favorites;
