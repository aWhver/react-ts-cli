import React from 'react';
import { TestSuper } from '../../../utils/super';

export default class TestClass extends React.Component {
  componentDidMount() {
    TestSuper.testa();
    new TestSuper().d();
  }

  render() {
    return <div>
      探索class和super知识
      <p>
        1、super用于constructor函数中用于绑定this，指向父类实例，通常与extends关键字使用
      </p>
      <p>2、在类的静态方法中使用，只能访问静态属性或者调用静态方法</p>
      <p>3、作为setter使用时，表示 <b> this</b></p>
    </div>
  }
}