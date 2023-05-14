import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import { actionUserLogin } from '../redux/actions';

class Login extends React.Component {
  state = {
    btnDisable: true,
    password: '',
    email: '',
  };

  goToWallet = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(actionUserLogin(email));
    history.push('/carteira');
  };

  validateFields = () => {
    const { email, password } = this.state;
    const validEmail = validator.isEmail(email);
    const minLength = 6;
    const validPassword = password.length >= minLength;
    this.setState({ btnDisable: !(validEmail && validPassword) });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.validateFields);
  };

  render() {
    const { btnDisable, email, password } = this.state;

    return (
      <div>
        <input
          type="text"
          name="email"
          placeholder="E-mail"
          data-testid="email-input"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          data-testid="password-input"
          value={ password }
          onChange={ this.handleChange }
        />
        <button
          onClick={ this.goToWallet }
          disabled={ btnDisable }
        >
          Entrar

        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);