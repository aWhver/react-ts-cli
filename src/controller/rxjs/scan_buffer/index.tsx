import React, { PureComponent } from 'react';
import { Observable, of, empty, fromEvent, interval } from 'rxjs';
import {
  mapTo,
  startWith,
  merge,
  scan,
  buffer,
  bufferTime,
  bufferCount,
  bufferToggle,
  take
} from 'rxjs/operators';
import { autobind } from 'core-decorators';
import { IState } from './Types';

class ScanBuffer extends PureComponent<{}, IState> {
  addObverser: Observable<number> = of(0).pipe(mapTo(1));
  minusObverser: Observable<number> = of(0).pipe(mapTo(-1));

  state: IState = {
    total: 0
  };

  componentDidMount() {
    this._initCounter();
    this._initBuffer();
    this._initBufferTime();
    this._initBufferCount();
    this._initBufferToggle();
  }

  _initCounter() {
    const addButton = document.getElementById('addButton') as HTMLElement;
    const minusButton = document.getElementById('minusButton') as HTMLElement;
    const state = document.getElementById('state');

    const addClick = fromEvent(addButton, 'click').pipe(mapTo(1));
    const minusClick = fromEvent(minusButton, 'click').pipe(mapTo(-1));

    const numberState = empty().pipe(
      startWith(0),
      merge(addClick, minusClick),
      scan((origin, next) => origin + next, 0)
    );
    numberState.subscribe({
      next: value => {
        state.innerHTML = value + '';
      },
      error: err => {
        console.log('Error: ' + err);
      },
      complete: () => {
        console.log('complete');
      }
    });
  }

  @autobind
  handleScanAdd() {
    this.addObverser.subscribe(
      value => {
        console.log(value);
        this.setState(prev => {
          const total = prev.total;
          console.log(value, total);
          return {
            total: total + value
          };
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  @autobind
  handleScanMinus() {
    this.minusObverser.subscribe(value => {
      this.setState(prev => {
        const total = prev.total;
        return {
          total: total + value
        };
      });
    });
  }

  _initBuffer() {
    const buffer1 = interval(300);
    const buffer2 = interval(5000);

    const source = buffer1.pipe(buffer(buffer2));

    source.subscribe(value => {
      console.log(value);
    });
  }

  _initBufferTime() {
    const buffer1 = interval(300);

    const source = buffer1.pipe(bufferTime(1000));

    source.subscribe(value => {
      console.log(value);
    });
  }

  _initBufferCount() {
    const buffer1 = interval(300);

    const source = buffer1.pipe(bufferCount(4));

    source.subscribe(value => {
      console.log(value);
    });
  }

  _initBufferToggle() {
    const click = fromEvent(document, 'click');
    const source = interval(1000).pipe(take(10));
    const example = click.pipe(
      bufferToggle(source, i => {
        console.log(i % 2);
        return i % 2 ? interval(500) : empty();
      })
    );
    example.subscribe(value => {
      console.log(value); // 返回点击事件
    });
  }

  render() {
    const { total } = this.state;
    return (
      <div>
        <div>
          <h4>scan操作符</h4>
          <button id="addButton">add</button>
          <button id="minusButton">minus</button>
          <p id="state"></p>
        </div>
        <div>
          <h4>不用scan操作符</h4>
          <button onClick={this.handleScanAdd}>add</button>
          <button onClick={this.handleScanMinus}>minus</button>

          <p>total: {total}</p>
        </div>
        <div>
          <h4>
            buffer操作符。通常可以用于事件操作和request次数减少。浏览器查看
          </h4>
          <p>
            {' '}
            buffer需要传入一个observer,原本的obverser输出的值会被缓存起来，直到传入的obverser输出值，然后将原来的obverser输出缓存的值输出
          </p>
          <h4>bufferTime操作符。浏览器查看</h4>
          <p>
            {' '}
            bufferTime需要传入一个时间数字，单位ms,是从时间维度来决定多久输出一次缓存的值
          </p>
          <h4>bufferCount操作符。浏览器查看</h4>
          <p>
            {' '}
            bufferCount需要传入一个数字,原本的obverser输出的值会被缓存起来，直到缓存的数量符合要求，然后将原来的obverser输出缓存的值输出
          </p>
        </div>
      </div>
    );
  }
}

export default ScanBuffer;
