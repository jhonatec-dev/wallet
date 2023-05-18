import React from 'react';
import Graphs from '../components/Graphs';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <div className="Wallet">
        <Header />
        <div className="WalletForm__container glass-header">

          <WalletForm />
        </div>
        <Table />
        <Graphs />
      </div>
    );
  }
}

export default Wallet;
