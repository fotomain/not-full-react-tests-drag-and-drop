


import React from "react";



import "./styles.css";
import DraggableList from "./dist";


export default function GridDND() {

    const goto = () => {
        console.log("=== goto")

        const element = document.getElementById('item_50');

        if (element) {
            element?.scrollIntoView({behavior: 'smooth'});
        }
    }

    const myList = [
        {name: "one", color: "green"},
        {name: "two", color: "blue"},
        {name: "three", color: "red"},
        {name: "four", color: "lightgreen"},
        {name: "five", color: "lightblue"},
        {name: "six", color: "cyan"},
        {name: "one", color: "green"},
        {name: "two", color: "blue"},
        {name: "three", color: "red"},
        {name: "four", color: "lightgreen"},
        {name: "five", color: "lightblue"},
        {name: "six", color: "cyan"}, {name: "one", color: "green"},
        {name: "two", color: "blue"},
        {name: "three", color: "red"},
        {name: "four", color: "lightgreen"},
        {name: "five", color: "lightblue"},
        {name: "six", color: "cyan"}, {name: "one", color: "green"},
        {name: "two", color: "blue"},
        {name: "three", color: "red"},
        {name: "four", color: "lightgreen"},
        {name: "five", color: "lightblue"},
        {name: "six", color: "cyan"}, {name: "one", color: "green"},
        {name: "two", color: "blue"},
        {name: "three", color: "red"},
        {name: "four", color: "lightgreen"},
        {name: "five", color: "lightblue"},
        {name: "six", color: "cyan"}, {name: "one", color: "green"},
        {name: "two", color: "blue"},
        {name: "three", color: "red"},
        {name: "four", color: "lightgreen"},
        {name: "five", color: "lightblue"},
        {name: "six", color: "cyan"}, {name: "one", color: "green"},
        {name: "two", color: "blue"},
        {name: "three", color: "red"},
        {name: "four", color: "lightgreen"},
        {name: "five", color: "lightblue"},
        {name: "six", color: "cyan"}, {name: "one", color: "green"},
        {name: "two", color: "blue"},
        {name: "three", color: "red"},
        {name: "four", color: "lightgreen"},
        {name: "five", color: "lightblue"},
        {name: "six", color: "cyan"}, {name: "one", color: "green"},
        {name: "two", color: "blue"},
        {name: "three", color: "red"},
        {name: "four", color: "lightgreen"},
        {name: "five", color: "lightblue"},
        {name: "six", color: "cyan"},
    ];
    const handleClick = () => {
        console.log("mylist: ", myList);
    };
    const handleMouseMove = (e) => {
        e.preventDefault()
        console.log("=== coords: ", e);
    };
    const onListChange = (e) => {
        // e.preventDefault()
        console.log("=== onListChange: ", e);
    };

    return (

        <div
            className="list_draggable"
            // style={{ width: 300, margin: "0 auto" }}
        >
            <DraggableList width={60} height={60}
                           onMoveEnd={(newList) => onListChange(newList)}
                // handleMouseMove={(e)=>handleMouseMove(e)}
                // onMoveEnd={(e) => {
                //     e.preventDefault()
                //     console.log("=== onMoveEnd  ")
                // }}
                // onDragOver={event=> {
                //     event.preventDefault()
                //     console.log("=== onDragOver")
                // }}
            >
                {myList.map((item, i) => (
                    <div
                        key={'key_item_' + i}
                        id={'item_' + i}

                        onPointerMove={(e) => {
                            console.log('=== onPointerMove', e.target.id)

                        }
                        }
                        onPointerEnter={(e) => {
                            console.log('=== onPointerEnter', e)
                        }
                        }

                        onPointerLeave={(e) => {
                            // console.log('=== onPointerLeave',e)
                        }
                        }

                        onPointerDown={(e) => {
                            console.log('=== onPointerDown', e)
                        }
                        }
                        onPointerUp={(e) => {
                            console.log('=== onPointerUp', e.target.id)
                            goto()
                        }
                        }


                        // onDragOver={event=> {
                        //     event.preventDefault()
                        //     console.log("=== onDragOver")
                        // }}

                        style={{width: 60, height: 60, background: item.color}}>

                        {i} {item.color}
                    </div>
                ))}
                {/* <div style={{ width: 100, height: 100, background: "green" }}>1</div>
          <div style={{ width: 100, height: 100, background: "blue" }}>2</div>
          <div style={{ width: 100, height: 100, background: "red" }}>3</div>
          <div style={{ width: 100, height: 100, background: "lightgreen" }}>
            4
          </div>
          <div style={{ width: 100, height: 100, background: "lightblue" }}>
            5
          </div> */}
            </DraggableList>
            <button onClick={handleClick}>get order</button>
        </div>

    )
}
