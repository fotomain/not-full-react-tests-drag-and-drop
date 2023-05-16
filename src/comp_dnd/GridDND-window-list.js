

import React, { useState } from "react";
import {
    DndContext,
    closestCenter,
    MouseSensor,
    useSensor,
    useSensors,
    DragOverlay
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import {
    restrictToFirstScrollableAncestor,
    restrictToVerticalAxis
} from "@dnd-kit/modifiers";
import { FixedSizeList } from "react-window";
import { Item, SortableItem } from "./ItemWindow";
import styles from "./styles.css";

function App() {
    const sensors = useSensors(
        useSensor(MouseSensor, { activationConstraint: { distance: 5 } })
    );

    return (
        <div
            tabIndex={0}
            style={{
                border: "1px solid black",
                width: "300px",
                height: "300px",
                overflow: "auto"
            }}
            onKeyDown={() => console.log("keydown")}
        >
            <DndContext
                sensors={sensors}
                modifiers={[restrictToVerticalAxis, restrictToFirstScrollableAncestor]}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <div className="app-intro">
                <SortableContext items={items} strategy={verticalListSortingStrategy}>
                    {
                        // using virtualized list w/ react-window
                        // DragOverlay resets with incorrect position/dimensions if scrolling up/down repeatedly or near bottom/top of list
                        // the incorrect position violates the boundaries set by the DndContext's modifiers
                        <FixedSizeList
                            className="app-intro"
                            width={300}
                            height={300}
                            itemKeys={(index) => items[index]}
                            itemData={items}
                            itemCount={items.length}
                            itemSize={30}
                            overscanCount={10}
                        >
                            {({ index, style, data: items }) => (
                                <SortableItem index={index} style={style} data={items} />
                            )}
                        </FixedSizeList>
                    }
                    {/*
            // using non-virtualized list - no issues
            items.map((id, index) => (
              <SortableItem key={items[index]} index={index} data={items} />
            ))
          */}
                </SortableContext>
                </div>
                <DragOverlay>
                    <Item label="Drag Overlay" />
                </DragOverlay>
            </DndContext>
        </div>
    );

    function handleDragEnd(event) {
        const { active, over } = event;

        if (!over) return;

        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }
}

export default App;
