


import "./styles.css";
import { Virtuoso } from "react-virtuoso";
import { Reorder , motion } from "framer-motion";
import { useRef, useState } from "react";

function generateUsers(length) {
    return Array.from(
        {
            length
        },
        (_, i) => {
            return {
                name: "foo",
                description: "bar",
                bgColor: "white"
            };
        }
    );
}

export default function GridDND() {
    const [active, setActive] = useState(-1);

    const [isScrolling, setIsScrolling] = useState(false);
    const virtuoso = useRef(null);
    const [visibleRange, setVisibleRange] = useState({
        startIndex: 0,
        endIndex: 0,
    })


    const init_items = generateUsers(1000)
    console.log('=== init_items',init_items)
    const [items, setItems] =useState(init_items)

    return (
        <div>
            <button onClick={() => {
                virtuoso.current.scrollToIndex({
                    index: 100,
                    align: 'start',
                    behavior: 'instant'
                });
                return false;
            }}>go to random</button>
            <p>
                current visible range: {visibleRange.startIndex} - {visibleRange.endIndex}{' '}
            </p>



            <Reorder.Group axis="y" values={items} onReorder={setItems}>
            <Virtuoso
                useWindowScroll
                style={{ height: 700 }}
                data={items}
                isScrolling={setIsScrolling}
                rangeChanged={setVisibleRange}
                ref={virtuoso}

                itemContent={(index, item)=> (
                    <Reorder.Item key={item} value={item}>
                        <div className={'block'}>
                            <h3>{index}</h3>
                            Lorem ipsum dolor sit amet
                        </div>
                    </Reorder.Item>
                )}
            />
            </Reorder.Group>

        </div>

    );
}
