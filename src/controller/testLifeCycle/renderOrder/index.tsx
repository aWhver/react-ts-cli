import React, { Component } from 'react';
import Child1 from './Child1';
import './style.less';

interface IState {
  count: number;
}

class TestRenderOrder extends Component<{}, IState> {
  state: IState = {
    count: 0
  }
  componentDidMount() {
    console.log('parent component didmounnt');

  }

  componentDidUpdate() {
    console.log('parent component didupdate')
  }

  handleAdd = () => {
    this.setState({ count: 1 }, () => {
      console.log(3);
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.handleAdd}>click</button>
        <Child1 />
        <div className="gradient"></div>
      </div>
    );
  }
}

export default TestRenderOrder;
