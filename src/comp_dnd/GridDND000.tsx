

// elementbyid set remove display none
// https://stackblitz.com/edit/react-fhueel?file=src%2FApp.js

// v1 https://www.horuskol.net/blog/2020-08-15/drag-and-drop-elements-on-touch-devices/

// style.pointerEvents = "none";

    import React, { Component } from 'react';

    // import { useRef } from "react";
    // import { useDraggable } from "react-use-draggable-scroll";

    import './styles.css';
    import DragItem from './DragItem';

    const ref1 = React.createRef()

    let list_init:any = []
    for (let i = 0; i <100 ; i++) {
        list_init[i]=
            {
                id: "c-"+i,
                name: "name_"+i,
                description: "description "+i,
                thumb:
                    "https://piktochart.com/wp-content/uploads/2022/04/01_Main_header-image_1.svg"
            }

    }

    // const ref =useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    // const { events } = useDraggable(ref); // Now we pass the reference to the useDraggable hook:

const GridDND =()=> {

        const [state, set_state] = React.useState(
            {
                data_list: list_init,
                goto_item_id:null,
                draggable_background_color:'red',
            }
        );

        const goto = () => {
            console.log("=== goto")
            return

            const element = document.getElementById(state.data_list[0].id);

            if (element) {
                // 👇 Will scroll smoothly to the top of the next section
                element?.scrollIntoView({ behavior: 'smooth' });
            }
        }


            return (

                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Welcome to React sample of Point Events</h1>
                    </header>
                    <div className="app-intro"
                         // ref={ref}
                    >
                            <DragItem
                                id={'object_555'}
                                goto={goto}
                            />
                    {
                        state&&
                        state.data_list.map((item:any, index:any) => (

                            <DragItem
                                goto={goto}
                                key={item.id}
                                id={item.id}
                            />

                        ))
                    }
                </div>

                </div>);
    }

    export default GridDND;
