
import React, {useEffect, useState} from "react";
import "./styles.css";

// npm i dnd-kit
// npm i @dnd-kit/sortable
// npm i @dnd-kit/core

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
    rectSortingStrategy
} from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";

const device_info = () => {

    var ret = {}

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

const GridDND = (props) => {


    const init_state={}

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

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    window.addEventListener('devicechange', (event) => {

        console.log("=== devicechange ",event)
        const l_current_device = device_info()
        set_state({...state,...{device_is_mobile:l_current_device.device_is_mobile}})

    });


    const handleDragEnd = (event) => {
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
                onDragEnd={handleDragEnd}
                onDragStart={handleDragStart}
            >
                <div className="app-intro"
                    // flex={true}
                    // wrap={true}
                    // direction="row"
                    // style={{
                    //     maxWidth: "600px"
                    // }}
                >
                    <SortableContext items={items} strategy={rectSortingStrategy}>
                        {items.map((id) => (
                            <SortableItem key={id} id={id} handle={true} value={id} />
                        ))}
                        <DragOverlay>
                            {activeId ? (
                                <div
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        backgroundColor: "red"
                                    }}
                                ></div>
                            ) : null}
                        </DragOverlay>
                    </SortableContext>
                </div>
            </DndContext>
        </>
    );
};


export default GridDND;



