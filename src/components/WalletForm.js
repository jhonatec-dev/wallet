import { Add } from '@mui/icons-material';
import {
  Accordion, AccordionDetails,
  AccordionSummary, Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select, TextField, Typography,
} from '@mui/material';
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
    btnDisabled: true,
    showEdit: true,
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
        showEdit: true,
      });
      return false;
    }
    return true;
  }

  validateFields = () => {
    const { valueInput } = this.state;
    this.setState({ btnDisabled: !valueInput > 0 });
  };

  handleChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value }, this.validateFields);
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
      showEdit: false,
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
          sx={ { background: 'var(--main-color)' } }
          className="glass"
          expandIcon={ <Add /> }
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={ () => this.setState((prev) => ({ showEdit: !prev.showEdit })) }
        >
          <Typography fontWeight={ 600 }>{btnText}</Typography>
        </AccordionSummary>
        <AccordionDetails className="glass-header">
          <div className="WalletForm">
            <TextField
              label="Valor"
              variant="filled"
              type="number"
              data-testid="value-input"
              value={ valueInput }
              onChange={ this.handleChange }
            />

            <TextField
              label="Descrição"
              type="text"
              variant="filled"
              data-testid="description-input"
              id="descriptionInput"
              value={ descriptionInput }
              onChange={ this.handleChange }
            />

            <Select
              name="currency"
              id="currencyInput"
              variant="filled"
              data-testid="currency-input"
              onChange={ this.handleChange }
              value={ currencyInput }
            >
              { currencies.length > 0
              && currencies.map((curr, index) => (
                <MenuItem
                  sx={ { background: 'var(--main-color)' } }
                  key={ index }
                  value={ curr }
                  className="glass"
                >
                  {curr}

                </MenuItem>
              ))}
            </Select>
            <FormControl>
              <InputLabel id="methodInput-label">Método</InputLabel>
              <Select
                name="method"
                id="methodInput"
                variant="filled"
                data-testid="method-input"
                onChange={ this.handleChange }
                value={ methodInput }
                label="Método"
                labelId="methodInput-label"
                sx={ { minWidth: '150px' } }
              >
                <MenuItem value="Dinheiro">Dinheiro</MenuItem>
                <MenuItem value="Cartão de crédito">Cartão de crédito</MenuItem>
                <MenuItem value="Cartão de débito">Cartão de débito</MenuItem>
              </Select>
            </FormControl>
            <InputLabel id="tagInput">Categoria</InputLabel>
            <Select
              name="tag"
              id="tagInput"
              variant="filled"
              label="Categoria"
              data-testid="tag-input"
              onChange={ this.handleChange }
              value={ tagInput }
            >
              <MenuItem value="Alimentação">Alimentação</MenuItem>
              <MenuItem value="Lazer">Lazer</MenuItem>
              <MenuItem value="Trabalho">Trabalho</MenuItem>
              <MenuItem value="Transporte">Transporte</MenuItem>
              <MenuItem value="Saúde">Saúde</MenuItem>
            </Select>
            <Button
              onClick={ this.editExpense }
              disabled={ btnDisabled }
              variant="contained"
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
