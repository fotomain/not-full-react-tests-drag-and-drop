

// elementbyid set remove display none
// https://stackblitz.com/edit/react-fhueel?file=src%2FApp.js

// v1 https://www.horuskol.net/blog/2020-08-15/drag-and-drop-elements-on-touch-devices/

// style.pointerEvents = "none";

import React, {useState, useRef, useEffect} from 'react';
import './styles.css';
import {IonRow} from "@ionic/react";

import { DragDropContainer, DropTarget } from "react-drag-drop-container";

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

    function over_handler(event) {
        console.log('=== over_handler ',event.target.id)
    }
    function enter_handler(event) {
        console.log('=== enter_handler ',event.target.id)
    }
    function down_handler(event) {
        console.log('=== down_handler ',event.target.id)
    }
    function move_handler(event) {
        console.log('=== move_handler ',event)
        console.log('=== move_handler ',event.target.id, Date.now())
    }
    function up_handler(event) {
        console.log('=== up_handler ',event.target.id)
    }
    function cancel_handler(event) {
        console.log('=== cancel_handler ',event.target.id)
    }
    function out_handler(event) {
        console.log('=== out_handler ',event.target.id)
    }
    function out_handler(event) {
        console.log('=== out_handler ',event.target.id)
    }
    function gotcapture_handler(event) {
        console.log('=== gotcapture_handler ',event.target.id)
    }
    function lostcapture_handler(event) {
        console.log('=== lostcapture_handler ',event.target.id)
    }
    function leave_handler(event) {
        console.log('=== leave_handler ',event.target.id)
    }
    function gotcapture_handler(event) {
        console.log('=== gotcapture_handler ',event.target.id)
    }
    function lostcapture_handler(event) {
        console.log('=== lostcapture_handler ',event.target.id)
    }


    useEffect(() => {

        window.addEventListener("mousemove",e=>{
            console.log("=== mousemove",e.layerY)
        });

        var el

        el = document.getElementById("target1");
        // Register pointer event handlers
        el.onpointerover = over_handler;
        el.onpointerenter = enter_handler;
        el.onpointerdown = down_handler;
        el.onpointermove = move_handler;
        el.onpointerup = up_handler;
        el.onpointercancel = cancel_handler;
        el.onpointerout = out_handler;
        el.onpointerleave = leave_handler;
        el.gotpointercapture = gotcapture_handler;
        el.lostpointercapture = lostcapture_handler;

        el = document.getElementById("target2");
        // Register pointer event handlers
        el.onpointerover = over_handler;
        el.onpointerenter = enter_handler;
        el.onpointerdown = down_handler;
        el.onpointermove = move_handler;
        el.onpointerup = up_handler;
        el.onpointercancel = cancel_handler;
        el.onpointerout = out_handler;
        el.onpointerleave = leave_handler;
        el.gotpointercapture = gotcapture_handler;
        el.lostpointercapture = lostcapture_handler;




        window.addEventListener( "pointermove", function(e){
            console.log( '=== window pointermove ', e.layerY );
        });

        el = document.getElementById("target3_background");
        // Register pointer event handlers
        el.onpointerover = over_handler;
        el.onpointerenter = enter_handler;
        el.onpointerdown = down_handler;
        el.onpointermove = move_handler;
        el.onpointerup = up_handler;
        el.onpointercancel = cancel_handler;
        el.onpointerout = out_handler;
        el.onpointerleave = leave_handler;
        el.gotpointercapture = gotcapture_handler;
        el.lostpointercapture = lostcapture_handler;


    },[])

    function dragStart(params) {
        console.log('=== dragStart')
    }
    function dragEnter(params) {
        console.log('=== dragEnter')
    }
    function onDragOver(params) {
        console.log('=== onDragOver')
        set_state({...state,
            ...{
                on_drag_over:params.target.id,
            }});


    }
    function drop(params) {
        console.log('=== drop')
    }

    function onTouchStart(params) {
        console.log('=== onTouchStart')
        params.preventDefault()
        set_state({...state,
            ...{
                // params.targetTouches[0].id
                on_touch_start:Date.now(),
            }});

    }

    function onTouchMove (params) {
        console.log('=== onToucMove')
        params.preventDefault()
        set_state({...state,
            ...{
                // params.targetTouches[0].id
                on_touch_move:Date.now(),
            }});

    }

    return (
        <>

            <br/>
            <div>on_drag_over {state.on_drag_over}</div>
            <br/>

            <br/>
            <div>on_touch_start {state.on_touch_start}</div>
            <br/>

            <br/>
            <div> on_touch_move {state.on_touch_move}</div>
            <br/>

            <div id={'target3_background'} className={'target3_background'}
                 onDragStart={(e) => dragStart(e)}
                 onDragEnter={(e) => dragEnter(e)}
                 onDragOver ={(e) => onDragOver(e)}
                 onDragEnd={drop}
                 onTouchStart={(e) => onTouchStart(e)}
                 onTouchMove={(e) => onTouchMove(e)}

            >
            <div id={'target2'}>
                <img
                    draggable

                    src="https://media.istockphoto.com/photos/bite-on-a-red-apple-picture-id475190475?k=6&m=475190475&s=612x612&w=0&h=9yexhsRfQ5-f-CKOMkkZiebbgOJuUq9wsbEfmeUmqGw="
                    width="100px"
                    alt=""
                    onDragStart={(e) => dragStart(e)}
                    onDragEnter={(e) => dragEnter(e)}
                    onDragOver ={(e) => onDragOver(e)}
                    onDragEnd={drop}
                    onTouchStart={(e) => onTouchStart(e)}
                    onTouchMove={(e) => onTouchMove(e)}
                />
            </div>

            <div   id={'target1'}>
                <img
                    draggable

                    src="https://media.istockphoto.com/photos/open-cardboard-box-isolated-on-white-with-clipping-path-picture-id504426400?k=6&m=504426400&s=170667a&w=0&h=k4uKpnGrPRDXVFjiXzMwqukovpixMuVZeArhy9e-GMM="
                    width="250px"
                    alt=""

                    onDragStart={(e) => dragStart(e)}
                    onDragEnter={(e) => dragEnter(e)}
                    onDragOver ={(e) => onDragOver(e)}
                    onDragEnd={drop}
                    onTouchStart={(e) => onTouchStart(e)}
                    onTouchMove={(e) => onTouchMove(e)}


                />
            </div>

            </div>

        </>
    );
};
export default GridDND;

