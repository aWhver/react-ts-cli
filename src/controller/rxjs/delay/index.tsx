import React, { Component } from 'react';
import { fromEvent } from 'rxjs';
import { delay, map , throttleTime } from 'rxjs/operators';

const imgs: Array<string> = [
  'https://res.cloudinary.com/dohtkyi84/image/upload/c_scale,w_50/v1483019072/head-cover6.jpg',
  'https://res.cloudinary.com/dohtkyi84/image/upload/c_scale,w_50/v1483019072/head-cover5.jpg',
  'https://res.cloudinary.com/dohtkyi84/image/upload/c_scale,w_50/v1483019072/head-cover4.jpg',
  'https://res.cloudinary.com/dohtkyi84/image/upload/c_scale,w_50/v1483019072/head-cover3.jpg',
  'https://res.cloudinary.com/dohtkyi84/image/upload/c_scale,w_50/v1483019072/head-cover2.jpg',
  'https://res.cloudinary.com/dohtkyi84/image/upload/c_scale,w_50/v1483019072/head-cover1.jpg',
];

class DelayDemo extends Component<{}, {}> {
  imgRefs: React.RefObject<HTMLImageElement>[] = []
  componentDidMount() {
    this._initEvent();
  }

  _initEvent() {
    const mouseMove = fromEvent(document, 'mousemove');
    this.imgRefs.forEach((item, index) => {
      if (item.current) {
        mouseMove.pipe(
          throttleTime(100),
          map((e: MouseEvent) => ({ x: e.clientX, y: e.clientY - 300 })),
          delay(600 * (Math.pow(0.65, index) + Math.cos(index / 4)) / 2)
        ).subscribe(pos => {
          item.current.style.transform = 'translate3d(' + pos.x + 'px, ' + pos.y + 'px, 0)';
        })
      }
    })
  }

  render() {
    this.imgRefs = [];
    return (
      <div className="delay-demo">
        {imgs.map(item => {
          const imgRef = React.createRef<HTMLImageElement>();
          this.imgRefs.push(imgRef);
          return <img src={item} ref={imgRef} alt=""/>
        })}
        <p>delayWhen和delay相似，区别是delayWhen操作每一个发送元素，并且接收一个回调函数并返回一个observer,而delay作用于整个obverser</p>
        此处用了throttleTime防止mousemove太过频繁
      </div>
    );
  }
}

export default DelayDemo;
