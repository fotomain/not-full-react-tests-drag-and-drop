


import React, {useEffect} from "react";



import "./styles.css";
import DraggableList from "./dist";



const GridDND = () => {

    const goto = (params) => {
        console.log("=== goto")

        const element = document.getElementById('item_'+params);

        if (element) {
            element?.scrollIntoView({alignToTop:'false', block: "end", inline: "nearest", behavior: 'smooth'});
        }
    }

    const list_init = [
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
        {name: "three", color: "red"},
        {name: "four", color: "lightgreen"},
        {name: "five", color: "lightblue"},
        {name: "six", color: "cyan"}, {name: "one", color: "green"},
        {name: "two", color: "blue"},
        {name: "three", color: "red"},
        {name: "three", color: "red"},
        {name: "four", color: "lightgreen"},
        {name: "five", color: "lightblue"},
        {name: "six", color: "cyan"}, {name: "one", color: "green"},
        {name: "two", color: "blue"},
        {name: "three", color: "red"},
        {name: "three", color: "red"},
        {name: "four", color: "lightgreen"},
        {name: "five", color: "lightblue"},
        {name: "six", color: "cyan"}, {name: "one", color: "green"},
        {name: "two", color: "blue"},
        {name: "three", color: "red"},
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
        console.log("mylist: ", list_init);
    };


    const onListChange = (e) => {
        // e.preventDefault()
        console.log("=== onListChange: ", e);
    };

    const handleMouseMove = (e) => {
        // e.preventDefault()
        console.log("=== handleMouseMove: ", e.from,e.to);
    };
    const handleMouseUp = (e) => {
        // e.preventDefault()
        console.log("=== handleMouseUp: ", e);
    };

    const list1_conteiner_ref = new React.useRef(null)
    const list1_ref = new React.useRef(null)

    useEffect(() => {
        // const list1_ref = document.getElementById("list1")
        if (list1_ref.current){
            list1_ref.current.scrollTo({top:1000})
            console.log("=== list1_ref.current",list1_ref.current)

            const l1 = list1_ref.current
            set_state({...state,...{
                listX1: l1.offsetLeft,
                listY1: l1.offsetTop,
                listX2: l1.offsetLeft+l1.offsetWidth,
                listY3: l1.offsetTop+l1.offsetHeight,
            }})
        }

        return () => {
        };
    }, []);


    const [state, set_state] = React.useState(
        {
            data_list: list_init,
            goto_item_id:null,
            draggable_background_color:'red',
        }
    );

    return (


    <div>
        <div
            className="list_draggable"
            id="list1_conteiner_id"
            ref={list1_conteiner_ref}
            // style={{ width: 300, margin: "0 auto" }}
        >
            <DraggableList width={60} height={60}
                           list_id="list1_id"
                           list_ref={list1_ref}
                           onMoveEnd={(newList) => onListChange(newList)}

                           handleMouseMove={(e)=>{handleMouseMove(e)}}
                           handleMouseUp={(e)=>{handleMouseUp(e)}}

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
                {state.data_list.map((item, i) => (
                    <div
                        key={'key_item_' + i}
                        id={'item_' + i}

                        // onPointerMove={(e) => {
                        //     console.log('=== onPointerMove', e.target.id)
                        //     }
                        // }

                        onPointerEnter={(e) => {
                            console.log('=== onPointerEnter', e.target.id)
                            if("item_26"===e.target.id){
                                goto(32)
                            }
                            if("item_32"===e.target.id){
                                goto(35)
                            }
                            if("item_35"===e.target.id){
                                goto(39)
                            }
                        }
                        }

                        // onPointerLeave={(e) => {
                        //     // console.log('=== onPointerLeave',e)
                        // }
                        // }
                        //
                        // onPointerDown={(e) => {
                        //     console.log('=== onPointerDown', e.target.id)
                        // }
                        // }
                        // onPointerUp={(e) => {
                        //     console.log('=== onPointerUp', e.target.id)
                        //     // goto()
                        // }
                        // }


                        // onDragOver={event=> {
                        //     event.preventDefault()
                        //     console.log("=== onDragOver")
                        // }}

                        style={{width: 60, height: 60, background: item.color}}>

                        {i} {item.color}
                    </div>
                ))}

            </DraggableList>

        </div>

            <textarea width={350} height={150} value={JSON.stringify(state)}></textarea>

            <div>
            <button onClick={handleClick}>get order</button>
            </div>

    </div>
    )
}

export default GridDND
