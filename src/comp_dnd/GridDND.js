
import React, {Component, Fragment, useRef} from 'react';
import ReactDOM from 'react-dom';
import { FixedSizeGrid as Grid } from 'react-window';

import './styles.css';
import {SortableItem} from "./ItemWindow";
import {KeyboardSensor, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import {sortableKeyboardCoordinates} from "@dnd-kit/sortable";

const Cell = ({ columnIndex, rowIndex, style, data}) => (
    <div
        index={columnIndex} style={style} data={data}
        className={
            columnIndex % 2
                ? rowIndex % 2 === 0
                    ? 'GridItemOdd'
                    : 'GridItemEven'
                : rowIndex % 2
                    ? 'GridItemOdd'
                    : 'GridItemEven'
        }
        // style={style}
    >
        r{rowIndex}, c{columnIndex}
    </div>
);

const Example = () => {

        const gridRef = useRef();

            const scrollToRow100Column50Auto = () => {
                if(!gridRef?.current) return
                gridRef.current.scrollToItem({
                    columnIndex: 50,
                    rowIndex: 100,
                });
            };

            const scrollToRow300Column150Start = () => {
                if(!gridRef?.current) return
                gridRef.current.scrollToItem({
                    align: 'start',
                    columnIndex: 150,
                    rowIndex: 300,
                });
            };

            const scrollToRow350Column200End = () => {
                if(!gridRef?.current) return
                gridRef.current.scrollToItem({
                    align: 'end',
                    columnIndex: 200,
                    rowIndex: 350,
                });
            };

            const     scrollToRow200Column100Center = () => {
                if(!gridRef?.current) return
                gridRef.current.scrollToItem({
                    align: 'center',
                    columnIndex: 100,
                    rowIndex: 200,
                });
            };

            const scrollToRow250Column150Smart = () => {
                if(!gridRef?.current) return
                gridRef.current.scrollToItem({
                    align: 'smart',
                    columnIndex: 150,
                    rowIndex: 250,
                });
            };

        return (
            <Fragment>
                <div>
                    <button
                        className="ExampleButton"
                        onClick={scrollToRow100Column50Auto}
                    >
                        Scroll to row 100, column 50 (align: auto)
                    </button>
                    <button
                        className="ExampleButton"
                        onClick={scrollToRow300Column150Start}
                    >
                        Scroll to row 300, column 150 (align: start)
                    </button>
                    <button
                        className="ExampleButton"
                        onClick={scrollToRow350Column200End}
                    >
                        Scroll to row 350, column 200 (align: end)
                    </button>
                    <button
                        className="ExampleButton"
                        onClick={scrollToRow200Column100Center}
                    >
                        Scroll to row 200, column 100 (align: center)
                    </button>
                    <button
                        className="ExampleButton"
                        onClick={scrollToRow250Column150Smart}
                    >
                        Scroll to row 250, column 150 (align: smart)
                    </button>
                </div>



                <Grid
                    className="Grid"
                    columnCount={1000}
                    columnWidth={100}
                    height={150}
                    ref={gridRef}
                    rowCount={1000}
                    rowHeight={35}
                    width={300}
                >

                    {Cell}

                </Grid>


            </Fragment>
        );
   }



export default Example
