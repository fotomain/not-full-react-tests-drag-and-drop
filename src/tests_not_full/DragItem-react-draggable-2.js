

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Draggable, {DraggableCore} from 'react-draggable';


const DragItem = (props) => {

    const handleStart = (e, data) => {
        console.log('handleStart')
    }
    const handleDrag = (e, data) => {
        console.log('handleDrag')
        if (props.goto)
        {
            props.goto()
        }
    }
    const handleStop = (e, data) => {
        console.log('handleStop')
    }

    const eventLogger = (e, data) => {
        console.log('Event: ', e);
        console.log('Data: ', data);
    };

    return (

        <Draggable
            axis="both"
            handle=".handle"
            defaultPosition={{x: 0, y: 0}}
            position={null}
            grid={[25, 25]}
            scale={1}
            onStart={handleStart}
            onDrag={handleDrag}
            onStop={handleStop}>
            <div>
                <div className="handle card">Drag {props.id}</div>
            </div>
        </Draggable>
    )
};

export default DragItem;
