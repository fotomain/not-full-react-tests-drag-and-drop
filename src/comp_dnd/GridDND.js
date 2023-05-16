

import React, {Component, Fragment, useCallback, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import { FixedSizeGrid as Grid } from 'react-window';

import './styles.css';
import {SortableItem} from "./ItemWindow";
import {
    closestCenter,
    DndContext,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {arrayMove, rectSortingStrategy, SortableContext, sortableKeyboardCoordinates} from "@dnd-kit/sortable";


const Example = () => {

    const gridRef = useRef();

    const init_state={device_is_mobile:false}
    const [state, set_state] = React.useState(init_state);


    const [items, setItems] = React.useState(
        [...Array(200).keys()].map((index) => `Item ${index}`)
    );


    const [activeId, setActiveId] = useState(null);

    const Cell = (props) => {

        console.log('=== props',props)

        const { columnIndex, rowIndex, style } = props

        const tindex = columnIndex + rowIndex*10
        console.log("=== tindex",tindex)

        return(
            <SortableItem index={tindex} style={style} data={items} >
            <div
                index={columnIndex} style={style}
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
                {items[tindex]}
                {/*r{rowIndex}, c{columnIndex}*/}
            </div>
            </SortableItem>
        )
    }


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


    const sensors_mobile = useSensors(
        useSensor(TouchSensor),
        // useSensor(MouseSensor),
        // useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    const sensors_desktop = useSensors(
        // useSensor(TouchSensor),
        // useSensor(MouseSensor),
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    const handleDragStart = (event:any) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event:any) => {
        setActiveId(null);
        const { active, over } = event;

        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleDragCancel = useCallback(() => {
        setActiveId(null);
    }, []);

    return (
            <Fragment>

            <DndContext
                sensors={(state.device_is_mobile)?sensors_mobile:sensors_desktop}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragCancel={handleDragCancel}
            >


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

                <SortableContext
                    items={items} strategy={rectSortingStrategy}
                >
{/*!!!!!<SortableItem index={props.columnIndex} style={props.style} data={props.data}>*/}

                <Grid
                    className="Grid"

                    columnCount={10}
                    rowCount={10}

                    columnWidth={100}
                    height={150}
                    ref={gridRef}
                    rowHeight={35}
                    width={300}
                    data={items}
                >

                    {Cell}

                </Grid>

                </SortableContext>

            </DndContext>
            </Fragment>
        );
   }



export default Example
