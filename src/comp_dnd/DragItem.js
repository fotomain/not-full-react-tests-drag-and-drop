

import React from 'react';
const CIRCLE_DIAMETER = 100;

export default class DragItem extends React.Component {
    // https://medium.com/@leonardobrunolima/react-tips-drag-and-drop-using-point-events-2ba33cf7653e
    // https://felixgerschau.com/react-typescript-onpointerentercapture-event-type/
    state = {
        gotCapture: false,
        circleLeft: 100,
        circleTop: 100
    };
    isDragging = false;
    previousLeft = 0;
    previousTop = 0;


    elementsOverlap = (el1, el2) => {

        if(!el1 || !el2) return false

        const domRect1 = el1.getBoundingClientRect();
        const domRect2 = el2.getBoundingClientRect();

        return !(
            domRect1.top > domRect2.bottom ||
            domRect1.right < domRect2.left ||
            domRect1.bottom < domRect2.top ||
            domRect1.left > domRect2.right
        );
    }

    onDown = e => {
        this.isDragging = true;
        e.target.setPointerCapture(e.pointerId);
        this.getDelta(e);
    };
    onMove = e => {
        if (!this.isDragging) {
            return;
        }

        console.log("=== onMove",e.target.id)
        console.log("=== onMove",e)
        const {left, top} = this.getDelta(e);


        const el_under = document.elementFromPoint(e.pageX, e.pageY)
        console.log('=== el_under',el_under)

        const overlaped = this.elementsOverlap(
            document.getElementById('object_111'),
            document.getElementById('object_222')
        )

        this.setState(({circleLeft, circleTop, overlaped} ) => ({
            overlaped: this.elementsOverlap(
                document.getElementById('object_111'),
                document.getElementById('object_222')
            ),
            circleLeft: circleLeft + left,
            circleTop: circleTop + top
        }));

    };
    onUp = e => (this.isDragging = false);
    onGotCapture = e => {
        console.log("=== onGotPointerCapture",e)
        this.setState({gotCapture: true})
    };
    onLostCapture = e => this.setState({gotCapture: false});
    onPointerEnter = e => {
        console.log("=== onPointerEnter",e)
        this.setState({onPointerEnter: e.target.id})
    };
    onPointerOver = e => {
        console.log("=== onPointerOver",e.target.id)
        this.setState({onPointerOver: e.target.id})
    };
    getDelta = e => {
        const left = e.pageX;
        const top = e.pageY;
        const delta = {
            left: left - this.previousLeft,
            top: top - this.previousTop,
        };
        this.previousLeft = left;
        this.previousTop = top;

        return delta;
    };
    render() {
        const {gotCapture, circleLeft, circleTop} = this.state;
        const boxStyle = {
            border: '2px solid #cccccc',
            margin: '10px 0 20px',
            minHeight: 200,
            width: '100%',
            position: 'relative',
        };
        const circleStyle = {
            width: CIRCLE_DIAMETER,
            height: CIRCLE_DIAMETER,
            borderRadius: CIRCLE_DIAMETER / 2,
            position: 'absolute',
            left: circleLeft,
            top: circleTop,
            backgroundColor: gotCapture ? 'red' : 'green',
            //!!!!!!!!!
            touchAction: 'none',
        };
        {/*{...props}*/}
        return (
            <div style={boxStyle}
                 id={'box_'+this.props.id}

                 onPointerDown={this.onDown}
                 onPointerMove={this.onMove}
                 onPointerUp={this.onUp}
                 onPointerCancel={this.onUp}
                 onGotPointerCapture={this.onGotCapture}
                 onLostPointerCapture={this.onLostCapture}
                 onPointerEnter={this.onPointerEnter}
                 onPointerOver={this.onPointerOver}


            >
                <div> overlaped {(this.state.overlaped)?'overlaped':'not'}</div>
                <div> onPointerEnter {this.state.onPointerEnter}</div>
                <div> onPointerOver {this.state.onPointerOver}</div>
                <br/>

                <div
                    {...this.props}
                    style={circleStyle}

                    // onPointerDown={this.onDown}
                    // onPointerMove={this.onMove}
                    // onPointerUp={this.onUp}
                    // onPointerCancel={this.onUp}
                    // onGotPointerCapture={this.onGotCapture}
                    // onLostPointerCapture={this.onLostCapture}
                    // onPointerEnter={this.onPointerEnter}
                    // onPointerOver={this.onPointerOver}
                />
            </div>
        );
    }
}
