import React from 'react';
import Header from '../components/Header';

class Album extends React.Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <p>Esse é o componente Album</p>
      </div>
    );
  }
}

export default Album;
