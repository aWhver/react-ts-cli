import React, { Component } from 'react';
import { IState } from './types';

/** eslint @typescript-eslint/no-explicit-any: ['off'] */
class App extends Component<any, IState> {
  state: IState = {
    name: 'zhaojuntong',
    age: 24
  }
  render() {
    const { name, age } = this.state;
    const a = "test";

    return <div>
      <p>name: {name}</p>
      <p>age: {age}</p>
      This is React App</div>;
  }
}

export default App;
