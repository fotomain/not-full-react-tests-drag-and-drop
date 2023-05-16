
    import React from "react";

    import DraggableList from "react-draggable-lists";
    import "./styles.css";

    export default function GridDND() {

        // const goto = () => {
        //     console.log("=== goto")
        //     return
        //
        //     const element = document.getElementById(state.data_list[0].id);
        //
        //     if (element) {
        //         // 👇 Will scroll smoothly to the top of the next section
        //         element?.scrollIntoView({ behavior: 'smooth' });
        //     }
        // }

        const myList = [
            { name: "one", color: "green" },
            { name: "two", color: "blue" },
            { name: "three", color: "red" },
            { name: "four", color: "lightgreen" },
            { name: "five", color: "lightblue" },
            { name: "six", color: "cyan" },
            { name: "one", color: "green" },
            { name: "two", color: "blue" },
            { name: "three", color: "red" },
            { name: "four", color: "lightgreen" },
            { name: "five", color: "lightblue" },
            { name: "six", color: "cyan" },    { name: "one", color: "green" },
            { name: "two", color: "blue" },
            { name: "three", color: "red" },
            { name: "four", color: "lightgreen" },
            { name: "five", color: "lightblue" },
            { name: "six", color: "cyan" },    { name: "one", color: "green" },
            { name: "two", color: "blue" },
            { name: "three", color: "red" },
            { name: "four", color: "lightgreen" },
            { name: "five", color: "lightblue" },
            { name: "six", color: "cyan" },    { name: "one", color: "green" },
            { name: "two", color: "blue" },
            { name: "three", color: "red" },
            { name: "four", color: "lightgreen" },
            { name: "five", color: "lightblue" },
            { name: "six", color: "cyan" },    { name: "one", color: "green" },
            { name: "two", color: "blue" },
            { name: "three", color: "red" },
            { name: "four", color: "lightgreen" },
            { name: "five", color: "lightblue" },
            { name: "six", color: "cyan" },    { name: "one", color: "green" },
            { name: "two", color: "blue" },
            { name: "three", color: "red" },
            { name: "four", color: "lightgreen" },
            { name: "five", color: "lightblue" },
            { name: "six", color: "cyan" },    { name: "one", color: "green" },
            { name: "two", color: "blue" },
            { name: "three", color: "red" },
            { name: "four", color: "lightgreen" },
            { name: "five", color: "lightblue" },
            { name: "six", color: "cyan" },    { name: "one", color: "green" },
            { name: "two", color: "blue" },
            { name: "three", color: "red" },
            { name: "four", color: "lightgreen" },
            { name: "five", color: "lightblue" },
            { name: "six", color: "cyan" },
        ];
        const handleClick = () => {
            console.log("mylist: ", myList);
        };
        const handleMouseMove = (e) => {
            e.preventDefault()
            console.log("=== coords: ", e);
        };

        return (

                <div style={{ width: 300, margin: "0 auto" }}>
                    <DraggableList width={100} height={100}
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
                            <div key={'item_'+i}

                                 onPointerMove={(e)=>{
                                     console.log('=== onPointerMove',e)}
                                 }
                                 onPointerEnter={(e)=>{
                                     console.log('=== onPointerEnter',e)}
                                 }
                                 onPointerLeave={(e)=>{
                                     console.log('=== onPointerLeave',e)}
                                 }

                                 // onDragOver={event=> {
                                 //     event.preventDefault()
                                 //     console.log("=== onDragOver")
                                 // }}


                                 style={{ width: 100, height: 100, background: item.color }}>
                                {item.name}
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

        );
    }
