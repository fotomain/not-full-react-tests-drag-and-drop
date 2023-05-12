

// elementbyid set remove display none
// https://stackblitz.com/edit/react-fhueel?file=src%2FApp.js

// v1 https://www.horuskol.net/blog/2020-08-15/drag-and-drop-elements-on-touch-devices/

import React, {useState, useRef, useEffect} from 'react';
import './styles.css';
import {IonRow} from "@ionic/react";

const GridDND = () => {

    console.log('=== GridDND')

    const dragItem = useRef();
    const dragOverItem = useRef();
    let list_init = []
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

    var realRefs = [];
    for (let i = 0; i <list_init.length; i++){
        realRefs[i] = new React.useRef(null)
    }

    var spaceRefs = [];
    for (let i = 0; i <list_init.length; i++){
        spaceRefs[i] = new React.useRef(null)
    }



    const [state, set_state] = React.useState(
        {
            data_list: list_init,
            goto_item_id:null,
            draggable_background_color:'red',
            // use_prevent_default:true,
            use_prevent_default:false,
        }
    );

    const onDragOver = (e, index_in_array) => {
        if (state.use_prevent_default) {
            e.preventDefault();
        }

        e.dataTransfer.dropEffect = "move";
        console.log("=== onDragOver",e.target.innerHTML);
    };

    const dragStart = ( e, index_in_array, here_ref, space_ref ) => {
        // if (state.use_prevent_default) {
        //     e.preventDefault();
        // }

        dragItem.current = index_in_array;
        console.log("=== dragStart",index_in_array);
        console.log("=== dragStart",e.target.innerHTML);

        const ref = here_ref
        const spc = space_ref
        console.log("=== dragStart here_ref",here_ref);
        console.log("=== dragStart space_ref",here_ref);
        ref.current.style.backgroundColor = 'green';

        spc.current.style.display = "block";
        spc.current.style.backgroundColor = 'yellow';



        // ref.current.style.padding = '3rem';
        // ref.current.style.color = 'white';
        // ref.current.style.width = '150px';
        // ref.current.style.height = '150px';
        // ref.current.style.margin = '50px';
        // ref.current.style.borderRadius = '10px';

    };


    const onTouchStart = ( e, index_in_array, here_ref, space_ref ) => {

        console.log("=== onTouchStart")
        if (state.use_prevent_default) {
            e.preventDefault();
        }


    }

    const dragEnter = ( e, index_in_array, here_ref, space_ref ) => {
        if (state.use_prevent_default) {
            e.preventDefault();
        }

        dragOverItem.current = index_in_array;
        console.log("=== dragEnter over id ",e.target.id);

        console.log("=== dragEnter event e  ",e);
        // console.log("=== dragEnter on relativeTarget id ",e.relativeTarget.id);

    };

    const drop = (e) => {
        if (state.use_prevent_default) {
            e.preventDefault();
        }

        const goto_item_id = state.data_list[dragItem.current].id
        const copyListItems = [...state.data_list];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);

        dragItem.current = null;
        dragOverItem.current = null;

        set_state({...state,
            ...{
                goto_item_id:goto_item_id,
                data_list:copyListItems
            }});

    };


    const goto_element_by_index = (params) => {

        if(!params.goto){ return }

        var element=null

        if('down'==params.goto){
            const el_index = state.list_data.length-1
            console.log('=== el_index' , el_index)
            element = document.getElementById('card-'+el_index.toString());
            console.log("=== element 111",element)
        }
        if('up'==params.goto){
            const el_index = state.list_data[0].id
            console.log('=== el_index' , el_index)
            element = document.getElementById(el_index);
            console.log("=== element top",element)
        }
        if('id'==params.goto){
            const el_index = params.id
            console.log('=== el_index' , el_index)
            element = document.getElementById(el_index);
            console.log("=== element id",element)
        }

        if (element) {
            // 👇 Will scroll smoothly to the top of the next section
            console.log('=== scrollIntoView',element)
            // , block: "end", inline: "nearest"
            element.scrollIntoView({ behavior: "smooth" });
        }


    };

    // useEffect(() => {
    //     console.log('goto_item_id',state.goto_item_id)
    //
    //     goto_element_by_index({goto:'id',id:state.goto_item_id})
    //
    //     return () => {
    //
    //     };
    // }, [state.goto_item_id]);

    useEffect(() => {



        window.addEventListener('devicechange', (event) => {
            console.log('=== devicechange',event)
        })

        // document.addEventListener('touchmove', preventScrolling, { passive: false, })

    },[])

    return (
        <IonRow id={'list_1'} className="list_class">
            <IonRow>111</IonRow>
            {
                state&&
                state.data_list.map((item, index) => (
                    <div key={ 'key_'+ item.id} >
                        <div ref={spaceRefs[index]} style={{display:'none'}}>
                            s{item.id}
                        </div>
                        <div
                            className="item_class"
                            id={item.id}
                            ref={realRefs[index]}
                            style={{backgroundColor:(item.id==state.goto_item_id)?'red':'lightblue', textAlign:'center', fontSize:'20px'}}
                            onDragStart={(e) => dragStart(e, index, realRefs[index], spaceRefs[index])}
                            onDragEnter={(e) => dragEnter(e, index, realRefs[index], spaceRefs[index])}
                            onDragOver ={(e) => onDragOver(e, index)}
                            onDragEnd={drop}

                            // onTouchStart={(e) => onTouchStart(e, index, realRefs[index], spaceRefs[index])}

                            // onTouchMove={(e)=>{
                            //     console.log('=== onTouchMove',e)
                            //     if (state.use_prevent_default) {
                            //         // e.preventDefault();
                            //     }
                            // }}
                            //
                            key={index}
                            draggable

                        >
                            {item.id}
                        </div>
                    </div>
                ))}
        </IonRow>
    );
};
export default GridDND;

