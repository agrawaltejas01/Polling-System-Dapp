import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import truffleContract from 'truffle-contract';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Opinion from '../src/contracts/Opinion.json';

class App extends React.Component {

  render() {
    return (
      <h1> Hello World </h1>

    );
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
)

export default App;
