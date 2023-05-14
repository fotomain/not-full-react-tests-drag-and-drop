
import * as React from 'react';
declare type Props = {
    rowSize: number;
    width: number;
    height: number;
    children: React.ReactNode;
};
declare type State = {
    rowSize: number;
    width: number;
    height: number;
    count: number;
    mouseXY: Array<number>;
    mouseDelta: Array<number>;
    lastPress: number;
    isMoved: boolean;
    isPressed: boolean;
    orders: Array<number>;
    children: Array<React.ReactNode>;
};
declare class DraggableList extends React.Component<Props, State> {
    constructor(props: Props);
    handleMouseDown: (params: {
        key: number;
        pressLocation: [number, number];
        e: React.MouseEvent<any>;
    }) => void;
    handleClick: (e: React.MouseEvent<any>) => void;
    handleMouseMove: (e: {
        pageX: number;
        pageY: number;
    }) => void;
    handleMouseUp: () => void;
    getLayout: () => number[][];
    render(): JSX.Element;
}
export default DraggableList;
