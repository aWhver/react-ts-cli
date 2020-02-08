import React, { PureComponent } from 'react';
import { fromEvent, interval } from 'rxjs';
import { map, takeUntil, concatAll, filter, withLatestFrom, throttle } from 'rxjs/operators';
import { IState } from './Types';
import './style.less';

class Drag extends PureComponent<{}, IState> {
  oDrag: HTMLDivElement = null;
  oBody: HTMLBodyElement = null;

  oVideo: HTMLDivElement = null;
  oAnchor: HTMLDivElement = null;

  static state: IState = {
    posX: 0,
    posY: 0
  };

  componentDidMount() {
    this.oDrag = document.querySelector('.drag') as HTMLDivElement;
    this.oBody = document.querySelector('body') as HTMLBodyElement;
    this._initEvent();

    this.oVideo = document.getElementById('video') as HTMLDivElement;
    this.oAnchor = document.getElementById('anchor') as HTMLDivElement;
    this._initScrollEvent();
    this._initVideoDrag();
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

  _initScrollEvent() {
    const bodyScroll = fromEvent(document, 'scroll');
    bodyScroll
      .pipe(
        throttle((e: Event) => interval(50)),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        map((e: Event) => {
          // const oDocument: EventTarget = e.target;

          // console.log(e.target.);
          // const scrollTop: number = document.documentElement.scrollTop || document.body.scrollTop;
          // console.log(scrollTop);
          return this.oAnchor.getBoundingClientRect().bottom < 0;
        })
      )
      .subscribe(value => {
        if (value) {
          this.oVideo.classList.add('video-fixed');
        } else {
          this.oVideo.classList.remove('video-fixed');
        }
      });
  }

  _initVideoDrag() {
    const mousedown = fromEvent(this.oVideo, 'mousedown');
    const mousemove = fromEvent(document, 'mousemove');
    const mouseup = fromEvent(document, 'mouseup');
    const { width, height } = this.oVideo.getBoundingClientRect();

    mousedown
      .pipe(
        filter(() => this.oVideo.classList.contains('video-fixed')),
        map(() => mousemove),
        map(takeUntil(mouseup)),
        concatAll(),
        withLatestFrom(mousedown, (move: MouseEvent, down: MouseEvent) => {
          // console.log(move, down)
          return { posX: move.clientX - down.offsetX, posY: move.clientY - down.offsetY };
        }),
        // map((event: MouseEvent) => {
        //   console.log(event)
        //   return { posX: event.clientX, posY: event.clientY };
        // })
      )
      .subscribe(pos => {
        const { posX, posY } = pos;
        const maxTop = window.innerHeight - height / 2;
        const maxLeft = window.innerWidth - width / 2;
        if ((0 <= posY && posY <= maxTop)) {
          this.oVideo.style.top = `${posY}px`;
        }

        if ((0 <= posX && posX <= maxLeft)) {
          this.oVideo.style.left = `${posX}px`;
        }
      });
  }

  render() {
    return (
      <div className="drag-container">
        <div className="drag"></div>
        <div id="anchor">
          <div className="video" id="video">
            <div className="masker"></div>
            <video
              width="100%"
              key={3}
              controls
              src={
                'http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_480p_stereo.ogg'
              }
            >
              Your browser does not support HTML5 video.
            </video>
          </div>
        </div>
      </div>
    );
  }
}

export default Drag;
