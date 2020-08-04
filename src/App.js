import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import truffleContract from 'truffle-contract';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Opinion from '../src/contracts/Opinion.json';
import axios from 'axios';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends React.Component {

  constructor(props)
  {
    super(props)
  }
  
  componentDidMount()
  {
    axios.get("http://localhost:8080/user/")
      .then(res => console.log(res.data[2]));
  }

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
