import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    userName: '',
    loading: false,
  };

  componentDidMount() {
    this.getName();
  }

  getName = async () => {
    const load = true;

    this.setState({
      loading: load,
    });
    const stateName = await getUser();
    this.setState({
      loading: !load,
      userName: stateName.name,
    });
  };

  render() {
    const { userName, loading } = this.state;

    if (loading) return <Loading />;

    return (
      <header data-testid="header-component">
        <ul>
          <li>
            <Link to="/search" data-testid="link-to-search">
              Procura
            </Link>
            <Link to="/favorites" data-testid="link-to-favorites">
              Músicas Favoritas
            </Link>
            <Link to="/profile" data-testid="link-to-profile">
              Perfil
            </Link>
          </li>
        </ul>
        <p data-testid="header-user-name">
          { userName }
        </p>
      </header>
    );
  }
}

export default Header;
