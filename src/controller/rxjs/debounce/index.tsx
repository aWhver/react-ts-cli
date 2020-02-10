import React, { PureComponent } from 'react';
import bind from 'cached-bind';
import { Observable, interval } from 'rxjs';
import { debounce, debounceTime } from 'rxjs/operators';
import { Link } from 'react-router-dom';
import { IState } from './Types';

// const obverserMap = new Map([
//   ['debounce', debounce(() => interval(3000))],
//   ['debounceTime', debounceTime(3000)],
// ]);

class DebounceDemo extends PureComponent<{}, IState> {
  state: IState = {
    text: ''
  };

  onChangeText(textType: string, e) {
    const source = new Observable<string>(subscriber => {
      subscriber.next(e.target.value);
    }).pipe(debounce(() => interval(3000)));
    source.subscribe(value => {
      // console.log(value);
      this.setState({
        [textType]: value
      });
    });
  }

  onChangeText1(textType: string, e) {
    const source = new Observable<string>(subscriber => {
      subscriber.next(e.target.value);
    }).pipe(debounceTime(3000));
    source.subscribe(value => {
      // console.log(value);
      this.setState({
        [textType]: value
      });
    });
  }

  render() {
    const { text, text1 } = this.state;
    return (
      <div>
        <div>
          debounce
          <p>
            输入：
            <input
              type="text"
              onChange={bind(this, this.onChangeText, 'text')}
            />
          </p>
          <p>debounce延时3s输出：{text}</p>
        </div>
        <div>
          debounceTime
          <p>
            输入：
            <input
              type="text"
              onChange={bind(this, this.onChangeText1, 'text1')}
            />
          </p>
          <p>debounceTime延时3s输出：{text1}</p>
        </div>
        <p>
          debounce和debounceTime是同样的作用，但是接收参数不同，debounce接收一个回调函数，返回一个obverser,通常是定时器，而debounceTime接收一个ms单位的数字，使用便捷。
          <br />
          这2者通常用于防抖，比如输入关键字搜索等，减少发起http请求次数。
        </p>
        <div>
          throttle和throttleTime,接收参数的行为一致，通常用于减少ui层面的事件触犯频率，比如鼠标滑动，滚动等，例子见
          <Link to="/rxjs/delay">delay/delayWhen操作符</Link>
          <p></p>
        </div>
      </div>
    );
  }
}

export default DebounceDemo;
