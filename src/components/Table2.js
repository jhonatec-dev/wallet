import { Delete, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
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

  getCols = () => {
    const colNames = [
      { field: 'id', headerName: 'ID' },
      { field: 'description', headerName: 'DESCRIÇÃO' },
      { field: 'value', headerName: 'VALOR' },
      { field: 'currency', headerName: 'MOEDA', width: 250 },
      { field: 'cambio', headerName: 'CÂMBIO' },
      { field: 'method', headerName: 'MÉTODO', width: 150 },
      { field: 'tag', headerName: 'CATEGORIA', width: 120 },
      {
        field: 'actions',
        headerName: 'actions',
        width: 150,
        renderCell: (params) => (
          <>
            <IconButton
              data-testid="edit-btn"
              onClick={ () => { this.editExpense(params.id); } }
            >
              <Edit />
            </IconButton>
            <IconButton
              data-testid="delete-btn"
              onClick={ () => { this.removeExpense(params.id); } }
            >
              <Delete />
            </IconButton>
          </>
        ),
      },
    ];
    return colNames;
  };

  getRows = () => {
    const { expenses } = this.props;
    if (expenses.length < 1) return [];
    return expenses.map(
      (exp) => ({
        id: exp.id,
        value: this.getValue(exp),
        description: exp.description,
        cambio: this.getCambio(exp),
        currency: this.getNameCurrency(exp),
        method: exp.method,
        tag: exp.tag,
        actions: exp.id,
      }),
    );
  };

  render() {
    // const cols = expenses.length > 0 ? Object.keys(expenses[0]) : [];
    const cols = this.getCols();
    const rows = this.getRows();
    return (
      <div className="Table glass-header">
        <DataGrid rows={ rows } columns={ cols } />
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
