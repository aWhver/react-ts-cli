import React from 'react';
export interface ColumnItemProps {
  label: string;
  columnIndex?: number;
}

export interface IProps {
  columnItem: ColumnItemProps;
  columnIndex: number;
  onChange: (val: ColumnItemProps, index: number) => void;
  children: React.ReactNode;
}

export interface IState {
  data: ColumnItemProps[];
}
