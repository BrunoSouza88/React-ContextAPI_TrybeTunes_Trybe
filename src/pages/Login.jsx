import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import INITIAL_STATE from '../services/initialState';

class Login extends React.Component {
  state = {
    ...INITIAL_STATE,
  };

  handleValidation = () => {
    const { userName } = this.state;
    const minChar = 3;
    if (userName.length >= minChar) {
      this.setState({
        isBtnDisabled: false,
      });
    }
  };

  handleChange = (event) => {
    const valueTarget = event.target.value;
    this.setState({
      userName: valueTarget,
    }, () => this.handleValidation());
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { userName } = this.state;
    const { history } = this.props;

    this.setState({
      loading: true,
    }, async () => {
      await createUser({ name: userName });
      history.push('/search');
    });
  };

  render() {
    const { isBtnDisabled, loading } = this.state;

    if (loading) return <Loading />;

    return (
      <div data-testid="page-login">
        <form onSubmit={ this.onSaveButtonClick }>
          <label htmlFor="input-name">
            Nome:
            <input
              type="text"
              name="user"
              id="user"
              placeholder="Digite seu nome"
              data-testid="login-name-input"
              onChange={ this.handleChange }
            />
          </label>
          <div>
            <button
              type="button"
              disabled={ isBtnDisabled }
              data-testid="login-submit-button"
              onClick={ this.handleClick }
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
