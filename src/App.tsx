import React, { Component } from 'react';
import AppRouter from 'routers';
import { IState } from './types';
import car from 'images/se.jpeg';
import './a.less';
// eslint-disable-next-line
class App extends Component<any, IState> {
  state: IState = {
    name: 'zhaojuntong',
    age: 24
  };
  render() {
    const { name, age } = this.state;

    return (
      <React.Fragment>
        <div className="wrap">
          <p className="color">name: {name}</p>
          <p>age: {age}</p>
          This is React App
          <img alt="" src={car} />
        </div>
        <AppRouter />
      </React.Fragment>
    );
  }
}

export default App;
