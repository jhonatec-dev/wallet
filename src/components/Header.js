import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  getTotalExpenses = () => {
    const { expenses } = this.props;

    console.log('expenses', expenses);

    const result = expenses.reduce((sum, exp) => {
      const valExp = exp.value;
      const valCurr = exp.exchangeRates[exp.currency].ask;
      const total = (valExp * valCurr).toFixed(2);
      return +total + sum;
    }, 0);

    return result;
  };

  render() {
    const { email } = this.props;
    const currency = 'BRL';
    return (
      <div className="Header glass-header">
        <div>
          <span>Email: </span>
          <span data-testid="email-field">{email}</span>
        </div>

        <div>
          <span>Despesa Total: </span>
          <span
            data-testid="total-field"
            className="Header__total-field"
          >
            {this.getTotalExpenses().toFixed(2)}

          </span>
          <span> </span>
          <span data-testid="header-currency-field">{currency}</span>
        </div>

      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
