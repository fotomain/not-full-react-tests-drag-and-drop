

// elementbyid set remove display none
// https://stackblitz.com/edit/react-fhueel?file=src%2FApp.js

// v1 https://www.horuskol.net/blog/2020-08-15/drag-and-drop-elements-on-touch-devices/

// style.pointerEvents = "none";


    import React, { Component } from 'react';

    import './styles.css';

    import DragItem from './DragItem';

    class GridDND extends Component {

        useState

        render() {
            return (
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Welcome to React sample of Point Events</h1>
                    </header>
                    <div className="App-intro">
                        <DragItem id={'object_111'}/>
                        <DragItem id={'object_222'}/>
                    </div>
                </div>);
        }
    }
    export default GridDND;
