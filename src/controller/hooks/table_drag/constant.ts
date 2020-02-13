import { DragSourceMonitor, DropTargetMonitor, DropTargetConnector, DragSourceConnector } from 'react-dnd';
import { IProps } from './Types';

export const ItemTypes = {
  COLUMN: 'COLUMN'
};

export const columnSource = {
  beginDrag(props: IProps) {
    const { columnItem, columnIndex } = props;
    // 传参给target

    return {
      ...columnItem,
      columnIndex
    };
  },

  endDrag(props: IProps, monitor: DragSourceMonitor) {
    if (!monitor.didDrop()) {
      return;
    }
    // console.log(monitor.didDrop());
    return {};
  }
};

export const columnTarget = {
  drop(props: IProps, monitor: DropTargetMonitor) {
    const { columnItem, columnIndex, onChange } = props;
    const dragItem = monitor.getItem();
    const dragIndex = dragItem.columnIndex;
    const hoverIndex = columnIndex;
    console.log(dragItem, hoverIndex, dragIndex, columnItem);
    onChange && onChange(dragItem, hoverIndex);
  },
  hover(props: IProps, monitor: DropTargetMonitor) {
    const { columnIndex } = props;
    const dragItem = monitor.getItem();

    if (dragItem.columnIndex === columnIndex) {
    }
  }
};

export function dragCollect<CollectedProps, RequiredProps>(connect: DragSourceConnector, monitor: DragSourceMonitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

export function dropCollect<CollectedProps, RequiredProps>(connect: DropTargetConnector, monitor: DropTargetMonitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    // 确定是当前目标，而不是嵌套的子
    isOverCurrent: monitor.isOver({ shallow: true }),
    // 如果differenceFromInitialOffset.x大于0则往后移
    differenceFromInitialOffset: monitor.getDifferenceFromInitialOffset()
  };
}