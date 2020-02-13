import React, { PureComponent } from 'react';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

class Catch extends PureComponent {
  componentDidMount() {
    this._initCatchErr();
  }

  _initCatchErr() {
    const source = of('a', 'b', 5, 'c', 'd', 4).pipe(
      map(x => {
        if (typeof x === 'number') {
          throw new Error('error');
        } else {
          return x.toUpperCase();
        }
      }),
      catchError(err => {
        throw new Error(err)
        // return empty();
      })
    );
    source.subscribe({
      next: value => {
        console.log(value);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  render() {
    return <div>
      <div>
        <h4>catchError（浏览器查看）</h4>
        1、catchError会捕获obverser产生的错误，catchError可以产生2种结果，<br/>
        （1）、如果在catchError里直接抛出错误，会执行obverser的error函数逻辑<br/>
        （2）、如果在catchError里返回一个obverser,不会执行原obverser的error函数，会将obverser的发送值传输到next函数
        2、也可以用catchError回调函数函数的第2个参数，这个参数是当前的 observalbe，通过回传原来的obverser可以重新执行obverser
      </div>
    </div>;
  }
}

export default Catch;
