import { Add } from '@mui/icons-material';
import {
  Accordion, AccordionDetails,
  AccordionSummary, Button,
  TextField, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionWalletEditExpense, fetchCurrencies } from '../redux/actions';
import SelectWithLabel from './SelectWithLabel';

// Variáveis para renderizar
const arrayMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const arrayTags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

const sxInput = { filter: 'invert(95%)' };

class WalletForm extends Component {
  state = {
    valueInput: 0,
    descriptionInput: '',
    currencyInput: 'USD',
    methodInput: arrayMethods[0],
    tagInput: arrayTags[0],
    btnDisabled: true,
    showEdit: true,
    idToEdit: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  shouldComponentUpdate(nextProps) {
    // console.log('should', nextProps);
    const { idToEdit } = this.state;

    if (nextProps.editor && nextProps.idToEdit !== idToEdit) {
      // console.log('logica1');
      const { value, description, currency, tag, method } = nextProps.foundExp;
      this.setState({
        valueInput: value,
        descriptionInput: description,
        currencyInput: currency,
        methodInput: method,
        tagInput: tag,
        showEdit: true,
        idToEdit: nextProps.idToEdit,
        btnDisabled: false,
      });
      return false;
    }

    return true;
  }

  validateFields = () => {
    const { valueInput } = this.state;
    this.setState({ btnDisabled: !valueInput > 0 });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    // console.log('handleChange', target, name, value);
    this.setState({ [name]: value }, this.validateFields);
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
      methodInput: 'Dinheiro',
      tagInput: 'Alimentação',
      btnDisabled: true,
      showEdit: !editor,
    });
  };

  render() {
    const { currencies, editor } = this.props;
    const { valueInput, descriptionInput, showEdit,
      currencyInput, methodInput, tagInput, btnDisabled } = this.state;

    const btnText = editor ? 'Editar despesa' : 'Adicionar despesa';

    return (
      <Accordion
        expanded={ showEdit }
        sx={ { background: 'transparent' } }
      >
        <AccordionSummary
          expandIcon={ <Add
            sx={ { color: 'var(--main-text-color)',
              fontSize: '32px' } }
          /> }
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={ () => this.setState((prev) => ({ showEdit: !prev.showEdit })) }
        >
          <Typography
            fontWeight={ 600 }
            fontSize={ 20 }
            sx={ { color: 'var(--main-text-color)' } }
          >
            {btnText}

          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="WalletForm">
            <TextField
              label="Valor"
              variant="filled"
              name="valueInput"
              type="number"
              data-testid="value-input"
              value={ valueInput }
              onChange={ this.handleChange }
              sx={ sxInput }
            />

            <SelectWithLabel
              name="currencyInput"
              id="currencyInput"
              data-testid="currency-input"
              label="Moeda"
              onChange={ this.handleChange }
              value={ currencyInput }
              options={ currencies }
            />
            <SelectWithLabel
              name="methodInput"
              id="methodInput"
              data-testid="method-input"
              onChange={ this.handleChange }
              value={ methodInput }
              label="Método"
              options={ arrayMethods }
            />

            <SelectWithLabel
              name="tagInput"
              id="tagInput"
              label="Categoria"
              data-testid="tag-input"
              onChange={ this.handleChange }
              value={ tagInput }
              options={ arrayTags }
            />
            <TextField
              label="Descrição"
              type="text"
              variant="filled"
              data-testid="description-input"
              id="descriptionInput"
              name="descriptionInput"
              value={ descriptionInput }
              onChange={ this.handleChange }
              sx={ sxInput }
              fullWidth
            />
            <Button
              onClick={ this.editExpense }
              disabled={ btnDisabled }
              variant="contained"
              sx={ sxInput }
            >
              {btnText}

            </Button>
          </div>
        </AccordionDetails>
      </Accordion>

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
