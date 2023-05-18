import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Chart from 'react-google-charts';
import { connect } from 'react-redux';

// const data = [
//   ['Task', 'Hours per Day'],
//   ['Work', 11],
//   ['Eat', 2],
//   ['Commute', 2],
//   ['Watch TV', 2],
//   ['Sleep', 7], // CSS-style declaration
// ];

class Graphs extends Component {
  state = {
    value: '1',
  };

  getConvertedValue = ({
    value, exchangeRates, currency,
  }) => +(+exchangeRates[currency].ask * +value).toFixed(2);

  dataByMethod = () => {
    const { expenses } = this.props;
    const methods = { ...new Set(expenses.map(({ method }) => method)) };
    const values = expenses.reduce((result, exp) => {
      if (result[exp.method]) {
        result[exp.method] += this.getConvertedValue(exp);
      } else {
        result[exp.method] = this.getConvertedValue(exp);
      }
      return result;
    }, methods);

    const dataMethods = { Métodos: 'Valores', ...values };

    const options = {
      pieHole: 0.5,
      is3D: false,
      backgroundColor: 'transparent',
      titleColor: 'white',
      legend: { textStyle: { color: 'white', fontSize: 18 } },
    };

    const data = Object.entries(dataMethods);
    return (
      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={ data }
        options={ options }
      />
    );
  };

  dataByTag = () => {
    const { expenses } = this.props;
    const tags = { ...new Set(expenses.map(({ tag }) => tag)) };
    const values = expenses.reduce((result, exp) => {
      if (result[exp.tag]) {
        result[exp.tag] += this.getConvertedValue(exp);
      } else {
        result[exp.tag] = this.getConvertedValue(exp);
      }
      return result;
    }, tags);

    const dataTags = { Categorias: 'Valores', ...values };

    const options = {
      pieHole: 0.5,
      is3D: false,
      backgroundColor: 'transparent',
      titleColor: 'white',
      legend: { textStyle: { color: 'white', fontSize: 18 } },
    };

    const data = Object.entries(dataTags);
    return (
      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={ data }
        options={ options }
      />
    );
  };

  dataByCurrency = () => {
    const { expenses } = this.props;
    const currencies = { ...new Set(expenses.map(({ currency }) => currency)) };
    const values = expenses.reduce((result, exp) => {
      if (result[exp.currency]) {
        result[exp.currency] += this.getConvertedValue(exp);
      } else {
        result[exp.currency] = this.getConvertedValue(exp);
      }
      return result;
    }, currencies);

    const dataCurrencies = { Categorias: 'Valores', ...values };

    const options = {
      pieHole: 0.5,
      is3D: false,
      backgroundColor: 'transparent',
      titleColor: 'white',
      legend: { textStyle: { color: 'white', fontSize: 18 } },
    };

    const data = Object.entries(dataCurrencies);
    return (
      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={ data }
        options={ options }
      />
    );
  };

  handleChange = (_event, newValue) => {
    this.setState({ value: newValue });
  };

  render() {
    const { value } = this.state;

    return (
      <div className="Graphs glass-header">
        <TabContext value={ value }>
          <TabList
            onChange={ this.handleChange }
            aria-label="Vertical tabs example"
            centered
            sx={ { borderRight: 1,
              borderColor: 'divider',
              filter: 'invert(0.95)' } }
          >
            <Tab label="Moedas" value="1" sx={ { fontSize: 'large' } } />
            <Tab label="Métodos" value="2" sx={ { fontSize: 'large' } } />
            <Tab label="Categorias" value="3" sx={ { fontSize: 'large' } } />
          </TabList>
          <TabPanel value="1">{this.dataByCurrency()}</TabPanel>
          <TabPanel value="2">{this.dataByMethod()}</TabPanel>
          <TabPanel value="3">{this.dataByTag()}</TabPanel>
        </TabContext>
      </div>

    );
  }
}

Graphs.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape),
}.isRequired;

const mapStateToProps = (state) => {
  const { wallet: { expenses } } = state;
  return { expenses };
};

export default connect(mapStateToProps)(Graphs);
