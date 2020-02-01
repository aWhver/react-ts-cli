import React, { PureComponent } from 'react';
import { fromEvent } from 'rxjs';
import { map, takeUntil, concatAll } from 'rxjs/operators';
import { IState } from './Types';
import './style.less';

class Drag extends PureComponent<{}, IState> {
  oDrag: HTMLDivElement = null;
  oBody: HTMLBodyElement = null;

  static state: IState = {
    posX: 0,
    posY: 0
  };

  componentDidMount() {
    this.oDrag = document.querySelector('.drag') as HTMLDivElement;
    this.oBody = document.querySelector('body') as HTMLBodyElement;
    this._initEvent();
  }

  _initEvent() {
    const mousedown = fromEvent(this.oDrag, 'mousedown');
    const mousemove = fromEvent(this.oBody, 'mousemove');
    const mouseup = fromEvent(this.oBody, 'mouseup');

    mousedown
      .pipe(
        map(() => mousemove),
        map(takeUntil(mouseup)),
        concatAll(),
        map((event: MouseEvent) => {
          return { posX: event.clientX, posY: event.clientY };
        })
      )
      .subscribe({
        next: pos => {
          const { posX, posY } = pos;
          this.oDrag.style.top = `${posY}px`;
          this.oDrag.style.left = `${posX}px`;
        }
      });
  }

  render() {
    return (
      <div className="drag-container">
        <div className="drag"></div>
      </div>
    );
  }
}

export default Drag;
