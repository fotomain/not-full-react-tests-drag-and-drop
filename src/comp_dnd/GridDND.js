

// elementbyid set remove display none
// https://stackblitz.com/edit/react-fhueel?file=src%2FApp.js

// v1 https://www.horuskol.net/blog/2020-08-15/drag-and-drop-elements-on-touch-devices/

// style.pointerEvents = "none";


    import React, { Component } from 'react';

    import './styles.css';
    import DragItem from './DragItem';

    class GridDND extends Component {

        render() {
            return (
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Welcome to React sample of Point Events</h1>
                    </header>
                    <IonContent className="app-intro">
                        <DragItem id={'object_111'}/>
                        <DragItem id={'object_222'}/>
                        <DragItem id={'object_333'}/>
                        <DragItem id={'object_444'}/>
                        <DragItem id={'object_555'}/>
                    </IonContent>
                </div>);
        }
    }
    export default GridDND;
