
import React from 'react';
import {Motion, spring} from 'react-motion';
import range from 'lodash.range';
// npm i --save lodash.range

import './styles.css';

const springSetting1 = {stiffness: 180, damping: 10};
const springSetting2 = {stiffness: 120, damping: 17};
function reinsert(arr, from, to) {
    const _arr = arr.slice(0);
    const val = _arr[from];
    _arr.splice(from, 1);
    _arr.splice(to, 0, val);
    return _arr;
}

function clamp(n, min, max) {
    return Math.max(Math.min(n, max), min);
}

const allColors = [

    '#EF767A', '#456990', '#49BEAA', '#49DCB1', '#EEB868', '#EF767A', '#456990',
    '#49BEAA', '#49DCB1', '#EEB868', '#EF767A',
    '#EF767A', '#456990', '#49BEAA', '#49DCB1', '#EEB868', '#EF767A', '#456990',
    '#49BEAA', '#49DCB1', '#EEB868', '#EF767A',
    '#EF767A', '#456990', '#49BEAA', '#49DCB1', '#EEB868', '#EF767A', '#456990',
    '#49BEAA', '#49DCB1', '#EEB868', '#EF767A',

];

const count = allColors.length;

const [width, height] = [70, 90];
// indexed by visual position
const layout = range(count).map(n => {
    const row = Math.floor(n / 3);
    const col = n % 3;
    console.log(row)
    return [width * col, height * row];
});


export default class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mouseXY: [0, 0],
            mouseCircleDelta: [0, 0], // difference between mouse and circle pos for x + y coords, for dragging
            lastPress: null, // key of the last pressed component
            isPressed: false,
            order: range(count), // index: visual position. value: component key/id
            form:-1,
            to:-1,
        };
    };

    componentDidMount() {
        window.addEventListener('touchmove', this.handleTouchMove);
        window.addEventListener('touchend', this.handleMouseUp);
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
        console.log('componentDidMount')
    };

    handleTouchStart = (key, pressLocation, e) => {
        this.handleMouseDown(key, pressLocation, e.touches[0]);
    };

    handleTouchMove = (e) => {
        e.preventDefault();
        this.handleMouseMove(e.touches[0]);
    };

    handleMouseMove = ({pageX, pageY}) => {
        const {order, lastPress, isPressed, mouseCircleDelta: [dx, dy]} = this.state;
        if (isPressed) {
            const mouseXY = [pageX - dx, pageY - dy];
            const col = clamp(Math.floor(mouseXY[0] / width), 0, 2);
            const row = clamp(Math.floor(mouseXY[1] / height), 0, Math.floor(count / 3));
            const index = row * 3 + col;

            const from_ = order.indexOf(lastPress)
            const to_ = index
            console.log('=== from_',from_)
            console.log('=== to_',to_)

            var i1 = -1
            var i2 = -1

            if (from_!=to_){
                 i1 = from_
                 i2 = to_
            }
            else{
                i1 = this.state.from
                i2 = this.state.to
            }

            const newOrder = reinsert(order, order.indexOf(lastPress), index);
            console.log('=== newOrder ',newOrder)
            this.setState({
                mouseXY, order: newOrder,
                from:i1,
                to:i2,
            });
        }
    };

    handleMouseDown = (key, [pressX, pressY], {pageX, pageY}) => {
        this.setState({
            lastPress: key,
            isPressed: true,
            mouseCircleDelta: [pageX - pressX, pageY - pressY],
            mouseXY: [pressX, pressY],
        });
    };

    handleMouseUp = () => {
        this.setState({isPressed: false, mouseCircleDelta: [0, 0]});
    };

    render() {
        const {order, lastPress, isPressed, mouseXY} = this.state;
        return (
            <>
                <div>state.from {this.state.from}</div>
                <div>state.to   {this.state.to}</div>
            <div className="demo2">
                {order.map((_, key) => {
                    let style;
                    let x;
                    let y;
                    const visualPosition = order.indexOf(key);
                    if (key === lastPress && isPressed) {
                        [x, y] = mouseXY;
                        style = {
                            translateX: x,
                            translateY: y,
                            scale: spring(1.2, springSetting1),
                            boxShadow: spring((x - (3 * width - 50) / 2) / 15, springSetting1),
                        };
                    } else {
                        [x, y] = layout[visualPosition];
                        style = {
                            translateX: spring(x, springSetting2),
                            translateY: spring(y, springSetting2),
                            scale: spring(1, springSetting1),
                            boxShadow: spring((x - (3 * width - 50) / 2) / 15, springSetting1),
                        };
                    }
                    return (
                        <Motion key={key} style={style}>
                            {({translateX, translateY, scale, boxShadow}) =>
                                <div
                                    onMouseDown={this.handleMouseDown.bind(null, key, [x, y])}
                                    onTouchStart={this.handleTouchStart.bind(null, key, [x, y])}
                                    className="demo2-ball"
                                    style={{
                                        backgroundColor: allColors[key],
                                        WebkitTransform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                                        transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                                        zIndex: key === lastPress ? 99 : visualPosition,
                                        boxShadow: `${boxShadow}px 5px 5px rgba(0,0,0,0.5)`,
                                    }}
                                >
                                    {key}
                                </div>
                            }
                        </Motion>
                    );
                })}
            </div>
            </>
        );
    };
}
