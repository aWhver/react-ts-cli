import React from 'react';
import { Observable, fromEvent, of } from 'rxjs';
import { map, concatAll } from 'rxjs/operators';
import { ObserverParam } from './Types';

class Home extends React.PureComponent<{}, {}> {
  observer = new Observable<ObserverParam>(subscriber => {
    try {
      subscriber.next({ id: '1' });
      subscriber.next({ id: '2' });
      // const dd = of({id: '1'}, {id: '2'});
      // // console.log(of({id: '1'}, {id: '2'}))
      // dd.subscribe({
      //   next: v => {
      //     console.log(v);
      //   },
      //   complete: () => {
      //     console.log(44)
      //   }
      // })
      // throw new Error('抛出错误');
      setTimeout(() => {
        subscriber.next({ id: '3' });
        subscriber.complete();
      }, 1000);

      // subscriber.next({ id: '3' }); // 执行了complete后无效
    } catch (error) {
      subscriber.error(error);
    }
  });

  componentDidMount() {
    const source = fromEvent(document.body, 'click').pipe(
      map(e => of(1, 2, 3)),
      concatAll()
      );
    source.subscribe({
      next: value => {
        console.log(value);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  onSubscribe = () => {
    this.observer.subscribe({
      next: value => {
        console.log(value);
      },
      error: err => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      }
    });
    console.log('subscribe end');
  };

  render() {
    return (
      <div>
        this is home<button onClick={this.onSubscribe}>obverser</button>
      </div>
    );
  }
}

export default Home;
