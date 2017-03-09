import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Exemple from './views/Example';

class App extends Component {
  render() {
    return (<Example />);
  }
}
ReactDOM.render(<App/>, document.getElementById('app'));
