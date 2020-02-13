import React from 'react';
import {
  DndProvider,
  useDrag,
  DragSourceMonitor,
  useDrop,
  DropTargetMonitor
} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { IProps, ColumnItemProps, IState } from './Types';
import { ItemTypes } from './constant';

function MyDragTarget(props: IProps) {
  const { columnItem, columnIndex, children } = props;
  const [, drag] = useDrag({
    item: {
      ...columnItem,
      columnIndex,
      type: ItemTypes.CARD
    },
    begin(monitor: DragSourceMonitor) {
      // console.log(monitor);
    },
    collect(monitor: DragSourceMonitor) {
      // console.log(monitor);
      return {
        isDragging: monitor.isDragging()
      };
    }
  });
  // console.log(collectedProps);

  return <div ref={drag}>Drop Target {children}</div>;
}

function MyDropTarget(props: IProps) {
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop(item, monitor: DropTargetMonitor) {
      const { columnItem, columnIndex, onChange } = props;
      const dragItem = monitor.getItem();
      const dragIndex = dragItem.columnIndex;
      const hoverIndex = columnIndex;
      console.log(dragItem, hoverIndex, dragIndex, columnItem);
      onChange && onChange(dragItem, hoverIndex);
    },
    collect(monitor: DropTargetMonitor) {
      return {
        isOver: monitor.isOver(),
        // 确定是当前目标，而不是嵌套的子
        isOverCurrent: monitor.isOver({ shallow: true }),
        // 如果differenceFromInitialOffset.x大于0则往后移
        differenceFromInitialOffset: monitor.getDifferenceFromInitialOffset()
      };
    }
  });
  // console.log(collectedProps);
  return (
    <div ref={drop}>
      <MyDragTarget {...props} />
    </div>
  );
}

function ColumnWrap(props: IProps) {
  const { onChange, columnItem, columnIndex, children } = props;

  // console.log(data);
  return (
    <DndProvider backend={HTML5Backend}>
      <MyDropTarget
        onChange={onChange}
        columnItem={columnItem}
        columnIndex={columnIndex}
      >
        {children}
      </MyDropTarget>
    </DndProvider>
  );
}

class Demo extends React.Component<{}, IState> {
  state: IState = {
    data: [
      {
        label: 'label1'
      },
      {
        label: 'label2'
      },
      {
        label: 'label3'
      }
    ]
  };

  onChange = (value: ColumnItemProps, targetIndex: number) => {
    console.log(value, targetIndex);
    const data = this.state.data;
    const targetItem = data[targetIndex]; // 需要被替换的项
    let dragItem: ColumnItemProps; // 替换的项
    let dragIndex: number = 0;
    data.forEach((item, index) => {
      if (index === value.columnIndex) {
        dragItem = item;
        dragIndex = index;
      }
    });
    data[targetIndex] = dragItem;
    data[dragIndex] = targetItem;
    console.log(data);
    this.setState({ data });
  };
  render() {
    return (
      <>
        {this.state.data.map((item, index) => {
          return (
            <ColumnWrap
              key={index}
              onChange={this.onChange}
              columnItem={item}
              columnIndex={index}
            >
              <p>
                {item.label}
                {index}
              </p>
            </ColumnWrap>
          );
        })}
      </>
    );
  }
}

export default Demo;
