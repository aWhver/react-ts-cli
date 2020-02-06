import React, { PureComponent } from 'react';
import { interval, of } from 'rxjs';
import { skip, take, takeLast, concat } from 'rxjs/operators';
import { IState } from './Types';

class Operators extends PureComponent<{}, IState> {
  private skipOpe = interval(1000).pipe(take(5), skip(3));
  private takeLastOpe = of(0,1,2,3,4).pipe(take(5), takeLast(3));

  state: IState = {
    step: 0,
    nums: [0,1,2,3,4],
    name: [],
  };

  handleSkip = () => {
    this.skipOpe.subscribe({
      next: value => {
        this.setState({
          step: value
        });
      }
    });
  };

  handleTakeLast = () => {
    const tempNums = [];
    this.takeLastOpe.subscribe({
      next: value => {
        tempNums.push(value);
        this.setState({
          nums: tempNums,
        });
      }
    })
  }

  handleConcat = () => {
    const o1 = of('1000');
    const o2 = of('赵');
    const o3 = of('俊', '潼');
    const o = o1.pipe(concat(o2, o3));
    const _name: string[] = [];
    o.subscribe(value => {
      _name.push(value)
      this.setState({
        name: _name
      });
    })
  }

  render() {
    const { step, nums, name } = this.state;

    return (
      <div>
        <h2>operators</h2>
        <div>
          <button onClick={this.handleSkip}>skip：跳过前面3步骤</button>
          <p>步骤：{step}</p>
        </div>
        <div>
          <button onClick={this.handleTakeLast}>taskLast: 取最后3个</button>
          <p>步骤：{nums.map(v => v)}</p>
        </div>
        <div>
          <button onClick={this.handleConcat}>concat: 多observer合并</button>

          <p>名字：{name.map(v => v + ' ')}</p>
        </div>
      </div>
    );
  }
}

export default Operators;
