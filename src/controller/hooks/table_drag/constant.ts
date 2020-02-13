export const ItemTypes = {
  CARD: 'card'
};

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
export const cardSource = {
  beginDrag(props) {
    const { columnItem, columnIndex } = props;
    // 传参给target

    return {
      ...columnItem,
      columnIndex
    };
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }
    // console.log(monitor.didDrop());
    return {};
  }
};

export const cardTarget = {
  drop(props, monitor) {
    const { columnItem, columnIndex, onChange } = props;
    const dragItem = monitor.getItem();
    const dragIndex = dragItem.columnIndex;
    const hoverIndex = columnIndex;
    console.log(dragItem, hoverIndex, dragIndex, columnItem);
    onChange && onChange(dragItem, hoverIndex);
  },
  hover(props, monitor) {
    const { columnIndex } = props;
    const dragItem = monitor.getItem();

    if (dragItem.columnIndex === columnIndex) {
    }
  }
};

export function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  };
}

export function DropCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    // 确定是当前目标，而不是嵌套的子
    isOverCurrent: monitor.isOver({ shallow: true }),
    // 如果differenceFromInitialOffset.x大于0则往后移
    differenceFromInitialOffset: monitor.getDifferenceFromInitialOffset()
  };
}