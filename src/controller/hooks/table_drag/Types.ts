import { ConnectDragSource, ConnectDropTarget  } from 'react-dnd';
export interface ColumnItemProps {
  label: string;
  columnIndex?: number;
}

interface Offset {
  x: number;
  y: number;
}

type TOffser = Offset | null;

export interface IProps {
  id?: number;
  isDragging: boolean;
  connectDragSource: ConnectDragSource;
  columnItem: ColumnItemProps;
  columnIndex: number;
  isOver: boolean;
  connectDropTarget: ConnectDropTarget;
  isOverCurrent: boolean;
  differenceFromInitialOffset: TOffser;
  onChange: (val: ColumnItemProps, index: number) => void;
}

export interface IState {
  data: ColumnItemProps[];
}
