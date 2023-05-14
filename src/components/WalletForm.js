import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionWalletEditExpense, fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  state = {
    valueInput: 0,
    descriptionInput: '',
    currencyInput: 'USD',
    methodInput: '',
    tagInput: 'alimentacao',
    editor: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  shouldComponentUpdate(nextProps) {
    // console.log('should', nextProps);
    const { editor } = this.state;
    if (nextProps.editor !== editor) {
      // console.log('logica1');
      const { value, description, currency, tag, method } = nextProps.foundExp;
      this.setState({ editor: nextProps.editor,
        valueInput: value,
        descriptionInput: description,
        currencyInput: currency,
        methodInput: method,
        tagInput: tag,
      });
      return false;
    }
    return true;
  }

  handleChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  editExpense = () => {
    const { dispatch, editor, idToEdit } = this.props;
    const { valueInput, descriptionInput,
      currencyInput, methodInput, tagInput } = this.state;
    // console.warn('pronto pro dispatch', editor, idToEdit);
    const menosUm = -1;
    dispatch(actionWalletEditExpense({
      value: valueInput,
      description: descriptionInput,
      currency: currencyInput,
      method: methodInput,
      tag: tagInput,
      id: editor ? idToEdit : menosUm,
    }));

    // limpar os inputs
    this.setState({
      valueInput: '',
      descriptionInput: '',
      currencyInput: 'USD',
      methodInput: '',
      tagInput: 'alimentacao',
    });
  };

  render() {
    const { currencies, editor } = this.props;
    const { valueInput, descriptionInput,
      currencyInput, methodInput, tagInput } = this.state;

    const btnText = editor ? 'Editar despesa' : 'Adicionar despesa';

    return (
      <div className="WalletForm">
        <label htmlFor="valueInput">
          {' '}
          Valor:
          <input
            type="number"
            data-testid="value-input"
            id="valueInput"
            value={ valueInput }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="descriptionInput">
          {' '}
          Descrição:
          <input
            type="text"
            data-testid="description-input"
            id="descriptionInput"
            value={ descriptionInput }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currencyInput">
          {' '}
          Moeda:
          <select
            name="currency"
            id="currencyInput"
            data-testid="currency-input"
            onChange={ this.handleChange }
            value={ currencyInput }
          >
            { currencies.length > 0
              && currencies.map((curr, index) => (
                <option key={ index } value={ curr }>{curr}</option>
              ))}
          </select>
        </label>
        <label htmlFor="methodInput">
          <select
            name="method"
            id="methodInput"
            data-testid="method-input"
            onChange={ this.handleChange }
            value={ methodInput }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tagInput">
          <select
            name="tag"
            id="tagInput"
            data-testid="tag-input"
            onChange={ this.handleChange }
            value={ tagInput }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button onClick={ this.editExpense }>{btnText}</button>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  expenses: PropTypes.arrayOf(PropTypes.shape({})),
  dispatch: PropTypes.func,
  editor: PropTypes.bool,
  idToEdit: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => {
  const { currencies, editor, idToEdit, expenses } = state.wallet;
  let foundExp = false;
  if (editor) {
    foundExp = expenses.find(({ id }) => id === idToEdit);
  }

  return {
    currencies,
    editor,
    expenses,
    idToEdit,
    foundExp,
  };
};

export default connect(mapStateToProps)(WalletForm);
