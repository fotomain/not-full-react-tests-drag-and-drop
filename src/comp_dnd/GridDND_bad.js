

import React, {Component, Fragment, useRef, useState} from 'react';

import { FixedSizeGrid as Grid } from 'react-window';

import './styles.css';

const Cell = ({ columnIndex, rowIndex, style }) => (
    <div
        className={
            columnIndex % 2
                ? rowIndex % 2 === 0
                    ? 'GridItemOdd'
                    : 'GridItemEven'
                : rowIndex % 2
                    ? 'GridItemOdd'
                    : 'GridItemEven'
        }
        style={style}
    >
        r{rowIndex}, c{columnIndex}
    </div>
);



const Example = () =>{

    const gridRef = new useRef(null);

    const scrollToRow100Column50Auto = (lgridRef) => {
        if(!lgridRef.current) return
        lgridRef.current.scrollToItem({
            columnIndex: 50,
            rowIndex: 100,
        });
    };

    const scrollToRow300Column150Start = (lgridRef) => {
        if(!lgridRef.current) return
        lgridRef.current.scrollToItem({
            align: 'start',
            columnIndex: 150,
            rowIndex: 300,
        });
    };

    const scrollToRow350Column200End = (lgridRef) => {
        if(!lgridRef.current) return
        lgridRef.current.scrollToItem({
            align: 'end',
            columnIndex: 200,
            rowIndex: 350,
        });
    };

    const scrollToRow200Column100Center = (lgridRef) => {
        if(!lgridRef.current) return
        lgridRef.current.scrollToItem({
            align: 'center',
            columnIndex: 100,
            rowIndex: 200,
        });
    };

    const scrollToRow250Column150Smart = (lgridRef) => {
        if(!lgridRef.current) return
        lgridRef.current.scrollToItem({
            align: 'smart',
            columnIndex: 150,
            rowIndex: 250,
        });

    }

    const [items, setItems] = React.useState(
        [...Array(200).keys()].map((index) => `Item ${index}`)
    );

    return (
            <Fragment>
                <div>
                    <button
                        className="ExampleButton"
                        onClick={scrollToRow100Column50Auto(gridRef)}
                    >
                        Scroll to row 100, column 50 (align: auto)
                    </button>
                    <button
                        className="ExampleButton"
                        onClick={scrollToRow300Column150Start(gridRef)}
                    >
                        Scroll to row 300, column 150 (align: start)
                    </button>
                    <button
                        className="ExampleButton"
                        onClick={scrollToRow350Column200End(gridRef)}
                    >
                        Scroll to row 350, column 200 (align: end)
                    </button>
                    <button
                        className="ExampleButton"
                        onClick={scrollToRow200Column100Center(gridRef)}
                    >
                        Scroll to row 200, column 100 (align: center)
                    </button>
                    <button
                        className="ExampleButton"
                        onClick={scrollToRow250Column150Smart(gridRef)}
                    >
                        Scroll to row 250, column 150 (align: smart)
                    </button>
                </div>

                <Grid
                    className="Grid"

                    columnCount={10}
                    rowCount={10}

                    columnWidth={10}

                    ref={gridRef}
                    rowHeight={50}

                    width   ={500}
                    height  ={500}

                >
                    {({ columnIndex, rowIndex, data: items }) => (
                        <Cell columnIndex={columnIndex} rowIndex={rowIndex} data={items}  />
                    )}

                    {/*{Cell}*/}

                </Grid>
            </Fragment>
        );
    }

export default Example

