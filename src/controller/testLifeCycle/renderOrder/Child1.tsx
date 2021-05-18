import React, { Component } from 'react';
// import sizeof from 'object-sizeof';

class Child1 extends Component {

  componentDidMount() {
    console.log('Child1 component didmounnt')
  }

  componentDidUpdate() {
    console.log('Child1 component didupdate')
  }

  render() {
    console.log('42')
    return <div>
      this is Child1
    </div>
  }
}

export default Child1;
