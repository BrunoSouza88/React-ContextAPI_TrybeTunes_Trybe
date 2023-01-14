import React from 'react';
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
        <p data-testid="header-user-name">
          { userName }
        </p>
      </header>
    );
  }
}

export default Header;
