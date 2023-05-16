
import React, {useCallback, useEffect, useState} from "react";
import "./styles.css";

// npm i dnd-kit
// npm i @dnd-kit/sortable
// npm i @dnd-kit/core
// npm install react-tiny-virtual-list --save
// npm i --save @types/react-tiny-virtual-list


import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    MouseSensor,
    useSensor,
    useSensors,
    DragOverlay
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy,

} from "@dnd-kit/sortable";

import SortableItem from "../tests_not_full/SortableItem";

import VirtualList, {ItemStyle} from 'react-tiny-virtual-list';
import SortableItemInfinit from "./SortableItemInfinit";

const device_info = () => {

    var ret = {device_is_mobile:false}

    if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)) {
        ret.device_is_mobile = true ;
    } else {
        ret.device_is_mobile = false ;
    }

    console.log("=== device_info", device_info)

    return ret;
}

const GridDND = (props:any) => {


    const init_state={device_is_mobile:false}

    const [state, set_state] = React.useState(init_state);

    const [activeId, setActiveId] = useState(null);
    const [items, setItems] = useState([
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29"
    ]);

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

    window.addEventListener('devicechange', (event) => {

        console.log("=== devicechange ",event)
        const l_current_device = device_info()
        set_state({...state,...{device_is_mobile:l_current_device.device_is_mobile}})

    });


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

    window.onresize = function(){
        console.log("=== window.onresize");
        const l_current_device = device_info()
        set_state({...state,...{device_is_mobile:l_current_device.device_is_mobile}})

    }
    window.onload = function(){
        console.log("=== window.onload");
    }

    useEffect(() => {

        console.log("=== onload useEffect")
        const l_current_device = device_info()
        set_state({...state,...{device_is_mobile:l_current_device.device_is_mobile}})

        return () => {

        };
    }, []);



    return (
        <>
            <div>state.device_is_mobile - {(state.device_is_mobile)?'mobile':'desktop'}</div>
            <br/>
            <DndContext
                sensors={(state.device_is_mobile)?sensors_mobile:sensors_desktop}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragCancel={handleDragCancel}
            >
                <div id="sort_context" className="app-intro"
                    // flex={true}
                    // wrap={true}
                    // direction="row"
                    // style={{
                    //     maxWidth: "600px"
                    // }}
                >
                    <SortableContext
                        items={items} strategy={rectSortingStrategy}
                    >

                        <VirtualList
                            // id={'list1'}
                            // style={{}}
                            className="app-intro"
                            width={500}
                            height={400}
                            // className={styles.VirtualList}
                            itemCount={items.length}
                            itemSize={64}
                            stickyIndices={activeId ? [items.indexOf(activeId)] : undefined}
                            renderItem={(p:{index:number, style:ItemStyle}) => {
                                const id = items[p.index];

                                return (
                                    <SortableItemInfinit
                                        key={id}
                                        id={id}
                                        index={p.index}
                                        // handle={handle}
                                        wrapperStyle={() => ({
                                            ...p.style,
                                            padding: 5,
                                        })}
                                        // style={getItemStyles}
                                        value={id}
                                        useDragOverlay
                                    />
                                );
                            }}
                        />

                        {/*{items.map((id) => (*/}
                        {/*    <SortableItem key={id} id={id} handle={true} value={id} />*/}
                        {/*))}*/}
                        {/*<DragOverlay>*/}
                        {/*    {activeId ? (*/}
                        {/*        <div*/}
                        {/*            style={{*/}
                        {/*                width: "100px",*/}
                        {/*                height: "100px",*/}
                        {/*                backgroundColor: "red"*/}
                        {/*            }}*/}
                        {/*        ></div>*/}
                        {/*    ) : null}*/}
                        {/*</DragOverlay>*/}


                    </SortableContext>
                </div>
            </DndContext>
        </>
    );
};


export default GridDND;



