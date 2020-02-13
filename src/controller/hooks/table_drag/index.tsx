import React from 'react';

import { DragSource, DropTarget, DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { IProps, IState, ColumnItemProps } from './Types';
import { ItemTypes, cardSource, collect, cardTarget, DropCollect } from './constant';

class TableDrag extends React.Component<IProps, IState> {

  onClick = () => {
    console.log(1);
  }

  render() {
    const {
      isDragging,
      connectDragSource,
      columnItem,
      connectDropTarget,
    } = this.props;

    return connectDragSource(connectDropTarget(<div onClick={this.onClick}>
      I am a draggable card number {columnItem.label} {columnItem.index}
      {isDragging && ' (and I am being dragged now)'}
    </div>)

    );
  }
}

const NewTableDrag = DragSource(ItemTypes.CARD, cardSource, collect)(TableDrag);
const NewTableDrop = DropTarget(ItemTypes.CARD, cardTarget, DropCollect)(NewTableDrag);

class DragWrap extends React.Component {
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

  onChange = (value, targetIndex) => {
    console.log(value, targetIndex);
    const data = this.state.data;
    const targetItem = data[targetIndex]; // 需要被替换的项
    let dragItem: ColumnItemProps | null = null; // 替换的项
    let dragIndex: number = 0;
    data.forEach((item, index) => {
      if (index === value.columnIndex) {
        dragItem = item;
        dragIndex = index;
      };
    })
    data[targetIndex] = dragItem;
    data[dragIndex] = targetItem;
    this.setState({
      data
    })
  }

  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        {this.state.data.map((item, index) => (
          <NewTableDrop key={index} onChange={this.onChange} columnItem={item} columnIndex={index} />
        ))}
      </DndProvider>
    );
  }
}

export default DragWrap;
