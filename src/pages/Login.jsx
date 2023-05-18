import { Button, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import logo from '../media/images/logo.png';
import { actionUserLogin } from '../redux/actions';

const sxInput = { filter: 'invert(95%)' };

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
      <div className="Login glass">
        <img className="Login__img" src={ logo } alt="logo" />

        <TextField
          type="text"
          name="email"
          label="E-mail"
          variant="filled"
          data-testid="email-input"
          value={ email }
          onChange={ this.handleChange }
          sx={ sxInput }
        />
        <TextField
          type="password"
          name="password"
          label="Password"
          variant="filled"
          data-testid="password-input"
          value={ password }
          onChange={ this.handleChange }
          sx={ sxInput }
        />
        <Button
          onClick={ this.goToWallet }
          disabled={ btnDisable }
          variant="contained"
          sx={ sxInput }
        >
          Entrar

        </Button>
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
