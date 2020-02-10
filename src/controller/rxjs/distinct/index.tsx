import React, { PureComponent } from 'react';
import { from } from 'rxjs';
import { distinct } from 'rxjs/operators';

class Distinct extends PureComponent {
  componentDidMount() {
    this._initDistinct();
  }

  _initDistinct() {
    const arr = [
      { id: 1, name: 'zhao' },
      { id: 2, name: 'jun' },
      { id: 3, name: 'tong' },
      { id: 1, name: 'Inigo' }
    ];
    // const arr = [1, 2, 3, 4, 1, 2, 5];
    const source = from(arr).pipe(
      distinct(x => {
        return x.id;
      })
    );
    // const source = from(arr).pipe(distinct());
    source.subscribe(value => {
      console.log(value);
    });
    console.log(`const arr = [
      {id: 1, name: 'zhao'},
      {id: 2, name: 'jun'},
      {id: 3, name: 'tong'},
      {id: 1, name: 'Inigo'},
    ];
    // const arr = [1, 2, 3, 4, 1, 2, 5];
    const source = from(arr).pipe(
      distinct(x => {
        return x.id;
      })
    );
    // const source = from(arr).pipe(distinct());
    source.subscribe(value => {
      console.log(value);
    });`);
  }

  render() {
    return (
      <div>
        <div>
          <h4>distinct: 用于去重(浏览器查看)</h4>
          1、distinct可接受参数，也可以不接受参数，不接收参数是，只能过滤基本类型。
          <br />
          2、接收参数时，第一个参数为回调函数，通常需要返回用于判断是否重复的字段，因为obverser返回的是实例，
          js 事件的比对是比对内存位置,所以这些实例不可能相同
          <br />
          3、实际上 distinct() 会在背地里建立一个 Set，当接收到元素时会先去判断
          Set 内是否有相同的值，如果有就不送出，如果没有则存到 Set
          并送出。所以记得尽量不要直接把 distinct 用在一个无限的 observable
          里，这样很可能会让 Set 越来越大，建议大家可以放第二个参数
          flushes，或用 distinctUntilChanged
          4、distinct第2个参数是一个obverser,可以通过它来清除之前的缓存，重新对比
        </div>
        <div>
          <h4>distinctUntilChanged</h4>
          1、distinctUntilChanged同样也是过滤掉相同的值，不过和distinct不同的是，distinctUntilChanged只是拿最后输出的元素和前一个对比，如果是一样的就过滤掉<br/>
          通常用于多人及时同步或者客户端状态判断当次输出值和上一次是否相等
        </div>
      </div>
    );
  }
}

export default Distinct;
