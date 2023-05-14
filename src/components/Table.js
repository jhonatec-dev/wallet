import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionEditExpense, actionRemoveExpense } from '../redux/actions';

const tableHeader = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
  'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];

class Table extends Component {
  getNameCurrency = (expense) => expense.exchangeRates[expense.currency].name;

  getConvertValue = (expense) => {
    const { ask } = expense.exchangeRates[expense.currency];
    const result = (expense.value * ask).toFixed(2);
    return +result;
  };

  getCambio = (expense) => {
    const currValue = expense.exchangeRates[expense.currency].ask;
    return (+currValue).toFixed(2);
  };

  getValue = (expense) => (+expense.value).toFixed(2);

  removeExpense = (id) => {
    const { dispatch } = this.props;
    dispatch(actionRemoveExpense(id));
  };

  editExpense = (id) => {
    const { dispatch } = this.props;
    dispatch(actionEditExpense(id));
  };

  renderEditButtons = (exp) => (
    <>
      <button
        data-testid="edit-btn"
        onClick={ () => this.editExpense(exp.id) }
      >
        Editar

      </button>
      <button
        data-testid="delete-btn"
        onClick={ () => this.removeExpense(exp.id) }
      >
        Excluir

      </button>
    </>
  );

  renderExpenses = () => {
    const { expenses } = this.props;
    return expenses.map((exp, index) => (
      <tr key={ index }>
        <td>{exp.description}</td>
        <td>{exp.tag}</td>
        <td>{exp.method}</td>
        <td>{this.getValue(exp)}</td>
        <td>{this.getNameCurrency(exp)}</td>
        <td>{this.getCambio(exp)}</td>
        <td>{this.getConvertValue(exp)}</td>
        <td>Real</td>
        <td>{this.renderEditButtons(exp)}</td>
      </tr>
    ));
  };

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              {tableHeader.map((desc, index) => (<th key={ index }>{desc}</th>))}
            </tr>
          </thead>
          <tbody>
            {this.renderExpenses()}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape),
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
