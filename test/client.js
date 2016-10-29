import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Exemple from './views/Exemple';

class App extends Component {
  render() {
    return (<Exemple />);
  }
}
ReactDOM.render(<App/>, document.getElementById('app'));
